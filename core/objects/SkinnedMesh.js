"use strict";

/**
 * SkinnedMesh is a Mesh that has a Skeleton attached.
 * 
 * A skeleton contains bones that are used to animate the vertices of the geometry.
 * 
 * Based on THREE.SkinnedMesh documentation for the object can be found at https://threejs.org/docs/index.html#Reference/Objects/SkinnedMesh
 * 
 * @class SkinnedMesh
 * @module Meshes
 * @param {Geometry} geometry Geometry used by this mesh
 * @param {Material} material Material used to shade the superficie of the geometry
 * @constructor
 * @extends {SkinnedMesh}
 */
/**
 * Geometry defined the object structure.
 *
 * @property geometry
 * @type {Geometry}
 */
/**
 * Material is used to define how the geometry surface is shaded.
 *
 * @property material
 * @type {Material}
*/
/**
 * Determines how the mesh triangles are constructed from the vertices.
 *
 * Only works when the geometry is a BufferGeometry.
 *
 * @property drawMode
 * @default TrianglesDrawMode
 */
/**
 * Array with the bones attached to this mesh.
 *
 * @property bones
 * @type {Array}
*/
function SkinnedMesh(geometry, material, useVertexTexture)
{
	TONG._SkinnedMesh.call(this, geometry, material, useVertexTexture);


	this.name = "skinned";
	this.currentAnimation='';
	this.isLoop=true;
	this.isAutoPlay=true;
	this.reversePlay=false;
	this.source=null;
	this.receiveShadow = true;
	this.castShadow = true;
}

TONG._SkinnedMesh = TONG.SkinnedMesh;
TONG.SkinnedMesh = SkinnedMesh;

SkinnedMesh.prototype = Object.create(TONG._SkinnedMesh.prototype);

/**
 * Dispose mesh along with its material and geometry.
 * 
 * @method dispose
 */
SkinnedMesh.prototype.dispose = function()
{
	//Material and geometry
	if(this.material !== null && this.material.dispose !== undefined)
	{
		this.material.dispose();
	}

	if(this.geometry !== null)
	{
		this.geometry.dispose();
	}

	TONG.Object3D.prototype.dispose.call(this);
};


SkinnedMesh.prototype.clone=function(){
    var skinMesh=new TONG.SkinnedMesh(this.geometry,this.material);
	skinMesh.copy(this);
	skinMesh.source=this.source;
    skinMesh.animations=this.animations;
    return skinMesh;
}

/**
 * Bind a skeleton to this SkinnedMesh. The bindMatrix gets saved to .bindMatrix property and the .bindMatrixInverse gets calculated.
 * 
 * This is called automatically in the constructor, and the skeleton is created from the bones of the Geometry passed in the constructor.
 * 
 * @method bind
 * @param {Skeleton} skeleton
 * @param {Matrix4} bindMatrix
 */

/**
 * Serialize skinned mesh to json.
 *
 * @method toJSON
 * @param {Object} meta Metadata
 */
SkinnedMesh.prototype.toJSON = function(meta)
{
	var self = this;
	var data = TONG.Object3D.prototype.toJSON.call(this, meta);

    if(self.skeleton !== undefined)
    {
        if(meta.skeletons[self.skeleton.uuid] === undefined)
        {
            meta.skeletons[self.skeleton.uuid] = self.skeleton.toJSON();
        }

        data.object.skeleton = self.skeleton.uuid;
    }
	//Bind mode and matrix
	if(this.bindMode !== undefined)
	{
		data.object.bindMode = this.bindMode;
	}
	if(this.bindMatrix !== undefined)
	{
		data.object.bindMatrix = this.bindMatrix.toArray();
	}
	data.object.currentAnimation=this.currentAnimation;
    data.object.isLoop=this.isLoop;
    data.object.isAutoPlay=this.isAutoPlay;
    data.object.reversePlay=this.reversePlay;
	data.object.source=this.source?this.source.uuid:0;


	return data;
};