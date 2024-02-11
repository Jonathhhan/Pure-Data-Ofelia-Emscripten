// Fragment shader
  #version 120
  uniform sampler2D Texture0;
  uniform sampler2D Texture1;
  uniform float BlendFactor;
  uniform vec4 ColorFactor;
  // --------------------
  varying vec2 TexCoord0;
  // --------------------
  void main()
  {
     vec4 ColorResult;
     vec4 texel0 = texture2D(Texture0, TexCoord0);
     vec4 texel1 = texture2D(Texture1, TexCoord0);
     ColorResult = mix(texel0,  texel1, BlendFactor);
     gl_FragColor = ColorResult * ColorFactor;
  }