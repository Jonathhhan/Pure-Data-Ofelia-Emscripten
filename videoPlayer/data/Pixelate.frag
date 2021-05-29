precision highp float;

uniform sampler2D Tex0;
uniform float Pixelate_XPixels;
uniform float Pixelate_YPixels;
uniform vec2 resolution;

varying vec2 texCoordVarying;
            
void main()
{
	vec2 texCoords = vec2(floor(gl_FragCoord.x / resolution.x * Pixelate_XPixels) / Pixelate_XPixels, floor(gl_FragCoord.y / resolution.y * Pixelate_YPixels) / Pixelate_YPixels);
	gl_FragColor = texture2D(Tex0, texCoords);
}
