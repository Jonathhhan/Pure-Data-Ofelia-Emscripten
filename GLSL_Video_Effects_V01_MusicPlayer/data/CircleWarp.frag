//fragment program

uniform sampler2D Tex0;
uniform float CircleWarp_Radius;
uniform float CircleWarp_Rotation;
uniform vec2 resolution;

const float pi = 3.1415926535897932384626433832795;

vec2 rotatePointNorm(vec2 pt, float rot)	{
	vec2 returnMe = pt;

	float r = distance(vec2(0.50), returnMe);
	float a = atan((returnMe.y-0.5), (returnMe.x - 0.5));

	returnMe.x = r * cos(a + 2.0 * pi * rot - pi) + 0.5;
	returnMe.y = r * sin(a + 2.0 * pi * rot - pi) + 0.5;
	
	returnMe = returnMe;
	
	return returnMe;
}

void main()	{
	vec4		inputPixelColor;
	vec2		pt = gl_TexCoord[0].xy;
	vec2		ct = vec2(0.5, 0.5);
	
	pt -= ct;
	pt.x /= 1.0;
	pt += ct;
	
	pt = mix(vec2((pt.x * resolution.x / resolution.y) - (resolution.x * 0.5 - resolution.y * 0.5)/resolution.y,pt.y), 
				vec2(pt.x, pt.y * (resolution.y / resolution.x) - (resolution.y * .5-resolution.x * 0.5) / resolution.x), 
				step(resolution.x, resolution.y));
	pt = rotatePointNorm(pt, CircleWarp_Rotation + 0.5);
	if (distance(pt,ct) < CircleWarp_Radius)	{
		float		a = (atan(ct.y - pt.y, ct.x - pt.x) + pi) / (2.0 * pi);
		//inputPixelColor = texture2D(Tex0,pt);
		pt.y -= 0.5;
		pt.y /= 2.0 * sqrt(pow(CircleWarp_Radius, 2.0) - pow((pt.x - 0.5), 2.0));
		pt.y += 0.5;
		inputPixelColor = texture2D(Tex0,pt);
	}
	
	gl_FragColor = inputPixelColor;
}