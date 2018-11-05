"use strict";


/**
 * Cannon.js world used for physics simulation.
 * The world is configured by default with a NaiveBroadphase and a SplitSolver.
 * Documentation for cannon.js physics World object can be found here http://schteppe.github.io/cannon.js/docs/classes/World.html.
 * @property {World} world
 */
/**
 * Raycaster used for mouse interaction with 3D objects.
 * This raycaster is automatically updated using the first camera being drawn.
 * @property {Raycaster} raycaster
 */
/**
 * Normalized mouse coordinates used by the scene internal raycaster.
 * @property {Vector2} mouse
 */
/**
 * Program that contains this scene.
 * @property {Program} program
 */
/**
 * Canvas used to draw this scene.
 * @property {DOM} canvas
 */
function Scene()
{

	TONG._Scene.call(this);

	this.name = "scene";
	this.matrixAutoUpdate = false;

	this.usePhysics = true;

	this.world = new CANNON.World();
	this.world.defaultContactMaterial.contactEquationStiffness = 1e9;
	this.world.defaultContactMaterial.contactEquationRelaxation = 4;
	this.world.quatNormalizeSkip = 0;
	this.world.quatNormalizeFast = false;
	this.world.gravity.set(0, -9.8, 0);
	this.world.broadphase = new CANNON.NaiveBroadphase();
	this.world.solver = new CANNON.SplitSolver(new CANNON.GSSolver());
	this.world.solver.tolerance = 0.05;
	this.world.solver.iterations = 7;

	this.background = new TONG.Color(0x000000);

	//Cameras in use
	this.cameras = [];
	this.directionalLights=[];
	//Runtime objects
	this.raycaster = new TONG.Raycaster();
	this.clock = new TONG.Clock();
	this.delta = 0;

	//Renderer canvas
	//this.program = null;
	this.canvas = null;
	this.mouse=new Mouse();
	this.keyboard=new Keyboard();
	//Mouse normalized
	this.mouseNormalized = new TONG.Vector2(0, 0);
	this.renderer=null;

}

TONG._Scene = TONG.Scene;

Scene.prototype = Object.create(TONG._Scene.prototype);
Scene.prototype.constructor=Scene;
/**
 * Initialize scene objects.
 * 
 * Called automatically by the runtime.
 * 
 * @method initialize
 */
Scene.prototype.initialize = function(renderer)
{
	//Canvas and program

	this.canvas = renderer.domElement;
	this.renderer=renderer;
	//Initialize children
	//TONG.Object3D.prototype.initialize.call(this);

	this.mouse.canvas=this.canvas;

	//Start clock
	this.clock.start();
};

/**
 * Update scene objects and the physics world.
 * 
 * Called automatically by the runtime.
 * 
 * @method update
 */
Scene.prototype.update = function()
{
    this.mouse.update();
    this.keyboard.update();
	this.mouseNormalized.set( this.mouse.position.x/this.canvas.width * 2 - 1, -2 *  this.mouse.position.y/this.canvas.height + 1);
	if(this.cameras.length > 0)
	{
		this.raycaster.setFromCamera(this.mouseNormalized, this.cameras[0]);
	}

	this.delta = this.clock.getDelta();
	
	if(this.usePhysics)
	{
		//console.log(this.delta);
		this.world.step((this.delta < 0.05) ? this.delta : 0.05);
	}

	/*for(var i = 0; i < this.children.length; i++)
	{
		this.children[i].update(this.delta);
	}*/
};

/**
 * Render scene using all active cameras.
 * 
 * @method render
 * @param {Renderer} renderer
 */
Scene.prototype.render = function(renderer)
{
	var x = renderer.domElement.width;
	var y = renderer.domElement.height;


	renderer.setScissorTest(true);
	renderer.clear();

	for(var i = 0; i < this.cameras.length; i++)
	{	
		var camera = this.cameras[i];
		renderer.setViewport(x * camera.offset.x/window.devicePixelRatio, y * camera.offset.y/window.devicePixelRatio, x * camera.viewport.x/window.devicePixelRatio, y * camera.viewport.y/window.devicePixelRatio);
		renderer.setScissor(x * camera.offset.x/window.devicePixelRatio, y * camera.offset.y/window.devicePixelRatio, x * camera.viewport.x/window.devicePixelRatio, y * camera.viewport.y/window.devicePixelRatio);

		renderer.autoClearColor = camera.clearColor;
		renderer.autoClearDepth = camera.clearDepth;
		renderer.autoClearStencil = camera.clearStencil;

		camera.render(renderer, this);
		//renderer.render(this, camera);
	}

	renderer.setScissorTest(false);
};

/**
 * Get camera from scene using cameras uuid.
 * 
 * @method getCamera
 * @param {String} uuid UUID of the camera
 * @return {Camera} Camera if found, else null
 */
