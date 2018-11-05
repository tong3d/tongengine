"use strict";

/**
 * Sobel pass is used to create a edge highlight effect with a sobel operator.
 *  
 * @class SobelPass
 * @constructor
 * @module Postprocessing
 */
function SobelPass(center, angle, scale)
{
	if(TONG.SobelOperatorShader === undefined)
	{
		console.error("SobelPass relies on TONG.SobelOperatorShader");
	}
	if(TONG.LuminosityShader === undefined)
	{
		console.error("SobelPass relies on TONG.LuminosityShader");
	}

	ShaderPass.call(this, TONG.SobelOperatorShader);

	this.type = "Sobel";
};

SobelPass.prototype = Object.create(ShaderPass.prototype);

SobelPass.prototype.setSize = function(width, height)
{
	this.uniforms.resolution.value.set(width, height);
};
