//fragment program

uniform sampler2D Tex0;
uniform float HSBShift_Hue;
uniform float HSBShift_Saturation;
uniform float HSBShift_Brightness;
                                         
// https://love2d.org/wiki/HSV_color
vec3 hsbToRgb(vec3 c) { return mix(vec3(1.),clamp((abs(fract(c.x+vec3(3.,2.,1.)/3.)*6.-3.)-1.),0.,1.),c.y)*c.z; }
// http://lolengine.net/blog/2013/07/27/rgb-to-hsv-in-glsl
vec3 rgbToHsb(vec3 c)
{
	vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
	vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
	vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));
	float d = q.x - min(q.w, q.y);
	float e = 1.0e-10;
	return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
}
                                         
void main()
{
	vec3 hsb = rgbToHsb(texture2D(Tex0, gl_TexCoord[0].st).rgb);
	vec3 rgb = hsbToRgb(vec3(hsb.x + HSBShift_Hue, hsb.y + HSBShift_Saturation, hsb.z + HSBShift_Brightness));
	gl_FragColor = vec4(rgb, 1.0);
}