Scene.prototype.getCamera = function(uuid, obj)
{
	if(obj === undefined)
	{
		obj = this;
	}

	if(uuid === obj.uuid)
	{
		return obj;
	}

	var children = obj.children;
	for(var i = 0; i < children.length; i++)
	{
		var camera = this.getCamera(uuid, children[i]);
		if(camera !== null)
		{
			return camera;
		}
	}

	return null;
};

Scene.prototype.setSize=function(width,height){

    for(var i = 0; i < this.cameras.length; i++)
    {
        var camera = this.cameras[i];
        camera.aspect = width / height;
        camera.resize(width,height);
        camera.updateProjectionMatrix();

        camera.render(this.renderer, this);
        //renderer.render(this, camera);
    }
    this.render(this.renderer);
    this.renderer.setSize( width, height );
}

/**
 * Add camera to active cameras list.
 * 
 * @method addCamera
 * @param {Camera} camera
 */
Scene.prototype.addCamera = function(camera)
{
	if(this.cameras.indexOf(camera) === -1)
	{
		this.cameras.push(camera);
		this.updateCameraOrder();
	}
};


Scene.prototype.addDirectionalLight=function(light){
    if(this.directionalLights.indexOf(light) === -1)
    {
        this.directionalLights.push(light);
    }
}

/**
 * Update active camera lister order.
 *
 * This method should be called after changing order value for an active camera.
 *  
 * @method updateCameraOrder
 */
Scene.prototype.updateCameraOrder = function()
{
	this.cameras.sort(function(a, b)
	{
		return a.order > b.order;
	});
};

/**
 * Remove camera from active camera list.
 * 
 * @param {Camera} camera Camera to be removed
 * @method removeCamera
 */
Scene.prototype.removeCamera = function(camera)
{
	var index = this.cameras.indexOf(camera);
	if(index > -1)
	{
		this.cameras.splice(index, 1);
	}
};

/**
 * Check is camera is active.
 * 
 * @param {Camera} camera Camera to be removed
 * @method isCameraActive
 */
Scene.prototype.isCameraActive = function(camera)
{
	return this.cameras.indexOf(camera) > -1;
};

/**
 * Set scene fog mode.
 * 
 * @param {Number} mode
 * @method setFogMode
 */
Scene.prototype.setFogMode = function(mode)
{	
	var color = (this.fog !== null) ? this.fog.color.getHex() : "#FFFFFF";

	if(mode === TONG.Fog.LINEAR)
	{	
		this.fog = new TONG.Fog(color, 5, 20);
	}
	else if(mode === TONG.Fog.EXPONENTIAL)
	{
		this.fog = new TONG.FogExp2(color, 0.01);
	}
	else if(mode === TONG.Fog.NONE)
	{
		this.fog = null;
	}
};

/*Scene.prototype.cloneAll=function(){
	var currScene=new Scene();
	this.traverse(function(object3d){
		var currentObject=object3d.clone();
		if(object3d instanceof TONG.Scene){
            currentObject=currScene;
		}
		for(var i=0;i<object3d.components.length;i++){
            currentObject.addComponent(object3d.components[i].clone());
		}

	});


}*/

/**
 * Serialize scene object as JSON.
 * 
 * Also serializes physics world information.
 * 
 * @method toJSON
 * @param {Object} meta
 * @return {Object} json
 */
Scene.prototype.toJSON = function(meta)
{
	/*if(this.parent == null || this.parent.type !== "Program")
	{
		this.type = "Group";
		console.warn("TongEngine: Scene is not on top level serializing as Group.");
		return TONG.Object3D.prototype.toJSON.call(this, meta);
	}*/

	var background = this.background;
	var data = TONG.Object3D.prototype.toJSON.call(this, meta, function(meta, object)
	{
		if(background instanceof TONG.Color)
		{
			background = background.toJSON(meta);
		}
		else if(background instanceof TONG.Texture)
		{
			background = background.toJSON(meta).uuid;
		}
	});

	if(background !== null)
	{
		data.object.background = background;
	}

	if(this.fog !== null)
	{
		data.object.fog = this.fog.toJSON();
	}

	data.object.usePhysics = this.usePhysics;

	data.object.cameras = [];
	for(var i = 0; i < this.cameras.length; i++)
	{
		data.object.cameras.push(this.cameras[i].uuid);
	}

	data.object.world = {};
	data.object.world.gravity = this.world.gravity;
	data.object.world.quatNormalizeSkip = this.world.quatNormalizeSkip;
	data.object.world.quatNormalizeFast = this.world.quatNormalizeFast;
	data.object.world.solver = {};
	data.object.world.solver.tolerance = this.world.solver.tolerance;
	data.object.world.solver.iterations = this.world.solver.iterations;

	return data;
};


TONG.Object3D.prototype._body= null;

