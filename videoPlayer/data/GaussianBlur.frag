precision highp float;

uniform sampler2D Tex0;
uniform float GaussianBlur_Radius;
uniform vec2 resolution;
const float total = (1. + 8. + 28. + 56.) * 2. + 70.;	

varying vec2 texCoordVarying;
													  
void main(void) 
{
	vec2 st = gl_FragCoord.xy / resolution;
	vec4 color = vec4(0.0,0.0,0.0,0.0);
	color += (1. / total) * texture2D(Tex0, st - GaussianBlur_Radius * vec2(4. / 4., 0.));
	color += (8. / total)  * texture2D(Tex0, st - GaussianBlur_Radius * vec2(3. / 4., 0.));
	color += (28. / total)  * texture2D(Tex0, st - GaussianBlur_Radius * vec2(2. / 4., 0.));
	color += (56. / total)  * texture2D(Tex0, st - GaussianBlur_Radius * vec2(1. / 4., 0.));
	color +=  (70. / total) * texture2D(Tex0, st);
	color += (1. / total) * texture2D(Tex0, st + GaussianBlur_Radius * vec2(4. / 4., 0.));
	color += (8. / total)  * texture2D(Tex0, st + GaussianBlur_Radius * vec2(3. / 4., 0.));
	color += (28. / total)  * texture2D(Tex0, st + GaussianBlur_Radius * vec2(2. / 4., 0.));
	color += (56. / total)  * texture2D(Tex0, st + GaussianBlur_Radius * vec2(1. / 4., 0.));
	gl_FragColor = color;
}
