/**
 * Generate a texture that represents the luminosity of the current scene, adapted over time
 * to simulate the optic nerve responding to the amount of light it is receiving.
 * Based on a GDC2007 presentation by Wolfgang Engel titled "Post-Processing Pipeline"
 *
 * Full-screen tone-mapping shader based on http://www.graphics.cornell.edu/~jaf/publications/sig02_paper.pdf
 *
 * class AdaptiveToneMappingPass
 * @module Postprocessing
 * @constructor
 * @author miibond
 */
function AdaptiveToneMappingPass(adaptive, resolution)
{
	TONG.Pass.call(this);

	this.resolution = (resolution !== undefined) ? resolution : 256;
	this.needsInit = true;
	this.adaptive = adaptive !== undefined ? !! adaptive : true;

	this.luminanceRT = null;
	this.previousLuminanceRT = null;
	this.currentLuminanceRT = null;

	this.copyUniforms = TONG.UniformsUtils.clone(TONG.CopyShader.uniforms);
	this.materialCopy = new TONG.ShaderMaterial(
	{
		uniforms: this.copyUniforms,
		vertexShader: TONG.CopyShader.vertexShader,
		fragmentShader: TONG.CopyShader.fragmentShader,
		blending: TONG.NoBlending,
		depthTest: false
	});


	this.materialLuminance = new TONG.ShaderMaterial(
	{
		uniforms: TONG.UniformsUtils.clone(TONG.LuminosityShader.uniforms),
		vertexShader: TONG.LuminosityShader.vertexShader,
		fragmentShader: TONG.LuminosityShader.fragmentShader,
		blending: TONG.NoBlending
	});

	this.adaptLuminanceShader =
	{
		defines:
		{
			"MIP_LEVEL_1X1" : (Math.log(this.resolution) / Math.log(2.0)).toFixed(1)
		},
		uniforms:
		{
			"lastLum":{ value: null },
			"currentLum":{ value: null },
			"minLuminance":{ value: 0.01 },
			"delta":{ value: 0.016 },
			"tau":{ value: 1.0 }
		},
		vertexShader:
		[
			"varying vec2 vUv;",
			"void main(){",

				"vUv = uv;",
				"gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);",

			"}"
		].join('\n'),
		fragmentShader:
		[
			"varying vec2 vUv;",

			"uniform sampler2D lastLum;",
			"uniform sampler2D currentLum;",
			"uniform float minLuminance;",
			"uniform float delta;",
			"uniform float tau;",

			"void main(){",

				"vec4 lastLum = texture2D(lastLum, vUv, MIP_LEVEL_1X1);",
				"vec4 currentLum = texture2D(currentLum, vUv, MIP_LEVEL_1X1);",

				"float fLastLum = max(minLuminance, lastLum.r);",
				"float fCurrentLum = max(minLuminance, currentLum.r);",

				//The adaption seems to work better in extreme lighting differences
				//ifthe input luminance is squared.
				"fCurrentLum *= fCurrentLum;",

				// Adapt the luminance using Pattanaik's technique
				"float fAdaptedLum = fLastLum + (fCurrentLum - fLastLum) * (1.0 - exp(-delta * tau));",
				"gl_FragColor.r = fAdaptedLum;",
			"}"
		].join('\n')
	};

	this.materialAdaptiveLum = new TONG.ShaderMaterial(
	{
		uniforms: TONG.UniformsUtils.clone(this.adaptLuminanceShader.uniforms),
		vertexShader: this.adaptLuminanceShader.vertexShader,
		fragmentShader: this.adaptLuminanceShader.fragmentShader,
		defines: this.adaptLuminanceShader.defines,
		blending: TONG.NoBlending
	});

	if(TONG.ToneMapShader === undefined)
		console.error("AdaptiveToneMappingPass relies on THREE.ToneMapShader");

	this.materialToneMap = new TONG.ShaderMaterial(
	{
		uniforms: TONG.UniformsUtils.clone(TONG.ToneMapShader.uniforms),
		vertexShader: TONG.ToneMapShader.vertexShader,
		fragmentShader: TONG.ToneMapShader.fragmentShader,
		blending: TONG.NoBlending
	});

	this.camera = new TONG.OrthographicCamera(- 1, 1, 1, - 1, 0, 1);
	this.scene  = new TONG.Scene();

	this.quad = new TONG.Mesh(new TONG.PlaneBufferGeometry(2, 2), null);
	this.quad.frustumCulled = false;
	this.scene.add(this.quad);
};

AdaptiveToneMappingPass.prototype = Object.create(TONG.Pass.prototype);

AdaptiveToneMappingPass.prototype.constructor = AdaptiveToneMappingPass;

AdaptiveToneMappingPass.prototype.render = function(renderer, writeBuffer, readBuffer, delta, maskActive)
{
	if(this.needsInit)
	{
		this.reset(renderer);
		this.luminanceRT.texture.type = readBuffer.texture.type;
		this.previousLuminanceRT.texture.type = readBuffer.texture.type;
		this.currentLuminanceRT.texture.type = readBuffer.texture.type;
		this.needsInit = false;
	}

	if(this.adaptive)
	{
		//Render the luminance of the current scene into a render target with mipmapping enabled
		this.quad.material = this.materialLuminance;
		this.materialLuminance.uniforms.tDiffuse.value = readBuffer.texture;
		renderer.render(this.scene, this.camera, this.currentLuminanceRT);

		//Use the new luminance values, the previous luminance and the frame delta to
		//adapt the luminance over time.
		this.quad.material = this.materialAdaptiveLum;
		this.materialAdaptiveLum.uniforms.delta.value = delta;
		this.materialAdaptiveLum.uniforms.lastLum.value = this.previousLuminanceRT.texture;
		this.materialAdaptiveLum.uniforms.currentLum.value = this.currentLuminanceRT.texture;
		renderer.render(this.scene, this.camera, this.luminanceRT);

		//Copy the new adapted luminance value so that it can be used by the next frame.
		this.quad.material = this.materialCopy;
		this.copyUniforms.tDiffuse.value = this.luminanceRT.texture;
		renderer.render(this.scene, this.camera, this.previousLuminanceRT);
	}

	this.quad.material = this.materialToneMap;
	this.materialToneMap.uniforms.tDiffuse.value = readBuffer.texture;

	if(this.renderToScreen)
	{
		renderer.render(this.scene, this.camera);
	}
	else
	{
		renderer.render(this.scene, this.camera, writeBuffer, this.clear);
	}
};

