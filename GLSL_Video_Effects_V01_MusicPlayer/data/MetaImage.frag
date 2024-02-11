// fragment program 

uniform sampler2D Tex0;
uniform vec2 resolution;
uniform float colorFade;
uniform float MetaImage_MosaicNumber;

void main() 
{
	vec2 texCoords = vec2(floor(gl_TexCoord[0].s * MetaImage_MosaicNumber) / MetaImage_MosaicNumber, floor(gl_TexCoord[0].t * MetaImage_MosaicNumber) / MetaImage_MosaicNumber);
	vec4 color = texture2D(Tex0, texCoords);
	vec3 lum1 = vec3(0.299, 0.587, 0.114);
	color = vec4(vec3(dot(color.rgb, lum1) * (1.0 - (colorFade*(-1.0)+1.0)) + (color.rgb*(colorFade * (-1.0) + 1.0))), color.a);
	vec2 uv = (gl_FragCoord.xy) / resolution;
	uv.xy *= MetaImage_MosaicNumber *(ceil((1.-uv.x)));
	vec4 color2 = texture2D(Tex0, mod(uv, 1.0));
	vec3 lum = vec3(0.299, 0.587, 0.114);
	color2 = vec4(vec3(dot(color2.rgb, lum) * (1.0 - colorFade) + (color2.rgb * colorFade)), color2.a);
	vec4 color3 = (color * color2);
	gl_FragColor = color3 * 2.;
}