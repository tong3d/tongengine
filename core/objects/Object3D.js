TONG.Object3D.prototype.clone=function(recursive){

    var object3d= new this.constructor().copy( this, recursive );
    if(this.animations){
        object3d.animations=this.animations;
    }
    return object3d;
}


TONG.Object3D.prototype.toJSON = function ( meta ) {

    // meta is a string when called from JSON.stringify
    var isRootObject = ( meta === undefined || typeof meta === 'string' );

    var output = {};

    // meta is a hash used to collect geometries, materials.
    // not providing it implies that this is the root object
    // being serialized.
    if ( isRootObject ) {

        // initialize meta obj
        meta = {
            geometries: {},
            materials: {},
            textures: {},
            images: {},
            shapes: {},
            files:{},
            scripts:{},
            packs:{},
            shaders:{},
            meshes:{},
            animations:{},
            audios:{},
            videos:{},
            rpics:{},
            fonts:{},
            skeletons:{},
            components:{}
           // fonts:{}
        };

        output.metadata = {
            version: 4.5,
            type: 'Object',
            generator: 'Object3D.toJSON'
        };

    }

    // standard Object3D serialization

    var object = {};

    object.uuid = this.uuid;
    object.type = this.type;

    if ( this.name !== '' ) object.name = this.name;
    if ( this.castShadow === true ) object.castShadow = true;
    if ( this.receiveShadow === true ) object.receiveShadow = true;
    if ( this.visible === false ) object.visible = false;
    if ( this.frustumCulled === false ) object.frustumCulled = false;
    if ( this.renderOrder !== 0 ) object.renderOrder = this.renderOrder;
    if ( JSON.stringify( this.userData ) !== '{}' ) object.userData = this.userData;

    object.layers = this.layers.mask;
    object.matrix = this.matrix.toArray();

    if ( this.matrixAutoUpdate === false ) object.matrixAutoUpdate = false;

    //

    function serialize( library, element ) {

        if ( library[ element.uuid ] === undefined ) {

            library[ element.uuid ] =element.toJSON?element.toJSON( meta ):(element.serialize?element.serialize():element);

        }

        return element.uuid;

    }

    if ( (this.isMesh || this.isLine || this.isPoints) && this.geometry) {

        object.geometry = serialize( meta.geometries, this.geometry );

        var parameters = this.geometry.parameters;

        if ( parameters !== undefined && parameters.shapes !== undefined ) {

            var shapes = parameters.shapes;

            if ( Array.isArray( shapes ) ) {

                for ( var i = 0, l = shapes.length; i < l; i ++ ) {

                    var shape = shapes[ i ];

                    serialize( meta.shapes, shape );

                }

            } else {

                serialize( meta.shapes, shapes );

            }

        }

    }

    if ( this.material !== undefined ) {

        if ( Array.isArray( this.material ) ) {

            var uuids = [];

            for ( var i = 0, l = this.material.length; i < l; i ++ ) {

                uuids.push( serialize( meta.materials, this.material[ i ] ) );

            }

            object.material = uuids;

        } else {

            object.material = serialize( meta.materials, this.material );

        }

    }

    //Animations
    if(this.animations !== undefined && this.animations.length > 0)
    {
        object.animations = [];

        for(var i = 0; i < this.animations.length; i++)
        {
            var clipData= TONG.AnimationClip.toJSON(this.animations[i]);

            object.animations.push(serialize(meta.animations,clipData));
        }
    }

    if(this.components && this.components.length>0){
        var coms=[];
        for(var i =0 ;i<this.components.length;i++)
        {
            var component =this.components[i];
            if(this.isRegisterComponent(component)){
                continue;
            }
            coms.push(serialize(meta.components,component));
            //object.addComponent(object.registerComponents[i]);

        }
        object.components=coms;
    }


    //

    if ( this.children.length > 0 ){

        object.children = [];

        for ( var i = 0; i < this.children.length; i ++ ) {

            object.children.push( this.children[ i ].toJSON( meta ).object );

        }

    }

    if ( isRootObject ){
        TONG.RM.serializeAllResource(meta,output);
       // if (fonts.length>0) output.fonts=fonts;
    }
    output.object = object;

    return output;

}