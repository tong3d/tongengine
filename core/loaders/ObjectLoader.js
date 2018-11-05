"use strict";

/**
 * Objectloader can be used to load external objects from files.
 *
 * Also loads all resources attached to the objects being loaded.
 *
 * Can parse be used to load on runtime resources and objects from external isp project files.
 *
 * @constructor
 * @class ObjectLoader
 * @module Loaders
 * @param {Object} manager
 */

function ObjectLoader(manager)
{
    this.textures=null;
    this.fontAssets=null;
    this.animationClips=null;
    this.scene=null;
	TONG.ObjectLoader.call(this,manager);
}
ObjectLoader.prototype=Object.create(TONG.ObjectLoader.prototype);
ObjectLoader.prototype.constructor=ObjectLoader;

/**
 * Parse skeletons from json.
 *
 * @method parseSkeletons
 * @param {Object} json
 * @param {Object} object
 */
ObjectLoader.prototype.parseSkeletons = function(json, object)
{
    var skeletons = {};

    if(json === undefined)
    {
        return skeletons;
    }

    for(var i = 0; i < json.length; i++)
    {
        var skeletonParams = json[i];

        var uuid = skeletonParams.uuid;
        var boneParams = skeletonParams.bones;
        var boneInverseParams = skeletonParams.boneInverses;

        var bones = [];
        var boneInverses = [];

        for(var j = 0, jl = boneParams.length; j < jl; j++)
        {
            var bone = object.getObjectByProperty("uuid", boneParams[j]);

            if(bone === undefined)
            {
                console.warn("TONG.ObjectLoader: Not found Bone whose uuid is " + boneParams[j]);
                bone = new TONG.Bone();
            }

            bones.push(bone);
            boneInverses.push(new TONG.Matrix4().fromArray(boneInverseParams[j]));
        }

        skeletons[uuid] = new Skeleton(bones, boneInverses);
    }

    return skeletons;
};
/**
 * Auxiliar method to bind skeletons to loaded objects.
 *
 * @method bindSkeletons
 * @param {Object3D} object Object3D that contains objects
 * @param {Array} skeletons Array of skeletons to be binded.
 */
ObjectLoader.prototype.bindSkeletons = function(object, skeletons)
{
    if(Object.keys(skeletons).length === 0)
    {
        return;
    }

    object.traverse(function(obj)
    {
        if(obj.isSkinnedMesh === true && obj.skeletonUUID !== undefined)
        {
            var skeleton = skeletons[obj.skeletonUUID];

            if(skeleton === undefined)
            {
                console.warn( 'TONG.ObjectLoader: Not found Skeleton whose uuid is ' + obj.skeletonUUID);
            }
            else
            {
                obj.bind(skeleton, obj.bindMatrix);
            }

            delete obj.skeletonUUID;
        }
    });
};

