  // Vertex shader
  #version 120
  varying vec2 TexCoord0;
  // --------------------
  void main()
  {
    gl_Position = gl_ModelViewProjectionMatrix * gl_Vertex;
    TexCoord0 = gl_MultiTexCoord0.xy;
  }