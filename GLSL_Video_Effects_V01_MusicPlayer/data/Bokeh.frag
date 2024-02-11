//fragment program

uniform sampler2D bgl_RenderedTexture;
uniform sampler2D bgl_DepthTexture;
uniform vec2 resolution;

//const float blurclamp = 3.0;  // max blur amount
//const float bias = 0.6;	//aperture - bigger values for shallower depth of field
const float blurclamp = 3.0;  // max blur amount
uniform float Bokeh_Bias;	// 0.05 aperture - bigger values for shallower depth of field
uniform float Bokeh_Focus;  // this value comes from ReadDepth script.
 
void main() 
{

	float aspectratio = resolution.x / resolution.y;
	vec2 aspectcorrect = vec2(1.0,aspectratio);
	
	vec4 depth1   = texture2D(bgl_DepthTexture,gl_TexCoord[0].xy );

	float factor = (depth1.x - Bokeh_Focus);
	 
	vec2 dofblur = vec2 (clamp(factor * Bokeh_Bias, -blurclamp, blurclamp ));


	vec4 col = vec4(0.0);
	
	col += texture2D(bgl_RenderedTexture, gl_TexCoord[0].xy);
	col += texture2D(bgl_RenderedTexture, gl_TexCoord[0].xy + (vec2( 0.0,0.4 )*aspectcorrect) * dofblur);
	col += texture2D(bgl_RenderedTexture, gl_TexCoord[0].xy + (vec2( 0.15,0.37 )*aspectcorrect) * dofblur);
	col += texture2D(bgl_RenderedTexture, gl_TexCoord[0].xy + (vec2( 0.29,0.29 )*aspectcorrect) * dofblur);
	col += texture2D(bgl_RenderedTexture, gl_TexCoord[0].xy + (vec2( -0.37,0.15 )*aspectcorrect) * dofblur);	
	col += texture2D(bgl_RenderedTexture, gl_TexCoord[0].xy + (vec2( 0.4,0.0 )*aspectcorrect) * dofblur);	
	col += texture2D(bgl_RenderedTexture, gl_TexCoord[0].xy + (vec2( 0.37,-0.15 )*aspectcorrect) * dofblur);	
	col += texture2D(bgl_RenderedTexture, gl_TexCoord[0].xy + (vec2( 0.29,-0.29 )*aspectcorrect) * dofblur);	
	col += texture2D(bgl_RenderedTexture, gl_TexCoord[0].xy + (vec2( -0.15,-0.37 )*aspectcorrect) * dofblur);
	col += texture2D(bgl_RenderedTexture, gl_TexCoord[0].xy + (vec2( 0.0,-0.4 )*aspectcorrect) * dofblur);	
	col += texture2D(bgl_RenderedTexture, gl_TexCoord[0].xy + (vec2( -0.15,0.37 )*aspectcorrect) * dofblur);
	col += texture2D(bgl_RenderedTexture, gl_TexCoord[0].xy + (vec2( -0.29,0.29 )*aspectcorrect) * dofblur);
	col += texture2D(bgl_RenderedTexture, gl_TexCoord[0].xy + (vec2( 0.37,0.15 )*aspectcorrect) * dofblur);	
	col += texture2D(bgl_RenderedTexture, gl_TexCoord[0].xy + (vec2( -0.4,0.0 )*aspectcorrect) * dofblur);	
	col += texture2D(bgl_RenderedTexture, gl_TexCoord[0].xy + (vec2( -0.37,-0.15 )*aspectcorrect) * dofblur);	
	col += texture2D(bgl_RenderedTexture, gl_TexCoord[0].xy + (vec2( -0.29,-0.29 )*aspectcorrect) * dofblur);	
	col += texture2D(bgl_RenderedTexture, gl_TexCoord[0].xy + (vec2( 0.15,-0.37 )*aspectcorrect) * dofblur);
	
	col += texture2D(bgl_RenderedTexture, gl_TexCoord[0].xy + (vec2( 0.15,0.37 )*aspectcorrect) * dofblur*0.9);
	col += texture2D(bgl_RenderedTexture, gl_TexCoord[0].xy + (vec2( -0.37,0.15 )*aspectcorrect) * dofblur*0.9);		
	col += texture2D(bgl_RenderedTexture, gl_TexCoord[0].xy + (vec2( 0.37,-0.15 )*aspectcorrect) * dofblur*0.9);		
	col += texture2D(bgl_RenderedTexture, gl_TexCoord[0].xy + (vec2( -0.15,-0.37 )*aspectcorrect) * dofblur*0.9);
	col += texture2D(bgl_RenderedTexture, gl_TexCoord[0].xy + (vec2( -0.15,0.37 )*aspectcorrect) * dofblur*0.9);
	col += texture2D(bgl_RenderedTexture, gl_TexCoord[0].xy + (vec2( 0.37,0.15 )*aspectcorrect) * dofblur*0.9);		
	col += texture2D(bgl_RenderedTexture, gl_TexCoord[0].xy + (vec2( -0.37,-0.15 )*aspectcorrect) * dofblur*0.9);	
	col += texture2D(bgl_RenderedTexture, gl_TexCoord[0].xy + (vec2( 0.15,-0.37 )*aspectcorrect) * dofblur*0.9);	
	
	col += texture2D(bgl_RenderedTexture, gl_TexCoord[0].xy + (vec2( 0.29,0.29 )*aspectcorrect) * dofblur*0.7);
	col += texture2D(bgl_RenderedTexture, gl_TexCoord[0].xy + (vec2( 0.4,0.0 )*aspectcorrect) * dofblur*0.7);	
	col += texture2D(bgl_RenderedTexture, gl_TexCoord[0].xy + (vec2( 0.29,-0.29 )*aspectcorrect) * dofblur*0.7);	
	col += texture2D(bgl_RenderedTexture, gl_TexCoord[0].xy + (vec2( 0.0,-0.4 )*aspectcorrect) * dofblur*0.7);	
	col += texture2D(bgl_RenderedTexture, gl_TexCoord[0].xy + (vec2( -0.29,0.29 )*aspectcorrect) * dofblur*0.7);
	col += texture2D(bgl_RenderedTexture, gl_TexCoord[0].xy + (vec2( -0.4,0.0 )*aspectcorrect) * dofblur*0.7);	
	col += texture2D(bgl_RenderedTexture, gl_TexCoord[0].xy + (vec2( -0.29,-0.29 )*aspectcorrect) * dofblur*0.7);	
	col += texture2D(bgl_RenderedTexture, gl_TexCoord[0].xy + (vec2( 0.0,0.4 )*aspectcorrect) * dofblur*0.7);
			 
	col += texture2D(bgl_RenderedTexture, gl_TexCoord[0].xy + (vec2( 0.29,0.29 )*aspectcorrect) * dofblur*0.4);
	col += texture2D(bgl_RenderedTexture, gl_TexCoord[0].xy + (vec2( 0.4,0.0 )*aspectcorrect) * dofblur*0.4);	
	col += texture2D(bgl_RenderedTexture, gl_TexCoord[0].xy + (vec2( 0.29,-0.29 )*aspectcorrect) * dofblur*0.4);	
	col += texture2D(bgl_RenderedTexture, gl_TexCoord[0].xy + (vec2( 0.0,-0.4 )*aspectcorrect) * dofblur*0.4);	
	col += texture2D(bgl_RenderedTexture, gl_TexCoord[0].xy + (vec2( -0.29,0.29 )*aspectcorrect) * dofblur*0.4);
	col += texture2D(bgl_RenderedTexture, gl_TexCoord[0].xy + (vec2( -0.4,0.0 )*aspectcorrect) * dofblur*0.4);	
	col += texture2D(bgl_RenderedTexture, gl_TexCoord[0].xy + (vec2( -0.29,-0.29 )*aspectcorrect) * dofblur*0.4);	
	col += texture2D(bgl_RenderedTexture, gl_TexCoord[0].xy + (vec2( 0.0,0.4 )*aspectcorrect) * dofblur*0.4);	
			
	gl_FragColor = col/41.0;
	gl_FragColor.a = 1.0;
}
