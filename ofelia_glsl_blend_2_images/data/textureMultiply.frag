  // Fragment shader
  #version 110
  uniform sampler2D Texture0;
  uniform sampler2D Texture1;
  // --------------------
  varying vec2 TexCoord0;
  varying vec2 TexCoord1;    // Or just use TexCoord0
  // --------------------
  void main()
  {
     vec4 texel = texture2D(Texture0, TexCoord0);
     texel *= texture2D(Texture1, TexCoord0);
     gl_FragColor = texel;
  }