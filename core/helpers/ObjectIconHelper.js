"use strict";

function ObjectIconHelper(object, icon)
{
	var element = document.createElement("img");
	var texture = new TONG.Texture(element);
	element.onload = function()
	{
		texture.needsUpdate = true;
	};
	element.src = icon;

	TONG.Sprite.call(this, new TONG.SpriteMaterial(
	{
		map: texture,
		transparent: true,
		opacity: 1,
		depthTest: true,
		depthWrite: true,
		color: 0xffffff
	}));

	this.object = object;

	this.tempA = new TONG.Vector3();
	this.tempB = new TONG.Vector3();
	this.update();
}


ObjectIconHelper.prototype = Object.create(TONG.Sprite.prototype);

ObjectIconHelper.prototype.onBeforeRender = function(renderer, scene, camera, geometry, material, group)
{
	this.getWorldPosition(this.tempA);
	camera.getWorldPosition(this.tempB);
	var distance=this.tempA.distanceTo(this.tempB);
	if(distance<=3.0){
		this.material.opacity=distance/3.0;
	}else{
        this.material.opacity=1;
	}

	//var scale = this.tempA.distanceTo(this.tempB) / 10;

	//this.scale.set(scale, scale, scale);
};


ObjectIconHelper.prototype.update = function()
{
	this.object.getWorldPosition(this.position);
};