//fragment program

uniform sampler2D Tex0;
uniform float VertlTiltShift_V;
uniform float VertlTiltShift_R;

void main() 
{
	vec2 vUv = gl_TexCoord[0].st;
	vec4 sum = vec4( 0.0 );
	float vv = VertlTiltShift_V * abs(VertlTiltShift_R - vUv.y );
	sum += texture2D( Tex0, vec2( vUv.x, vUv.y - 4.0 * vv ) ) * 0.051;
	sum += texture2D( Tex0, vec2( vUv.x, vUv.y - 3.0 * vv ) ) * 0.0918;
	sum += texture2D( Tex0, vec2( vUv.x, vUv.y - 2.0 * vv ) ) * 0.12245;
	sum += texture2D( Tex0, vec2( vUv.x, vUv.y - 1.0 * vv ) ) * 0.1531;
	sum += texture2D( Tex0, vec2( vUv.x, vUv.y ) ) * 0.1633;
	sum += texture2D( Tex0, vec2( vUv.x, vUv.y + 1.0 * vv ) ) * 0.1531;
	sum += texture2D( Tex0, vec2( vUv.x, vUv.y + 2.0 * vv ) ) * 0.12245;
	sum += texture2D( Tex0, vec2( vUv.x, vUv.y + 3.0 * vv ) ) * 0.0918;
	sum += texture2D( Tex0, vec2( vUv.x, vUv.y + 4.0 * vv ) ) * 0.051;
	gl_FragColor = sum;
}