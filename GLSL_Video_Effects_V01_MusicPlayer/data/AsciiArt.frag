//fragment program

uniform sampler2D Tex0;
uniform float AsciiArt_Letters;
uniform vec2 resolution;

float character(float n, vec2 p) // some compilers have the word "char" reserved
{
	p = floor(p*vec2(4.0, -4.0) + 2.5);
        p.y = p.y * (-1.) + 1.0;
        p.y = p.y + 2.0;
	if (clamp(p.x, 0.0, 4.0) == p.x && clamp(p.y, 0.0, +4.0) == p.y)
	{
		if (int(mod(n/exp2(p.x + 5.0*p.y), 2.0)) == 1) return 1.0;
	}	
	return 0.0;
}

void main()	{
	vec2 texCoords = vec2(floor(gl_TexCoord[0].s * AsciiArt_Letters) / AsciiArt_Letters, floor(gl_TexCoord[0].t * AsciiArt_Letters) / AsciiArt_Letters);
	vec4 col = texture2D(Tex0, texCoords.xy);
        vec2 uv = gl_FragCoord.xy;
	float gray = (col.r + col.g + col.b)/3.0;	
	float n =  65536.0;             // .
	if (gray > 0.2) n = 65600.0;    // :
	if (gray > 0.3) n = 332772.0;   // *
	if (gray > 0.4) n = 15255086.0; // o 
	if (gray > 0.5) n = 23385164.0; // &
	if (gray > 0.6) n = 15252014.0; // 8
	if (gray > 0.7) n = 13199452.0; // @
	if (gray > 0.8) n = 11512810.0; // #
	vec2 p = uv;	
	p.x = mod(uv.x/((resolution.x/2.0)/ AsciiArt_Letters), 2.0) - (1.0); 
	p.y = mod(uv.y/((resolution.y/2.0)/ AsciiArt_Letters), 2.0) - (1.0);
	col = col * character(n, p);
        	
	gl_FragColor = vec4(col);
}