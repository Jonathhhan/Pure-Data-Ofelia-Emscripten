//fragment program
// (c) 2011 detunized (http://detunized.net)
// Paste the shader below into http://www.iquilezles.org/apps/shadertoy/?p=deform
// Click and drag the mouse around

#ifdef GL_ES
precision highp float;
#endif

uniform vec2 resolution;
uniform vec2 mouse;
uniform float MagnifyingGlass_R;
uniform float MagnifyingGlass_H;
uniform sampler2D Tex0;

void main(void)
{
	float hr = MagnifyingGlass_R * sqrt(1.0 - ((MagnifyingGlass_R - MagnifyingGlass_H) / MagnifyingGlass_R) * ((MagnifyingGlass_R - MagnifyingGlass_H) / MagnifyingGlass_R));      
	vec2 xy = gl_FragCoord.xy - mouse.xy;
	float r = sqrt(xy.x * xy.x + xy.y * xy.y);
	vec2 new_xy = r < hr ? xy * (MagnifyingGlass_R - MagnifyingGlass_H) / sqrt(MagnifyingGlass_R * MagnifyingGlass_R - r * r) : xy;
	new_xy = (new_xy  + mouse.xy) / resolution;
	gl_FragColor = texture2D(Tex0, new_xy);
}