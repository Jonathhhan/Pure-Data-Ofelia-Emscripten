//fragment program

uniform sampler2D Tex0;
uniform float GreyScale_Factor;

void main() 
{
	vec4 color = texture2D(Tex0, gl_TexCoord[0].st);
	vec3 lum = vec3(0.299, 0.587, 0.114);
	gl_FragColor = vec4(vec3(dot(color.rgb, lum)*(1.0- GreyScale_Factor)+(color.rgb * GreyScale_Factor)), color.a);
}


















