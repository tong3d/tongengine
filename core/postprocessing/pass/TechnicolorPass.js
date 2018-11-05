"use strict";

/**
 * Simulate technicolor television colors.
 * 
 * @class TechnicolorPass
 * @module Postprocessing
 * @constructor
 */
function TechnicolorPass()
{
	ShaderPass.call(this, TONG.TechnicolorShader);

	this.type = "Technicolor";
}

TechnicolorPass.prototype = Object.create(ShaderPass.prototype);
