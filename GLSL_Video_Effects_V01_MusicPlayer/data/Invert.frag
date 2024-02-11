//fragment program

uniform sampler2D Tex0;

void main() 
{
  vec4 color = texture2D(Tex0, gl_TexCoord[0].st);
  gl_FragColor = vec4(1.0 - color.r, 1.0 - color.g, 1.0 -color.b,1);
}


















