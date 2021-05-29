precision highp float;

uniform sampler2D Tex0;
uniform float Kaleidoscope_Segments;
uniform vec2 resolution;

varying vec2 texCoordVarying;
             
void main()
{
	vec2 uv = gl_FragCoord.xy / resolution;
	vec2 normed = 2.0 * uv - 1.0;
	float r = length(normed);
	float theta = atan(normed.y / abs(normed.x));
	theta *= Kaleidoscope_Segments;
	vec2 newUv = (vec2(r * cos(theta), r * sin(theta)) + 1.0) / 2.0;
	gl_FragColor = texture2D(Tex0, newUv);
}
