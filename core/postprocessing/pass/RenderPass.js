"use strict";

/**
 * Render pass is used to render the scene the same way as if were using the renderer directly.
 * 
 * @class RenderPass
 * @extends {Pass}
 * @module Postprocessing
 */
function RenderPass()
{
	Pass.call(this);

	this.type = "Render";
	this.needsSwap = false;
	this.clear = false;
	//if is Render set false,the current pass,Not involved in rendering
	this.isRender=true;
}

RenderPass.prototype = Object.create(Pass.prototype);

RenderPass.prototype.render = function(renderer, writeBuffer, readBuffer, delta, maskActive, scene, camera)
{
	if(this.renderToScreen)
	{
		renderer.render(scene, camera, null, this.clear);
	}
	else
	{
		renderer.render(scene, camera, readBuffer, this.clear);
	}
};
