//fragment program

uniform sampler2D Tex0;
uniform float RGBShift_Amount;
uniform float RGBShift_Angle;
                        
void main() 
{
	vec2 vUv = gl_TexCoord[0].st;
	vec2 offset = RGBShift_Amount * vec2( cos(RGBShift_Angle), sin(RGBShift_Angle));
	vec4 cr = texture2D(Tex0, vUv + offset);
	vec4 cga = texture2D(Tex0, vUv);
	vec4 cb = texture2D(Tex0, vUv - offset);
	gl_FragColor = vec4(cr.r, cga.g, cb.b, cga.a);                                        
}