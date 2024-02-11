//fragment program

uniform sampler2D Tex0;
uniform float time;
uniform float Grain_Intensity;
uniform vec2 resolution;

void main()
{
	vec2 uv = gl_TexCoord[0].st ;
	vec4 color = texture2D(Tex0, gl_TexCoord[0].st);
	float strength = 16.0;
	float x = (uv.x + 4.0 ) * (uv.y + 4.0 ) * (mod(time, 10000.0)-1.0);
	vec4 grain = vec4(mod((mod(x, 13.0) + 1.0) * (mod(x, 123.0) + 1.0), 0.01) - (Grain_Intensity / 5000.0)) * strength;
	gl_FragColor = color + grain;
}