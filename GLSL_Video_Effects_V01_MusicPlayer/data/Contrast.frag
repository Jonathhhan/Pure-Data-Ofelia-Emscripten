//fragment program

uniform sampler2D Tex0;
uniform float Contrast_Contrast;
uniform float Contrast_Brightness;
uniform float Contrast_Multiple;
                                         
void main()
{
	vec4 color = texture2D(Tex0,gl_TexCoord[0].st); 
	float p = 0.3 * color.g + 0.59 * color.r + 0.11 * color.b;
	p = p * Contrast_Brightness;
	vec4 color2 = vec4(p,p,p,1.0);
	color *= color2;
	color *= vec4(Contrast_Multiple, Contrast_Multiple, Contrast_Multiple, 1.0);
	color = mix( vec4(1.0,1.0,1.0,1.0), color, Contrast_Contrast);                                            
	gl_FragColor =  vec4(color.r , color.g, color.b, 1.0);
}