Object.defineProperty( TONG.Object3D.prototype, 'body', {
    set: function(v)
    {
		if(v instanceof CANNON.Body){
			this._body=v;
		}
    },
    get: function(){
    	if(this._body==null){
            var bodyMat = new CANNON.Material();
            bodyMat.friction = 0;
            bodyMat.restitution=0;
            this._body=new CANNON.Body({mass:1,material:bodyMat});
            this._body.type= CANNON.Body.STATIC;
		}
        return this._body;
    },
    enumerable: false //uid better not be enumerable (so it doesnt show in the editor)
});

Object.defineProperty( TONG.Object3D.prototype, 'worldPosition', {

    get: function(){

		var pos=new TONG.Vector3();
		pos.copy(this.position);
		function getWorldPos(obj){
			if(!obj.parent){
				return;
			}else{
                pos.add(obj.position);
                getWorldPos(obj.parent);
			}
		}
		getWorldPos(this.parent);
        return pos;
    },
    enumerable: false //uid better not be enumerable (so it doesnt show in the editor)
});


Object.defineProperty( TONG.Object3D.prototype, 'worldQuaternion', {

    get: function(){

        var quater=new TONG.Quaternion();
        quater.setFromEuler(this.worldRotation);
        return quater;
    },
    enumerable: false //uid better not be enumerable (so it doesnt show in the editor)
});

Object.defineProperty( TONG.Object3D.prototype, 'worldRotation', {

    get: function(){
    	var order=this.rotation.order;
        var rot=new TONG.Vector3();
        rot.copy(this.rotation.toVector3());
        function getWorldRot(obj){
            if(!obj.parent){
                return;
            }else{
                rot.add(obj.rotation.toVector3());
                getWorldRot(obj.parent);
            }
        }
        getWorldRot(this.parent);
        var eulerRes=new TONG.Euler();
        eulerRes.setFromVector3(rot,order);
        return eulerRes;
    },
    enumerable: false //uid better not be enumerable (so it doesnt show in the editor)
});

Object.defineProperty( TONG.Object3D.prototype, 'worldScale', {

    get: function(){
        var scal=new TONG.Vector3();
        scal.copy(this.scale);
        function getWorldScale(obj){
            if(!obj.parent){
                return;
            }else{
                scal.multiply(obj.scale);
                getWorldScale(obj.parent);
            }
        }
        getWorldScale(this.parent);
        return scal;
    },
    enumerable: false //uid better not be enumerable (so it doesnt show in the editor)
});


TONG.Object3D.prototype.addShape = function(shape)
{
    if(shape instanceof CANNON.Shape)
    {
        this.body.addShape(shape);
    }
};

TONG.Object3D.prototype.setPosition= function ( position ){
    this.updateMatrixWorld( true );
	var offset=new TONG.Vector3();
    offset.copy( position );
    this.worldToLocal( offset );
    this.position.add( offset );
}
TONG.Object3D.prototype.setRotation=function ( rotation, world ) {
    if ( !this.parent || world !== true ) {
        this.rotation.copy( rotation );
    } else {
        this.setWorldRotation( rotation );
    }
}
TONG.Object3D.prototype.setScale=function ( scale, world ) {
    if ( !this.parent || world !== true ) {
        this.scale.copy( scale );
    } else {
        this.setWorldScale( scale );
    }
}




TONG.Object3D.prototype.setWorldScale= function ( worldScale ) {
    if ( this.parent ) {
        var scale = new TONG.Vector3();
        this.parent.updateMatrixWorld( true );
        this.parent.getWorldScale( scale );
        worldScale.divide( scale );
        this.scale.copy( worldScale );
    } else {
        this.scale.set( worldScale );
    }
}
TONG.Object3D.prototype.setWorldRotation=function ( worldRotation ) {
    if ( this.parent ) {
        var rotation = new TONG.Euler();
        this.parent.updateMatrixWorld( true );
        this.parent.getWorldRotation( rotation );
        this.rotation.set( worldRotation.x - rotation.x, worldRotation.y - rotation.y, worldRotation.z - rotation.z );
    } else {
        this.rotation.set( worldRotation );
    }
}


TONG.Object3D.prototype.lookObject = function() {

    // based on the one from Three.js, but for use on world matrices.

    var m1 = new TONG.Matrix4();

    var sourcePosition = new TONG.Vector3()
    var sourceQuaternion = new TONG.Quaternion()
    var sourceScale = new TONG.Vector3()

    var targetPosition = new TONG.Vector3()
    var targetQuaternion = new TONG.Quaternion()
    var targetScale = new TONG.Vector3()
	var that=this;
    // sourceObject will look at targetObject
    return function lookObject(  targetObject ) {

        that.matrixWorld.decompose( sourcePosition, sourceQuaternion, sourceScale )
        that.matrixWorld.decompose( targetPosition, targetQuaternion, targetScale )

        if ( that.isCamera ) {

            m1.lookAt( sourcePosition, targetPosition, that.up );

        } else {

            m1.lookAt( targetPosition, sourcePosition, that.up );

        }

        sourceQuaternion.setFromRotationMatrix( m1 );

        that.matrixWorld.compose( sourcePosition, sourceQuaternion, sourceScale )

    };

}


