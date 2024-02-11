//fragment program

uniform sampler2D Tex0;
uniform float Pixelate_XPixels;
uniform float Pixelate_YPixels;
            
void main()
{
	vec2 texCoords = vec2(floor(gl_TexCoord[0].s * Pixelate_XPixels) / Pixelate_XPixels, floor(gl_TexCoord[0].t * Pixelate_YPixels) / Pixelate_YPixels);
	gl_FragColor = texture2D(Tex0, texCoords);
}