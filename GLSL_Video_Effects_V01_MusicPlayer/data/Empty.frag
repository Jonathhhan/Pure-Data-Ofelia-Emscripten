
uniform sampler2D tex0;

void main()
{ 
	vec4 color = texture2D(tex0, gl_TexCoord[0].st);
	gl_FragColor = color;
}