ObjectLoader.prototype.parseObject=function(data, geometries, materials,textures,fontAssets,animationClips){
    var object;
    var that=this;

    if(textures){
        that.textures=textures;
    }
    if(fontAssets){
        that.fontAssets=fontAssets;
    }
    if(animationClips){
        that.animationClips=animationClips;
    }

    function getAnimationClip(uuid){
        if(that.animationClips[uuid]==undefined){
            console.warn("ObjectLoader: Undefined animationClip", uuid);
        }
        return that.animationClips[uuid];
    }

    function getTexture(uuid)
    {

        //console.log(that.textures);
        if(that.textures[uuid] === undefined)
        {
            console.warn("ObjectLoader: Undefined texture", uuid);
        }
        return that.textures[uuid];
    }

    function getFontAsset(uuid){
        if(that.fontAssets[uuid] === undefined)
        {
            console.warn("ObjectLoader: Undefined fontAssets", uuid);
        }
        return that.fontAssets[uuid];
    }

    function getGeometry( name ) {

        if ( geometries[ name ] === undefined ) {
            console.warn( 'TONG.ObjectLoader: Undefined geometry', name );

        }

        return geometries[ name ];

    }

    function getMaterial( name ) {

        if ( name === undefined ) return undefined;

        if ( Array.isArray( name ) ) {

            var array = [];

            for ( var i = 0, l = name.length; i < l; i ++ ) {

                var uuid = name[ i ];

                if ( materials[ uuid ] === undefined ) {

                    console.warn( 'TONG.ObjectLoader: Undefined material', uuid );

                }

                array.push( materials[ uuid ] );

            }

            return array;

        }

        if ( materials[ name ] === undefined ) {

            console.warn( 'TONG.ObjectLoader: Undefined material', name );

        }

        return materials[ name ];

    }

    switch ( data.type ) {

        case 'Scene':

            object = new Scene();
            that.scene=object;
            if(data.background !== undefined)
            {
                if(Number.isInteger(data.background))
                {
                    object.background = new TONG.Color(data.background);
                }
                /*else
                {
                    object.background = getTexture(data.background);
                }*/
            }

            if(data.fog !== undefined)
            {
                if(data.fog.type === "Fog")
                {
                    object.fog = new TONG.Fog(data.fog.color, data.fog.near, data.fog.far);
                }
                else if(data.fog.type === "FogExp2")
                {
                    object.fog = new TONG.FogExp2(data.fog.color, data.fog.density);
                }
            }

            if(data.cameras !== undefined)
            {
                object.cameras = data.cameras;
            }

            if(data.usePhysics !== undefined)
            {
                object.usePhysics = data.usePhysics;
            }

            if(data.world !== undefined)
            {
                object.world.gravity.set(data.world.gravity.x, data.world.gravity.y, data.world.gravity.z);
                object.world.quatNormalizeSkip = data.world.quatNormalizeSkip;
                object.world.quatNormalizeFast = data.world.quatNormalizeFast;

                object.world.solver.tolerance = data.world.solver.tolerance;
                object.world.solver.iterations = data.world.solver.iterations;
            }
            break;
        case "Physics":
            object = new PhysicsObject();
            object.body.type = data.body.type;
            object.body.mass = data.body.mass;
            object.body.linearDamping = data.body.linearDamping;
            object.body.angularDamping = data.body.angularDamping;
            object.body.allowSleep = data.body.allowSleep;
            object.body.sleepSpeedLimit = data.body.sleepSpeedLimit;
            object.body.sleepTimeLimit = data.body.sleepTimeLimit;
            object.body.collisionFilterGroup = data.body.collisionFilterGroup;
            object.body.collisionFilterMask = data.body.collisionFilterMask;
            object.body.fixedRotation = data.body.fixedRotation;
            var shapes = data.body.shapes;
            for(var i = 0; i < shapes.length; i++)
            {
                var shape = shapes[i];

                if(shape.type === CANNON.Shape.types.SPHERE)
                {
                    object.body.addShape(new CANNON.Sphere(shape.radius));
                }
                else if(shape.type === CANNON.Shape.types.BOX)
                {
                    object.body.addShape(new CANNON.Box(new CANNON.Vec3(shape.halfExtents.x, shape.halfExtents.y, shape.halfExtents.z)));
                }
                else if(shape.type === CANNON.Shape.types.PARTICLE)
                {
                    object.body.addShape(new CANNON.Particle());
                }
                else if(shape.type === CANNON.Shape.types.PLANE)
                {
                    object.body.addShape(new CANNON.Plane());
                }
                else if(shape.type === CANNON.Shape.types.CONVEXPOLYHEDRON)
                {
                    object.body.addShape(new CANNON.ConvexPolyhedron(shape.vertices, shape.faces));
                }
            }
            break;
        case 'PerspectiveCamera':

            object = new PerspectiveCamera(data.fov, data.aspect, data.near, data.far);

            if(data.focus !== undefined)
            {
                object.focus = data.focus;
            }
            if(data.zoom !== undefined)
            {
                object.zoom = data.zoom;
            }
            if(data.filmGauge !== undefined)
            {
                object.filmGauge = data.filmGauge;
            }
            if(data.filmOffset !== undefined)
            {
                object.filmOffset = data.filmOffset;
            }
            if(data.view !== undefined)
            {
                object.view = Object.assign({}, data.view);
            }
            if(data.viewport !== undefined)
            {
                object.viewport.fromArray(data.viewport);
            }
            if(data.offset !== undefined)
            {
                object.offset.fromArray(data.offset);
            }
            if(data.clearColor !== undefined)
            {
                object.clearColor = data.clearColor;
            }
            if(data.clearDepth !== undefined)
            {
                object.clearDepth = data.clearDepth;
            }
            if(data.clearStencil !== undefined)
            {
                object.clearStencil = data.clearStencil;
            }
            if(data.order !== undefined)
            {
                object.order = data.order;
            }

            if(data.composer !== undefined)
            {
                object.composer = EffectComposer.fromJSON(data.composer);
            }

            if(data.renderTexture){
                object.renderTexture=getTexture(data.renderTexture);
            }

            that.scene?that.scene.addCamera(object):null;
            break;

        case 'OrthographicCamera':
            object = new OrthographicCamera(data.size, data.aspect, data.mode, data.near, data.far);
            if(data.viewport !== undefined)
            {
                object.viewport.fromArray(data.viewport);
            }
            if(data.offset !== undefined)
            {
                object.offset.fromArray(data.offset);
            }
            if(data.clearColor !== undefined)
            {
                object.clearColor = data.clearColor;
            }
            if(data.clearDepth !== undefined)
            {
                object.clearDepth = data.clearDepth;
            }
            if(data.clearStencil !== undefined)
            {
                object.clearStencil = data.clearStencil;
            }
            if(data.order !== undefined)
            {
                object.order = data.order;
            }
            if(data.composer !== undefined)
            {
                object.composer = EffectComposer.fromJSON(data.composer);
            }
            if(data.zoom !== undefined)
            {
                object.zoom = data.zoom;
            }
            if(data.view !== undefined)
            {
                object.view = Object.assign( {}, data.view );
            }

            that.scene?that.scene.addCamera(object):0;
            break;

        case 'AmbientLight':

            object = new TONG.AmbientLight( data.color, data.intensity );

            break;

        case 'DirectionalLight':

            object = new TONG.DirectionalLight( data.color, data.intensity );

            break;

        case 'PointLight':

            object = new TONG.PointLight( data.color, data.intensity, data.distance, data.decay );

            break;

        case 'RectAreaLight':

            object = new TONG.RectAreaLight( data.color, data.intensity, data.width, data.height );

            break;

        case 'SpotLight':

            object = new TONG.SpotLight( data.color, data.intensity, data.distance, data.angle, data.penumbra, data.decay );

            break;

        case 'HemisphereLight':

            object = new TONG.HemisphereLight( data.color, data.groundColor, data.intensity );

            break;
        case "SkinnedMesh":
            var geometry = getGeometry(data.geometry);
            var material = getMaterial(data.material);
            var tmpBones;

            //If data has skeleton, assumes bones are already in scene graph. Then temporarily undefines geometry.bones not to create bones in SkinnedMesh constructor.
            if(data.skeleton !== undefined && geometry.bones !== undefined)
            {
                tmpBones = geometry.bones;
                geometry.bones = undefined;
            }

            object = new SkinnedMesh(geometry, material);

            //Rebinds with skeleton whose uuid is data.skeleton later.
            if(data.skeleton !== undefined)
            {
                object.skeletonUUID = data.skeleton;
            }


            if(data.bindMode !== undefined)
            {
                object.bindMode = data.bindMode;
            }

            if(data.bindMatrix !== undefined)
            {
                object.bindMatrix.fromArray(data.bindMatrix);
            }
            object.currentAnimation=data.currentAnimation;
            object.isAutoPlay=data.isAutoPlay;
            object.isLoop=data.isLoop;
            object.reversePlay=data.reversePlay;
            //object.source=that.scene.getObjectByProperty('uuid',data.source);
            object.updateMatrixWorld(true);

            if(tmpBones !== undefined)
            {
                geometry.bones = tmpBones;
            }
           /* //配置系统内置组件
            for(var r =0 ;r<object.registerComponents.length;r++) {
                var component=object.addComponent(object.registerComponents[r]);
                component.scene=that.scene;
            }*/
            break;
        case "Sky":

            object = new TONG.Sky();
            object.distance=data.distance;
            object.inclination=data.inclination;
            object.azimuth=data.azimuth;
            object.turbidity=data.turbidity;
            object.rayleigh = data.rayleigh;
            object.luminance = data.luminance;
            object.mieCoefficient = data.mieCoefficient;
            object.mieDirectionalG = data.mieDirectionalG;
            object.sun.castShadow=data.castShadow;
            object.sun.intensity=data.intensity;
            object.updateSky();

            break;
        case "LensFlare":
            object = new LensFlare();

            if(data.lensFlares !== undefined)
            {
                data.elements = data.lensFlares;
            }

            for(var i = 0; i < data.elements.length; i++)
            {
                object.addFlare(getTexture(data.elements[i].texture), data.elements[i].size, data.elements[i].distance, new TONG.Color(data.elements[i].color));
            }

            break;
        case "Text3D":
            if(!window.DefaultFont) {
                window.DefaultFont = new TONG.Font("default.json");
            }
            var defaultFont=window.DefaultFont;
            object = new Text3D(data.text, getMaterial(data.material), data.font==false?defaultFont:getFontAsset(data.font), data.height, data.bevel, data.bevelThickness, data.bevelSize, data.size, data.curveSegments);
            break;
        case 'Mesh':

            var geometry = getGeometry( data.geometry );
            var material = getMaterial( data.material );

            if ( geometry.bones && geometry.bones.length > 0 ) {

                object = new TONG.SkinnedMesh( geometry, material );

            } else {

                object = new TONG.Mesh( geometry, material );

            }

            break;

        case 'LOD':

            object = new TONG.LOD();

            break;

        case 'Line':

            object = new TONG.Line( getGeometry( data.geometry ), getMaterial( data.material ), data.mode );

            break;

        case 'LineLoop':

            object = new TONG.LineLoop( getGeometry( data.geometry ), getMaterial( data.material ) );

            break;

        case 'LineSegments':

            object = new TONG.LineSegments( getGeometry( data.geometry ), getMaterial( data.material ) );

            break;

        case 'PointCloud':
        case 'Points':

            object = new TONG.Points( getGeometry( data.geometry ), getMaterial( data.material ) );

            break;

        case 'Sprite':

            object = new TONG.Sprite( getMaterial( data.material ) );

            break;

        case 'Group':

            object = new TONG.Group();

            break;

        default:

            object = new TONG.Object3D();

    }

    object.uuid = data.uuid;

    if ( data.name !== undefined ) object.name = data.name;
    //Animations
    if(data.animations !== undefined)
    {
        object.animations = [];

        for(var i = 0; i < data.animations.length; i++)
        {
           var currClip=getAnimationClip(data.animations[i]);
            if(currClip) {
                object.animations.push(currClip);
            }
        }
    }
    if ( data.matrix !== undefined ) {

        object.matrix.fromArray( data.matrix );

        if ( data.matrixAutoUpdate !== undefined ) object.matrixAutoUpdate = data.matrixAutoUpdate;
        if ( object.matrixAutoUpdate ) object.matrix.decompose( object.position, object.quaternion, object.scale );

    } else {

        if ( data.position !== undefined ) object.position.fromArray( data.position );
        if ( data.rotation !== undefined ) object.rotation.fromArray( data.rotation );
        if ( data.quaternion !== undefined ) object.quaternion.fromArray( data.quaternion );
        if ( data.scale !== undefined ) object.scale.fromArray( data.scale );

    }

    if ( data.castShadow !== undefined ) object.castShadow = data.castShadow;
    if ( data.receiveShadow !== undefined ) object.receiveShadow = data.receiveShadow;

    if ( data.shadow ) {

        if ( data.shadow.bias !== undefined ) object.shadow.bias = data.shadow.bias;
        if ( data.shadow.radius !== undefined ) object.shadow.radius = data.shadow.radius;
        if ( data.shadow.mapSize !== undefined ) object.shadow.mapSize.fromArray( data.shadow.mapSize );
        if ( data.shadow.camera !== undefined ) object.shadow.camera = this.parseObject( data.shadow.camera );
    }

    if ( data.visible !== undefined ) object.visible = data.visible;
    if ( data.frustumCulled !== undefined ) object.frustumCulled = data.frustumCulled;
    if ( data.renderOrder !== undefined ) object.renderOrder = data.renderOrder;
    if ( data.userData !== undefined ) object.userData = data.userData;
    if ( data.layers !== undefined ) object.layers.mask = data.layers;




    if ( data.children !== undefined ) {

        var children = data.children;

        for ( var i = 0; i < children.length; i ++ ) {
            var childObject= this.parseObject( children[ i ], geometries, materials );

            object.add(childObject);

        }

    }

    if(data.type === "Scene")
    {
        /*for(var i = 0; i < object.cameras.length; i++)
        {
            var camera = object.getCamera(object.cameras[i]);
            if(camera !== null)
            {
                object.cameras[i] = camera;
            }
            else
            {
                object.cameras.splice(i, 1);
            }
        }*/
    }else if ( data.type === 'LOD' ) {

        var levels = data.levels;

        for ( var l = 0; l < levels.length; l ++ ) {

            var level = levels[ l ];
            var child = object.getObjectByProperty( 'uuid', level.object );

            if ( child !== undefined ) {

                object.addLevel( child, level.distance );

            }

        }

    }

    return object;

}


