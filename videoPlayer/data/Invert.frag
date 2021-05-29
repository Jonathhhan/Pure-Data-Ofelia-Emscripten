precision highp float;

uniform sampler2D Tex0;
uniform vec2 resolution;
// varying vec2 texCoordVarying;

void main() 
{
  vec4 color = texture2D(Tex0, gl_FragCoord.xy / resolution);
  gl_FragColor = vec4(1.0 - color.r, 1.0 - color.g, 1.0 -color.b,1);
}


















