precision highp float;

uniform sampler2D Tex0;
uniform float GreyScale_Factor;
uniform vec2 resolution;

varying vec2 texCoordVarying;

void main() 
{
	vec4 color = texture2D(Tex0, gl_FragCoord.xy / resolution);
	vec3 lum = vec3(0.299, 0.587, 0.114);
	gl_FragColor = vec4(vec3(dot(color.rgb, lum)*(1.0- GreyScale_Factor)+(color.rgb * GreyScale_Factor)), color.a);
}


