ObjectLoader.prototype.parseBackupObject=function( data, geometries, materials,textures ) {

    var object;
    var that=this;
    if(textures){
        that.textures=textures;
    }
    function getTexture(uuid)
    {

        console.log(that.textures);
        if(that.textures[uuid] === undefined)
        {
            console.warn("ObjectLoader: Undefined texture", uuid);
        }
        return that.textures[uuid];
    }

    function getGeometry( name ) {

        if ( geometries[ name ] === undefined ) {

            console.warn( 'TONG.ObjectLoader: Undefined geometry', name );

        }

        return geometries[ name ];

    }

    function getMaterial( name ) {

        if ( name === undefined ) return undefined;

        if ( Array.isArray( name ) ) {

            var array = [];

            for ( var i = 0, l = name.length; i < l; i ++ ) {

                var uuid = name[ i ];

                if ( materials[ uuid ] === undefined ) {

                    console.warn( 'TONG.ObjectLoader: Undefined material', uuid );

                }

                array.push( materials[ uuid ] );

            }

            return array;

        }

        if ( materials[ name ] === undefined ) {

            console.warn( 'TONG.ObjectLoader: Undefined material', name );

        }

        return materials[ name ];

    }

    switch ( data.type ) {

        case 'Scene':

            object = new TONG.Scene();

            if ( data.background !== undefined ) {

                if ( Number.isInteger( data.background ) ) {

                    object.background = new TONG.Color( data.background );

                }

            }

            if ( data.fog !== undefined ) {

                if ( data.fog.type === 'Fog' ) {

                    object.fog = new TONG.Fog( data.fog.color, data.fog.near, data.fog.far );

                } else if ( data.fog.type === 'FogExp2' ) {

                    object.fog = new TONG.FogExp2( data.fog.color, data.fog.density );

                }

            }

            break;

        case 'PerspectiveCamera':

            object = new TONG.PerspectiveCamera( data.fov, data.aspect, data.near, data.far );

            if ( data.focus !== undefined ) object.focus = data.focus;
            if ( data.zoom !== undefined ) object.zoom = data.zoom;
            if ( data.filmGauge !== undefined ) object.filmGauge = data.filmGauge;
            if ( data.filmOffset !== undefined ) object.filmOffset = data.filmOffset;
            if ( data.view !== undefined ) object.view = Object.assign( {}, data.view );

            break;

        case 'OrthographicCamera':

            object = new TONG.OrthographicCamera( data.left, data.right, data.top, data.bottom, data.near, data.far );

            if ( data.zoom !== undefined ) object.zoom = data.zoom;
            if ( data.view !== undefined ) object.view = Object.assign( {}, data.view );

            break;

        case 'AmbientLight':

            object = new TONG.AmbientLight( data.color, data.intensity );

            break;

        case 'DirectionalLight':

            object = new TONG.DirectionalLight( data.color, data.intensity );

            break;

        case 'PointLight':

            object = new TONG.PointLight( data.color, data.intensity, data.distance, data.decay );

            break;

        case 'RectAreaLight':

            object = new TONG.RectAreaLight( data.color, data.intensity, data.width, data.height );

            break;

        case 'SpotLight':

            object = new TONG.SpotLight( data.color, data.intensity, data.distance, data.angle, data.penumbra, data.decay );

            break;

        case 'HemisphereLight':

            object = new TONG.HemisphereLight( data.color, data.groundColor, data.intensity );

            break;
        case "SkinnedMesh":
            var geometry = getGeometry(data.geometry);
            var material = getMaterial(data.material);
            var tmpBones;

            //If data has skeleton, assumes bones are already in scene graph. Then temporarily undefines geometry.bones not to create bones in SkinnedMesh constructor.
            if(data.skeleton !== undefined && geometry.bones !== undefined)
            {
                tmpBones = geometry.bones;
                geometry.bones = undefined;
            }

            object = new SkinnedMesh(geometry, material);

            //Rebinds with skeleton whose uuid is data.skeleton later.
            if(data.skeleton !== undefined)
            {
                object.skeletonUUID = data.skeleton;
            }

            if(data.bindMode !== undefined)
            {
                object.bindMode = data.bindMode;
            }

            if(data.bindMatrix !== undefined)
            {
                object.bindMatrix.fromArray(data.bindMatrix);
            }

            object.updateMatrixWorld(true);

            if(tmpBones !== undefined)
            {
                geometry.bones = tmpBones;
            }

            break;
        case "Sky":
            object = new Sky(data.autoUpdate, data.dayTime, data.sunDistance, data.time,true);


            if(data.colorTop !== undefined)
            {
                object.colorTop = [];
                for(var i = 0; i < data.colorTop.length; i++)
                {
                    object.colorTop.push(new TONG.Color(data.colorTop[i]));
                }
            }
            if(data.colorBottom !== undefined)
            {
                object.colorBottom = [];
                for(var i = 0; i < data.colorBottom.length; i++)
                {
                    object.colorBottom.push(new TONG.Color(data.colorBottom[i]));
                }
            }
            if(data.sunColor !== undefined)
            {
                object.sunColor = data.sunColor;
            }
            if(data.moonColor !== undefined)
            {
                object.moonColor = data.moonColor;
            }
            if(data.intensity !== undefined)
            {
                object.intensity = data.intensity;
            }
            break;
        case "LensFlare":
            object = new LensFlare();

            if(data.lensFlares !== undefined)
            {
                data.elements = data.lensFlares;
            }

            for(var i = 0; i < data.elements.length; i++)
            {
                object.addFlare(getTexture(data.elements[i].texture), data.elements[i].size, data.elements[i].distance, new TONG.Color(data.elements[i].color));
            }

            break;
        case 'Mesh':

            var geometry = getGeometry( data.geometry );
            var material = getMaterial( data.material );

            if ( geometry.bones && geometry.bones.length > 0 ) {

                object = new TONG.SkinnedMesh( geometry, material );

            } else {

                object = new TONG.Mesh( geometry, material );

            }

            break;

        case 'LOD':

            object = new TONG.LOD();

            break;

        case 'Line':

            object = new TONG.Line( getGeometry( data.geometry ), getMaterial( data.material ), data.mode );

            break;

        case 'LineLoop':

            object = new TONG.LineLoop( getGeometry( data.geometry ), getMaterial( data.material ) );

            break;

        case 'LineSegments':

            object = new TONG.LineSegments( getGeometry( data.geometry ), getMaterial( data.material ) );

            break;

        case 'PointCloud':
        case 'Points':

            object = new TONG.Points( getGeometry( data.geometry ), getMaterial( data.material ) );

            break;

        case 'Sprite':

            object = new TONG.Sprite( getMaterial( data.material ) );

            break;

        case 'Group':

            object = new TONG.Group();

            break;

        default:

            object = new TONG.Object3D();

    }

    object.uuid = data.uuid;

    if ( data.name !== undefined ) object.name = data.name;

    if ( data.matrix !== undefined ) {

        object.matrix.fromArray( data.matrix );

        if ( data.matrixAutoUpdate !== undefined ) object.matrixAutoUpdate = data.matrixAutoUpdate;
        if ( object.matrixAutoUpdate ) object.matrix.decompose( object.position, object.quaternion, object.scale );

    } else {

        if ( data.position !== undefined ) object.position.fromArray( data.position );
        if ( data.rotation !== undefined ) object.rotation.fromArray( data.rotation );
        if ( data.quaternion !== undefined ) object.quaternion.fromArray( data.quaternion );
        if ( data.scale !== undefined ) object.scale.fromArray( data.scale );

    }

    if ( data.castShadow !== undefined ) object.castShadow = data.castShadow;
    if ( data.receiveShadow !== undefined ) object.receiveShadow = data.receiveShadow;

    if ( data.shadow ) {

        if ( data.shadow.bias !== undefined ) object.shadow.bias = data.shadow.bias;
        if ( data.shadow.radius !== undefined ) object.shadow.radius = data.shadow.radius;
        if ( data.shadow.mapSize !== undefined ) object.shadow.mapSize.fromArray( data.shadow.mapSize );
        if ( data.shadow.camera !== undefined ) object.shadow.camera = this.parseBackupObject( data.shadow.camera );

    }

    if ( data.visible !== undefined ) object.visible = data.visible;
    if ( data.frustumCulled !== undefined ) object.frustumCulled = data.frustumCulled;
    if ( data.renderOrder !== undefined ) object.renderOrder = data.renderOrder;
    if ( data.userData !== undefined ) object.userData = data.userData;
    if ( data.layers !== undefined ) object.layers.mask = data.layers;

    function applySky(child) {
        if(child instanceof TONG.HemisphereLight) {
            object.hemisphere = child;
            object.hemisphere.locked = true;
            object.hemisphere.matrixAutoUpdate = false;
        }else if(child instanceof TONG.DirectionalLight) {
            object.sun = child;
            object.sun.castShadow = true;
            object.sun.locked = true;
        }else if(child instanceof TONG.Mesh) {
            object.sky = child;
            var uniforms=object.sky.material.uniforms;
            uniforms.topColor.value=new TONG.Color(
                uniforms.topColor.value.r,
                uniforms.topColor.value.g,
                uniforms.topColor.value.b);
            uniforms.bottomColor.value=new TONG.Color(
                uniforms.bottomColor.value.r,
                uniforms.bottomColor.value.g,
                uniforms.bottomColor.value.b);
            object.sky.locked = true;
            object.sky.matrixAutoUpdate = false;

        }
        if(object.children.length==3){
            if(data.sun.castShadow !== undefined)
            {
                object.sun.castShadow = data.sun.castShadow;
            }
            object.initialize();

        }
    }


    if ( data.children !== undefined ) {

        var children = data.children;

        for ( var i = 0; i < children.length; i ++ ) {
            var childObject= this.parseBackupObject( children[ i ], geometries, materials );
            if(object.type=="Sky"){
                applySky(childObject);
            }
            object.add(childObject);

        }

    }

    if ( data.type === 'LOD' ) {

        var levels = data.levels;

        for ( var l = 0; l < levels.length; l ++ ) {

            var level = levels[ l ];
            var child = object.getObjectByProperty( 'uuid', level.object );

            if ( child !== undefined ) {

                object.addLevel( child, level.distance );

            }

        }

    }

    return object;

}

