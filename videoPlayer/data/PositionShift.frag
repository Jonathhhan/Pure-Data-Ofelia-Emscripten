precision highp float;

uniform float time;
uniform float PositionShift_RateX;
uniform float PositionShift_RateY;
uniform sampler2D Tex0;
uniform vec2 resolution;

varying vec2 texCoordVarying;
 
void main()
{   
	vec4 colour = texture2D(Tex0, vec2(((mod(gl_FragCoord.x / resolution.x + PositionShift_RateX, 1.0)-0.5)+.5), ((mod(gl_FragCoord.y / resolution.y + PositionShift_RateY, 1.0)-0.5)+.5)));
        gl_FragColor = colour;
}
