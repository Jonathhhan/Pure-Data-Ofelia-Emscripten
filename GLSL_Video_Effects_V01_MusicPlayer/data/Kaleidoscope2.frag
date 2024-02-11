//fragment program
//"CREDIT": "by VIDVOX" https://www.interactiveshaderformat.com/sketches/207
#version 120 

uniform sampler2D Tex0;
uniform vec2 resolution;
uniform vec2 center;
uniform float Kaleidoscope2_Sides;
uniform float Kaleidoscope2_Angle;
uniform float Kaleidoscope2_SlideX;
uniform float Kaleidoscope2_SlideY;
const float tau = 6.28318530718;

void main() 
{
  // normalize to the center
	vec2 loc = resolution * vec2 (gl_TexCoord[0].x,gl_TexCoord[0].y);
	float r = distance(center, loc);
	float a = atan ((loc.y-center.y),(loc.x-center.x));
	
	// kaleidoscope
	a = mod(a, tau / Kaleidoscope2_Sides);
	a = abs(a - tau/ Kaleidoscope2_Sides /2.);
	
	loc.x = r * cos(a + tau * Kaleidoscope2_Angle);
	loc.y = r * sin(a + tau * Kaleidoscope2_Angle);
	
	loc = (center + loc) / resolution;
	
	loc.x = mod(loc.x + Kaleidoscope2_SlideX, 1.0);
	loc.y = mod(loc.y + Kaleidoscope2_SlideY, 1.0);

	// sample the image
	if (loc.x < 0.0)	{
		loc.x = mod(abs(loc.x), 1.0);
	}
	if (loc.y < 0.0)	{
		loc.y = mod(abs(loc.y),1.0);
	}
	if (loc.x > 1.0)	{
		loc.x = mod(abs(1.0-loc.x),1.0);
	}
	if(loc.y > 1.0)	{
		loc.y = mod(abs(1.0-loc.y),1.0);	
	}
	gl_FragColor = texture2D(Tex0, loc);;
}