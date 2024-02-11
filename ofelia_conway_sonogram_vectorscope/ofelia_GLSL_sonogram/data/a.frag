#version 130
//fragment program 
//https://gist.github.com/rogerallen/5907080

uniform float time;
uniform float mix;
uniform vec2 resolution;
uniform sampler2D spectrum;
uniform sampler2D fbo1;


// Sonogram.glsl for Shadertone
//
// Now with explicit commentary...feel free to ask questions!
//
// Use a call like this to start the window from Clojure & Shadertone.
// See similar code in https://github.com/overtone/shadertone/tree/master/examples
// (t/start "examples/sonogram.glsl"
//         :width 1024 :height 512  ;; note width matches WIN_WIDTH, height is 1:1 with FFT data
//         :textures [ :overtone-audio :previous-frame ])  ;; this puts the FFT data in iChannel0 and
//                                                         ;; a texture of the previous frame in iChannel1
//
// first 2 constants are for getting the speed of the cursor right.  
float WIN_WIDTH      = 1024.0;  // match start :width call
float SEC_PER_SCREEN = 60.0;    // cursor crosses the screen every 30 seconds
float AMP_SCALE      = 4.0;     // fft data should be in the 0-1 range, but everyone's sound level is 
                                // slightly different.  Scale the fft results for display.

// this routine is called once for every pixel in our window.
void main(void)
{
    // gl_FragCoord.xy communicates the current pixel location to the shader.
    // gl_FragCoord.x will range from [0,1024), .y ranges [0,512)
    // iResolution.xy is a constant set to the window size = { 1024, 512 }
    // [now as I write that I realize how silly I was to also use WIN_WIDTH, oh well]  :^)
    // setup uv for indexing into a texture where we need normalized [0.0,1.0) coordinate values.
    vec2  uv     = gl_FragCoord.xy/resolution.xy;
 
    // the iChannel0 texture is :overtone-audio and that data is a 512x2 array of sound data
    // row 1 is the fft data and row 2 is the current sound wave data
    // the texture2D call uses the 2nd argument to index into that data.
    //   the first arg is the current pixel's normalized Y location
    //   a value of 0.25 for the 2nd arg selects only FFT data
    // change the last line to
    //   gl_FragColor = vec4(vec3(fft),1.0); 
    // and see the full window filled with the same sonogram data. 
    float fft    = (AMP_SCALE *
                    max(0.0, texture2D(spectrum,vec2(uv.y,mix)).x));

    // But, we don't want the full screen to show the current FFT.
    // We want to only update the data under the cursor.  
    // So, we use the iGlobalTime input to find a particular X value
    // for a column we want to update.  The following creates a
    // value that ranges from [0,1024) over 30 seconds.
    int   cur_x  = int(fract(time/SEC_PER_SCREEN)*WIN_WIDTH);
    
    // For the data that is NOT under the cursor, we want the 
    // older sonogram data that we rendered into the framebuffer. 
    // get that from the iChannel1 :previous-frame texture.  
    // The uv coordinate provide a 1:1 mapping from old to new.
    vec3  oc     = texture2D(fbo1,uv).rgb;

    // At last, we can derive our current pixel's color.
    // the ternary logic here just selects:
    // if this pixel's x value is the cursor's x value
    //   the color is a greyscale of the current fft value
    // else if this pixel is one to the right of the cursor
    //   draw a yellow pixel (makes a vertical line)
    // else 
    //   use the old color from the previous frame
    // Note that cur_x and int(gl_FragCoord.x) are integers ranging [0,1024)
    vec3  c      = ((cur_x == int(gl_FragCoord.x)) ?
                    vec3(fft) :
                    (((cur_x+1) == int(gl_FragCoord.x)) ?
                     vec3(0.8,0.4,0.0) :
                     oc));

    // finally, tell OpenGL what the color of this pixel is.
    gl_FragColor = vec4(c,1.0);
}