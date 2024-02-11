//fragment program
//"CREDIT": "by VIDVOX" https://www.interactiveshaderformat.com/sketches/3719
#version 120 

uniform sampler2D Tex0;
 
uniform float Halftone_Sharpness;
uniform float Halftone_Angle;
uniform float Halftone_Scale;
uniform float Halftone_Colorize;
uniform float Halftone_Divs;
uniform int Halftone_PatternType;
uniform vec2 resolution;

varying vec2 TexCoord0;
varying vec2 left_coord;
varying vec2 right_coord;
varying vec2 above_coord;
varying vec2 below_coord;

varying vec2 lefta_coord;
varying vec2 righta_coord;
varying vec2 leftb_coord;
varying vec2 rightb_coord;

const float tau = 6.28318530718;

vec3 rgb2hsv(vec3 c)	{
	vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
	//vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
	//vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));
	vec4 p = c.g < c.b ? vec4(c.bg, K.wz) : vec4(c.gb, K.xy);
	vec4 q = c.r < p.x ? vec4(p.xyw, c.r) : vec4(c.r, p.yzx);
	
	float d = q.x - min(q.w, q.y);
	float e = 1.0e-10;
	return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
}

vec3 hsv2rgb(vec3 c)	{
	vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
	vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
	return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

float dotScreenPattern(float ang, float sca, vec2 cent) {
	float s = sin( ang * tau ), c = cos( ang * tau );
	vec2 tex = gl_TexCoord[0].xy * resolution - cent * resolution;
	vec2 point = vec2( c * tex.x - s * tex.y, s * tex.x + c * tex.y ) * max(sca,0.001);
	return ( sin( point.x ) * sin( point.y ) ) * 4.0;
}

float circleScreenPattern(float ang, float sca, vec2 cent) {
	float s = 0.0;
	float c = 1.0;
	vec2 tex = gl_TexCoord[0].xy * resolution;
	vec2 point = vec2( c * tex.x - s * tex.y, s * tex.x + c * tex.y );
	float d = distance(point, cent * resolution) * max(sca,0.001);
	return ( sin(d + ang * tau) ) * 4.0;
}

float lineScreenPattern(float ang, float sca, vec2 cent) {
	float s = sin(tau * ang * 0.5);
	float c = cos(tau * ang * 0.5);
	vec2 tex = gl_TexCoord[0].xy * resolution;
	vec2 point = vec2( c * tex.x - s * tex.y, s * tex.x + c * tex.y ) * max(sca,0.001);
	float d = point.y;

	return ( cent.x + sin(d + cent.y * tau) ) * 4.0;
}

float rand(vec2 co){
    return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
}

void main() {
	vec4 color = texture2D(Tex0, TexCoord0);
	vec4 colorL = texture2D(Tex0, left_coord);
	vec4 colorR = texture2D(Tex0, right_coord);
	vec4 colorA = texture2D(Tex0, above_coord);
	vec4 colorB = texture2D(Tex0, below_coord);

	vec4 colorLA = texture2D(Tex0, lefta_coord);
	vec4 colorRA = texture2D(Tex0, righta_coord);
	vec4 colorLB = texture2D(Tex0, leftb_coord);
	vec4 colorRB = texture2D(Tex0, rightb_coord);

	vec4 final = color + Halftone_Sharpness * (8.0*color - colorL - colorR - colorA - colorB - colorLA - colorRA - colorLB - colorRB);
	vec3 hsv = rgb2hsv(final.rgb);
	float ang = floor(hsv.r * Halftone_Divs + 0.5) / Halftone_Divs;
	float sca = floor(hsv.b * Halftone_Divs + 0.5) / Halftone_Divs;
	float col = max(min(Halftone_Colorize + floor(hsv.g * Halftone_Divs + 0.5) / Halftone_Divs, 1.0),0.0);;
	
	float average = ( final.r + final.g + final.b ) / 3.0;
	int pType = Halftone_PatternType;
	
	if (pType == 0)	
	{
		final = vec4( vec3( average * 10.0 - 5.0 + dotScreenPattern(Halftone_Angle + ang, Halftone_Scale * sca, vec2(0.5)) ), color.a );
	}
	else if (pType == 1)	
	{
		final = vec4( vec3( average * 10.0 - 5.0 + circleScreenPattern(Halftone_Angle + ang, Halftone_Scale * sca, vec2(0.5)) ), color.a );
	}
	else if (pType == 2)	
	{
		final = vec4( vec3( average * 10.0 - 5.0 + lineScreenPattern(Halftone_Angle + ang, Halftone_Scale * sca, vec2(0.5)) ), color.a );
	}
	
	final = mix (color * final, final, 1.0-col);
	gl_FragColor = final;
}