ObjectLoader.prototype.parseAnimations= function ( json ) {

    var animations = {};

    for ( var i = 0; i < json.length; i ++ ){

        var data = json[ i ];

        var clip = TONG.AnimationClip.parse( data );

        if ( data.uuid !== undefined ) clip.uuid = data.uuid;

        if(data.resource_type=='AnimationAsset'){
            var animData=new TONG.AnimationAsset();
            animData.uuid=clip.uuid;
            animData.filename=data.filename;
            animData.fullpath=data.fullpath;
            animData.setData(clip);
            animData.register();
        }

        animations[clip.uuid]=clip;
        console.log(animations);
    }
    return animations;
}

ObjectLoader.prototype.parse=function ( json, onLoad ) {

    var shapes = this.parseShape( json.shapes );
    var geometries = this.parseGeometries( json.geometries, shapes );

    var images = this.parseImages( json.images, function () {

        if ( onLoad !== undefined ) onLoad( object );

    } );

    this.textures = this.parseTextures( json.textures, images );
    var materials = this.parseMaterials( json.materials, this.textures );
    var object = this.parseObject( json.object, geometries, materials,this.textures);

    if ( json.animations ) {

        object.animations = this.parseAnimations( json.animations );

    }

    if ( json.images === undefined || json.images.length === 0 ) {

        if ( onLoad !== undefined ) onLoad( object );

    }

    return object;

}





