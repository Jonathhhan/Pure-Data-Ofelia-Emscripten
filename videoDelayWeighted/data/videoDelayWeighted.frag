// Fragment shader
#version 120
uniform sampler2D Texture0;
uniform sampler2D Texture1;
uniform sampler2D Texture2;
uniform sampler2D Texture3;
uniform sampler2D Texture4;
uniform sampler2D Texture5;
uniform sampler2D Texture6;
uniform sampler2D Texture7;
uniform sampler2D Texture8;
uniform float delayNumber;
// --------------------
varying vec2 TexCoord0;
// --------------------
void main()
{
	vec4 texel0 = texture2D(Texture0, TexCoord0);
	vec4 texel1 = texture2D(Texture1, TexCoord0);
	vec4 texel2 = texture2D(Texture2, TexCoord0);
	vec4 texel3 = texture2D(Texture3, TexCoord0);
	vec4 texel4 = texture2D(Texture4, TexCoord0);
	vec4 texel5 = texture2D(Texture5, TexCoord0);
	vec4 texel6 = texture2D(Texture6, TexCoord0);
	vec4 texel7 = texture2D(Texture7, TexCoord0);
	vec4 texel8 = texture2D(Texture8, TexCoord0);

	if (delayNumber == 0.0)
{
	vec4 color = texel0 * 1.0;
	gl_FragColor = vec4(color);
}
	else if (delayNumber == 1.0)
{
	vec4 color = texel0 * (2.0 / 3.0) + texel1 * (1.0 / 3.0) ;
	gl_FragColor = vec4(color);
}
	else if (delayNumber == 2.0)
{
	vec4 color = texel0 * (3.0 / 6.0) + texel1 * (2.0 / 6.0) + texel2 * (1.0 / 6.0);
	gl_FragColor = vec4(color);
}	
	else if (delayNumber == 3.0)
{
	vec4 color = texel0 * (4.0 / 10.0) + texel1 * (3.0 / 10.0) + texel2 * (2.0 / 10.0) + texel3 * (1.0 / 10.0);
	gl_FragColor = vec4(color);
}	
	else if (delayNumber == 4.0)
{
	vec4 color = texel0 * (5.0 / 15.0) + texel1 * (4.0 / 15.0) + texel2 * (3.0 / 15.0) + texel3 * (2.0 / 15.0) + texel4 * (1.0 / 15.0);
	gl_FragColor = vec4(color);
}	
	else if (delayNumber == 5.0)
{
	vec4 color = texel0 * (6.0 / 21.0) + texel1 * (5.0 / 21.0) + texel2 * (4.0 / 21.0) + texel3 * (3.0 / 21.0) + texel4 * (2.0 / 21.0) + texel5 * (1.0 / 21.0);
	gl_FragColor = vec4(color);
}
	else if (delayNumber == 6.0)
{
	vec4 color = texel0 * (7.0 / 28.0) + texel1 * (6.0 / 28.0) + texel2 * (5.0 / 28.0) + texel3 * (4.0 / 28.0) + texel4 * (3.0 / 28.0) + texel5 * (2.0 / 28.0) + texel6 * (1.0 / 28.0) ;
	gl_FragColor = vec4(color);
}	
	else if (delayNumber == 7.0)
{
	vec4 color = texel0 * (8.0 / 36.0) + texel1 * (7.0 / 36.0) + texel2 * (6.0 / 36.0) + texel3 * (5.0 / 36.0) + texel4 * (4.0 / 36.0) + texel5 * (3.0 / 36.0) + texel6 * (2.0 / 36.0) + texel7 * (1.0 / 36.0);
	gl_FragColor = vec4(color);
}	
	else if (delayNumber == 8.0)
{
	vec4 color = texel0 * (9.0 / 45.0) + texel1 * (8.0 / 45.0) + texel2 * (7.0 / 45.0) + texel3 * (6.0 / 45.0) + texel4 * (5.0 / 45.0) + texel5 * (4.0 / 45.0) + texel6 * (3.0 / 45.0)  + texel7 * (2.0 / 45.0) + texel8 * (1.0 / 45.0) ;
	gl_FragColor = vec4(color);
}	
}