AdaptiveToneMappingPass.prototype.reset = function(renderer)
{
	// render targets
	if(this.luminanceRT)
	{
		this.luminanceRT.dispose();
	}
	if(this.currentLuminanceRT)
	{
		this.currentLuminanceRT.dispose();
	}
	if(this.previousLuminanceRT)
	{
		this.previousLuminanceRT.dispose();
	}

	var pars ={ minFilter: TONG.LinearFilter, magFilter: TONG.LinearFilter, format: TONG.RGBAFormat }; // was RGB format. changed to RGBA format. see discussion in #8415 / #8450

	this.luminanceRT = new TONG.WebGLRenderTarget(this.resolution, this.resolution, pars);
	this.luminanceRT.texture.name = "AdaptiveToneMappingPass.l";
	this.luminanceRT.texture.generateMipmaps = false;

	this.previousLuminanceRT = new TONG.WebGLRenderTarget(this.resolution, this.resolution, pars);
	this.previousLuminanceRT.texture.name = "AdaptiveToneMappingPass.pl";
	this.previousLuminanceRT.texture.generateMipmaps = false;

	// We only need mipmapping for the current luminosity because we want a down-sampled version to sample in our adaptive shader
	pars.minFilter = TONG.LinearMipMapLinearFilter;
	this.currentLuminanceRT = new TONG.WebGLRenderTarget(this.resolution, this.resolution, pars);
	this.currentLuminanceRT.texture.name = "AdaptiveToneMappingPass.cl";

	if(this.adaptive)
	{
		this.materialToneMap.defines["ADAPTED_LUMINANCE"] = "";
		this.materialToneMap.uniforms.luminanceMap.value = this.luminanceRT.texture;
	}

	//Put something in the adaptive luminance texture so that the scene can render initially
	this.quad.material = new TONG.MeshBasicMaterial({ color: 0x777777 });
	this.materialLuminance.needsUpdate = true;
	this.materialAdaptiveLum.needsUpdate = true;
	this.materialToneMap.needsUpdate = true;
	// renderer.render(this.scene, this.camera, this.luminanceRT);
	// renderer.render(this.scene, this.camera, this.previousLuminanceRT);
	// renderer.render(this.scene, this.camera, this.currentLuminanceRT);
};

AdaptiveToneMappingPass.prototype.setAdaptive = function(adaptive)
{
	if(adaptive)
	{
		this.adaptive = true;
		this.materialToneMap.defines[ "ADAPTED_LUMINANCE"] = "";
		this.materialToneMap.uniforms.luminanceMap.value = this.luminanceRT.texture;
	}
	else
	{
		this.adaptive = false;
		delete this.materialToneMap.defines[ "ADAPTED_LUMINANCE"];
		this.materialToneMap.uniforms.luminanceMap.value = null;
	}
	this.materialToneMap.needsUpdate = true;
};

AdaptiveToneMappingPass.prototype.setAdaptionRate = function(rate)
{
	if(rate)
	{
		this.materialAdaptiveLum.uniforms.tau.value = Math.abs(rate);
	}
};

AdaptiveToneMappingPass.prototype.setMinLuminance = function(minLum)
{
	if(minLum)
	{
		this.materialToneMap.uniforms.minLuminance.value = minLum;
		this.materialAdaptiveLum.uniforms.minLuminance.value = minLum;
	}
};

AdaptiveToneMappingPass.prototype.setMaxLuminance = function(maxLum)
{
	if(maxLum)
	{
		this.materialToneMap.uniforms.maxLuminance.value = maxLum;
	}
};

AdaptiveToneMappingPass.prototype.setAverageLuminance = function(avgLum)
{
	if(avgLum)
	{
		this.materialToneMap.uniforms.averageLuminance.value = avgLum;
	}
};

AdaptiveToneMappingPass.prototype.setMiddleGrey = function(middleGrey)
{
	if(middleGrey)
	{
		this.materialToneMap.uniforms.middleGrey.value = middleGrey;
	}
};

AdaptiveToneMappingPass.prototype.dispose = function()
{
	if(this.luminanceRT)
	{
		this.luminanceRT.dispose();
	}
	if(this.previousLuminanceRT)
	{
		this.previousLuminanceRT.dispose();
	}
	if(this.currentLuminanceRT)
	{
		this.currentLuminanceRT.dispose();
	}
	if(this.materialLuminance)
	{
		this.materialLuminance.dispose();
	}
	if(this.materialAdaptiveLum)
	{
		this.materialAdaptiveLum.dispose();
	}
	if(this.materialCopy)
	{
		this.materialCopy.dispose();
	}
	if(this.materialToneMap)
	{
		this.materialToneMap.dispose();
	}
};