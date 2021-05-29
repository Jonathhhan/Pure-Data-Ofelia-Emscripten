precision highp float;

uniform float MosaicColor_MosaicNumber;
uniform sampler2D Tex0;
uniform vec2 resolution;

varying vec2 texCoordVarying;

void main() 
{
	vec4 color = texture2D(Tex0, gl_FragCoord.xy / resolution);
	vec2 texPos = gl_FragCoord.xy / resolution * MosaicColor_MosaicNumber;
	vec2 decoupe = floor(texPos);
	color.rg = decoupe / MosaicColor_MosaicNumber;
	gl_FragColor = color;
}

// le floor découpe notre texture par 10 sur l'axe des x et y
// la découpe va de 0 à 9
// on la divise par 10
// on ne laisse passer que le bleu (ou enlever les commentaires)
// tant que la valeur de texture est inférieure à 1, valeur de texture floor = 0



















