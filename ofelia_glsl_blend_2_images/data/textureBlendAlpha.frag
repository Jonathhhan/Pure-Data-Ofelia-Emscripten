 // Fragment shader
  #version 110
  uniform sampler2D Texture0;
  uniform sampler2D Texture1;
  // --------------------
  varying vec2 TexCoord0;
  // --------------------
  void main()
  {
     vec4 texel0 = texture2D(Texture0, TexCoord0);
     vec4 texel1 = texture2D(Texture1, TexCoord0);
     gl_FragColor = mix(texel0, texel1, texel1.a);
  }