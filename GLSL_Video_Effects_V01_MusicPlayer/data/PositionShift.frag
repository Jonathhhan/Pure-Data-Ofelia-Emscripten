//fragment program

uniform float time;
uniform float PositionShift_RateX;
uniform float PositionShift_RateY;
uniform sampler2D Tex0;
 
void main()
{   
	vec4 colour = texture2D(Tex0, vec2(((mod(gl_TexCoord[0].x + PositionShift_RateX, 1.0)-0.5)+.5), ((mod(gl_TexCoord[0].y + PositionShift_RateY, 1.0)-0.5)+.5)));
        gl_FragColor = colour;
}