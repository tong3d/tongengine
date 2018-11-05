/**
 * @author zhengxiangkui / http://tong3d.com/
 */

TONG.NoneMaterial= function ( parameters ) {

    TONG.Material.call( this );

    this.type = 'NoneMaterial';
    this.isNoneMaterial=true;
    this.defines = {};
    this.uniforms = {};

    this.vertexShader = 'void main() {\n\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}';
    this.fragmentShader = 'void main() {\n\tgl_FragColor = vec4( 1.0, 0.0, 1.0, 1.0 );\n}';

    this.linewidth = 1;

    this.wireframe = false;
    this.wireframeLinewidth = 1;

    this.fog = false; // set to use scene fog
    this.lights = false; // set to use scene lights
    this.clipping = false; // set to use user-defined clipping planes

    this.skinning = false; // set to use skinning attribute streams
    this.morphTargets = false; // set to use morph targets
    this.morphNormals = false; // set to use morph normals

    this.extensions = {
        derivatives: false, // set to use derivatives
        fragDepth: false, // set to use fragment depth values
        drawBuffers: false, // set to use draw buffers
        shaderTextureLOD: false // set to use shader texture LOD
    };

    // When rendered geometry doesn't include these attributes but the material does,
    // use these default values in WebGL. This avoids errors when buffer data is missing.
    this.defaultAttributeValues = {
        'color': [ 1, 1, 1 ],
        'uv': [ 0, 0 ],
        'uv2': [ 0, 0 ]
    };
    this.toJSON = function () {
        var data={};
        data.uuid=this.uuid;
        data.type="NoneMaterial";
        return data;

    };
    this.index0AttributeName = undefined;

    if ( parameters !== undefined ) {
        if ( parameters.attributes !== undefined ) {
            console.error( 'THREE.ShaderMaterial: attributes should now be defined in THREE.BufferGeometry instead.' );
        }
        this.setValues( parameters );
    }

}

TONG.NoneMaterial.prototype = Object.create( TONG.Material.prototype );
TONG.NoneMaterial.prototype.constructor = TONG.NoneMaterial;





var Material = function () {
	TONG.Component.call(this);
	this.title=GetLanguage("MaterialEditor");
	this.icon="";
	this.helpIcon="";
	this.settingsIcon="";

    this.collapsed=true;
    this.materials=null;

    var that=this;
    this.OnInspectorAwake=function () {

       /* if(!(this.selected.material instanceof Array)){
            this.target = this.selected.material=[this.selected.material];
        }else {*/
        that.target = that.selected.material;
        //}
        var dataArr=[];
        if(that.target instanceof Array) {
            for (var i = 0; i < that.target.length; i++) {
               var resourceTarget = TONG.RM.getResource(that.target[i].name);
               /*var name=that.target[i].type;
               if(resourceTarget){name=that.target[i].name}
               dataArr[i] = name;*/
               if(resourceTarget){
                   that.target[i] = that.selected.material[i]=resourceTarget;
               }

               dataArr[i]=that.target[i];

            }
            if(that.target.length==1){that.target = that.selected.material=that.selected.material[0]}
        }else{
           /* var resourceTarget = TONG.RM.getResource(that.target.name);
            var name=that.target.type;
            if(resourceTarget){name=that.target.name}
            dataArr[0]=name;*/
            /*var name=that.target[i].type;
               if(resourceTarget){name=that.target[i].name}
               dataArr[i] = name;*/
            var resourceTarget = TONG.RM.getResource(that.target.name);
            if(resourceTarget){
                that.target = that.selected.material=resourceTarget;
            }

            dataArr[0]=that.target;


        }
        //console.log(that.target );

        that.materials=new TONG.Value({alias:GetLanguage('materials'), must:true,value:dataArr,target:that.target,disabled:true,default:dataArr[0],data_type:TONG.Resource.TYPE.Material});
    }
};

Material.prototype=Object.create(TONG.Component.prototype);
Material.prototype.constructor=Material;


function ReCompileShader(shader_target,editor_target,is_extend){

    var shaderTarget=shader_target;
    var defines={};
    var attributes={};
    var extensions={};
    var uniforms={};
    var vertexShader= null;
    var fragmentShader= null;
    if(editor_target.target.shader!=undefined && shaderTarget.filename==editor_target.target.shader && !is_extend){

        defines = editor_target.target.defines;
        attributes = editor_target.target.defaultAttributeValues;
        extensions = editor_target.target.extensions;
        uniforms = editor_target.target.uniforms;
        vertexShader=editor_target.target.vertexShader;
        fragmentShader=editor_target.target.fragmentShader;
    }else {

        shaderTarget.processCode();
        defines = shaderTarget._global_defines;
        attributes = shaderTarget._global_attributes;
        extensions = shaderTarget._global_extensions;
        uniforms = shaderTarget._global_uniforms;

    }
   /* editor_target.target.needsUpdate=true;
    editor_target.target.vertexShader="void main() {\n gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n\n}\n";
    editor_target.target.fragmentShader="void main() {\n    gl_FragColor = vec4(1.0,0.0,0.0,1.0 );\n\n}\n";*/
    var uniformsResult={};
    if(!editor_target["uniform"]){
        editor_target.uniform = new UniformClass();
        editor_target.uniform.isNested=true;
    }else{
        if(editor_target.uniform.inspector){
            editor_target["uniformWidget"].removeChild(editor_target.uniform.inspector.root);
            editor_target.uniform.inspector = null;
            editor_target.uniform.isInit = false;
        }
        /* editor_target.target.uniforms=uniformsResult={};*/
    }

    //uniforms clear widgets
    for(var key in editor_target.uniform){
        if((typeof (new TONG.Component()[key]))=="undefined"){
            if(editor_target.uniform[key] instanceof HTMLElement){
                editor_target.uniform[key] = undefined;
            }
            else if(!is_extend) {
                editor_target.uniform[key] = undefined;
            }else if(is_extend && uniforms[key]==undefined ){
                editor_target.uniform[key] = undefined;
            }
        }
    }

    for(var key in uniforms){
        function applyUniformsToMat(key){
            if(editor_target.uniform[key]==undefined){
                if(uniforms[key].value instanceof TONG.Enum){
                    var value=uniforms[key].value.getValue();
                    if(uniforms[key].value.isCompile){
                        value=eval(value);
                    }
                    uniforms[key].value.callback=function(v){
                        var value=v;
                        if(uniforms[key].value.isCompile){
                            value=eval(value);
                        }
                        editor_target.target.uniforms[key]["value"]=value;
                        EditorModule.target.changeResourceValue(editor_target.target,"uniforms."+key+'.value',value);
                    }
                    uniformsResult[key]={};
                    uniformsResult[key]["value"]=value;
                    editor_target.uniform[key] = uniforms[key].value;
                }else if(uniforms[key].value instanceof TONG.Value){
                    var value=uniforms[key].value.getValue();
                    uniforms[key].value.callback=function(v){
                        var value=v;
                        editor_target.target.uniforms[key]["value"]=value;
                        EditorModule.target.changeResourceValue(editor_target.target,"uniforms."+key+'.value',value);
                    }
                    uniformsResult[key]={};
                    uniformsResult[key]["value"]=value;
                    editor_target.uniform[key] = uniforms[key].value;
                }else{
                    //console.log(uniforms[key]["value"]);
                    var value=new TONG.Value({value:uniforms[key]["value"],callback:function(v){
                            var value=v;
                           // console.log(editor_target.target.needsUpdate=true);
                           // console.log(editor_target.target.uniforms[key].value);
                            editor_target.target.uniforms[key]["value"]=value;
                            EditorModule.target.changeResourceValue(editor_target.target,"uniforms."+key+'.value',value);
                        }});

                    uniformsResult[key]={};
                    uniformsResult[key]["value"]=uniforms[key]["value"];

                    editor_target.uniform[key] = value;
                }
            }else{
                var vRes=editor_target.uniform[key].getValue();
                if(editor_target.uniform[key] instanceof TONG.Enum && uniforms[key].value.isCompile){
                  vRes=eval(editor_target.uniform[key].getValue());
                }
                uniformsResult[key]={};
                uniformsResult[key]["value"]=vRes;
            }
        }
        applyUniformsToMat(key);
    }

    if(!isEmptyObject(uniforms)){

        editor_target.applyInit("uniform",editor_target.uniform);
    }

    if(!vertexShader && !fragmentShader) {
        var runCount = 0;
        for (var key in shaderTarget._code_parts) {
            if (shaderTarget._code_parts[key].vs) {
                runCount++;
                vertexShader = shaderTarget._code_parts[key].vs.code;
                if (runCount == 2) {
                    break;
                }
            }
            if (shaderTarget._code_parts[key].fs) {
                runCount++;
                fragmentShader = shaderTarget._code_parts[key].fs.code;
                if (runCount == 2) {
                    break;
                }
            }
        }
    }else{
        return;
    }


    if(!vertexShader || !fragmentShader){
        return;
    }

    if( removeSpace(editor_target.target.vertexShader)==removeSpace(vertexShader) && removeSpace(editor_target.target.fragmentShader)==removeSpace(fragmentShader)){
        return;
    }

    //console.log(editor_target);
    editor_target.target.needsUpdate=true;
    editor_target.target.defaultAttributeValues=attributes;
    editor_target.target.extensions=extensions;
    editor_target.target.defines=defines;

    editor_target.target.uniforms=uniformsResult;
    editor_target.target.vertexShader=vertexShader;
    editor_target.target.fragmentShader=fragmentShader;


    EditorModule.target.changeResourceValue(editor_target.target,{defaultAttributeValues:editor_target.target.defaultAttributeValues,extensions:editor_target.target.extensions,
        defines:editor_target.target.defines,uniforms:editor_target.target.uniforms,vertexShader:editor_target.target.vertexShader,fragmentShader:editor_target.target.fragmentShader});
    //console.log('compile result');
    //console.log(editor_target.target);

    //EditorModule.target.changeResourceValue(editor_target.target,"uniforms."+key+'.value',value);
}

var MaterialClass=function(target){
    TONG.Component.call(this);
    this.title=GetLanguage("Material");
    this.icon="imgs/components/mat_.png";
    this.helpIcon="";
    this.settingsIcon="";

    this.target=target;
    var that=this;


    var name=target.name?TONG.RM.getExtension(target.name)!="mat"?target.name+".mat":target.name:"";
    //console.log(name);
    this.filename=new TONG.Value({alias:GetLanguage('Filename'),value:name,callback:function(v){
           // console.log(v);
            var resourceTarget=TONG.RM.getResource(name);
            if(!resourceTarget){
                if (target.name) {
                    target.name = v;
                }
                return;
            }
            var extension = TONG.RM.getExtension(v);
            if (extension != "mat" && target instanceof TONG.Material){
                v += ".mat";

            }
            that["filenameWidget"].setValue(v,true);
            that["filename"].setValue(v,true);
            if(v==name){
                return;
            }

            if (target.name) {
                target.name = v;
            }
            TONG.MaterialClasses.unRegisterMaterialClass(that.target);
            /*if(target.fullpath){
                target.fullpath=v;
            }*/
            var fullpath = that.target.fullpath || that.target.filename;
            var folder = TONG.RM.getFolder(fullpath);
            var filename = TONG.RM.getFilename(fullpath);
            var new_filename = TONG.RM.cleanFullpath(folder + "/" + v);

            TONG.RM.renameResource(filename,new_filename);
            name=new_filename;
            TONG.MaterialClasses.registerMaterialClass(that.target);
            TONG.RM.resourceModified( that.target );
            EditorModule.target.changeResourceValue(target,{fullpath:new_filename,filename:new_filename,name:new_filename});
            DriveModule.refreshContent();
            TONG.Components.onRenameComponent(filename,new_filename,resourceTarget);
    }});
    //this.type=new TONG.Enum();
    // this.type=
    this.shader=null;
    this.uniform=null;


    this.OnInspectorAwake=function(){

        if(this.target instanceof TONG.ShaderMaterial){
            var shaderList=TONG.RM.getResourceByType(TONG.Resource.TYPE.ShaderCode);
            var nameList=["default"];
            for(var i=0;i<shaderList.length;i++){
                nameList[i+1]=shaderList[i].filename;
            }
            console.log(nameList);
            this.shader = new TONG.Enum(nameList,{alias:GetLanguage('shader'),must:true,callback:function(v){
                console.log(v);
                if(v!="default"){
                    ReCompileShader(TONG.RM.getResource(v),that);

                }else{

                    that["shaderWidget"].setOptionValues(that.shader.getNames());
                    that["shaderWidget"].setValue("default");
                    that["uniformWidget"].removeChild(that.uniform.inspector.root);

                    that.uniform.inspector=null;
                    that.uniform.isInit=false;

                    that.target.needsUpdate=true;
                    that.target.defaultAttributeValues={};
                    that.target.extensions={};
                    that.target.defines={};
                    that.target.uniforms={};
                    that.target.vertexShader="void main() {\n gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n\n}\n";
                    that.target.fragmentShader="void main() {\n    gl_FragColor = vec4(1.0,0.0,0.0,1.0 );\n\n}\n";
                }
                EditorModule.target.changeResourceValue(that,{shader:that.shader.getValue()=="default"?null:that.shader.getValue(),defaultAttributeValues:that.target.defaultAttributeValues,extensions:that.target.extensions,
                    defines:that.target.defines,uniforms:that.target.uniforms,vertexShader:that.target.vertexShader,fragmentShader:that.target.fragmentShader})
                }});



        }
    }

    this.OnInspectorStart=function(){
        if(this.target.shader!=undefined && this.target.shader!="default"){
            this.shader.setValue(this.target.shader);
        }
    }

    // color
    this.color=new TONG.Value({alias:GetLanguage('color'),value:new TONG.Color(1,1,1)});
    // roughness

    this.roughness=new TONG.Value({alias:GetLanguage('roughness'),value:0.5});
    // metalness
    this.metalness=new TONG.Value({alias:GetLanguage('metalness'),value:0.5});

    // emissive

    this.emissive=new TONG.Value({alias:GetLanguage('emissive'),value:new TONG.Color(0,0,0)});
    // specular
    this.specular=new TONG.Value({alias:GetLanguage('specular'),value:new TONG.Color(1/16,1/16,1/16)});

    // shininess
    this.shininess=new TONG.Value({alias:GetLanguage('shininess'),value:30});

    // clearCoat
    this.clearCoat=new TONG.Value({alias:GetLanguage('clearCoat'),value:1});

    // clearCoatRoughness
    this.clearCoatRoughness=new TONG.Value({alias:GetLanguage('clearCoatRoughness'),value:1});

    // vertex colors
    this.vertexColors=new TONG.Enum(["TONG.NoColors", "TONG.VertexColors", "TONG.FaceColors"],{alias:GetLanguage('vertexColors'),isCompile:true});
    // skinning


    this.bumpScale=new TONG.Value({alias:GetLanguage('bumpScale'),value:1});

    this.normalScale=new TONG.Value({alias:GetLanguage('normalScale'),value:1});

    this.displacementScale=new TONG.Value({alias:GetLanguage('displacementScale'),value:1});
    this.displacementBias=new TONG.Value({alias:GetLanguage('displacementBias'),value:0});

    //this.roughness=new TONG.Value({alias:GetLanguage('roughness'),value:1});

    //this.metalness=new TONG.Value({alias:GetLanguage('metalness'),value:1});


    this.envMapIntensity=new TONG.Value({alias:GetLanguage('envMapIntensity'),value:1});

    this.lightMapIntensity=new TONG.Value({alias:GetLanguage('lightMapIntensity'),value:1});

    this.aoMapIntensity=new TONG.Value({alias:GetLanguage('aoMapIntensity'),value:1});

    // side
    this.side=new TONG.Enum(["TONG.FrontSide","TONG.BackSide","TONG.DoubleSide"],{alias:GetLanguage('side'),isCompile:true});
    // shading
    this.flatShading=new TONG.Value({alias:GetLanguage('flatShading'),value:false});

    // blending
    this.blending=new TONG.Enum(["TONG.NoBlending","TONG.NormalBlending","TONG.AdditiveBlending","TONG.SubtractiveBlending","TONG.MultiplyBlending","TONG.CustomBlending"],{alias:GetLanguage('blending'),isCompile:true});
    // transparent
    this.transparent=new TONG.Value({alias:GetLanguage('transparent'),value:false});
    // opacity
    this.opacity=new TONG.Value({alias:GetLanguage('opacity'),value:1});

    // alpha test
    this.alphatest=new TONG.Value({alias:GetLanguage('alphatest'),value:0});
    // wireframe

    this.wireframe=new TONG.Value({alias:GetLanguage('wireframe'),value:false});
    this.wireframeLinewidth=new TONG.Value({alias:GetLanguage('wireframeLinewidth'),value:1});
    // map
    this.map=new TONG.Value({alias:GetLanguage('map'),value:new TONG.Texture()});
    // alpha map
    this.alphaMap=new TONG.Value({alias:GetLanguage('alphaMap'),value:new TONG.Texture()});
    // normal map
    this.normalMap=new TONG.Value({alias:GetLanguage('normalMap'),value:new TONG.Texture()});
    // bump map
    this.bumpMap=new TONG.Value({alias:GetLanguage('bumpMap'),value:new TONG.Texture()});
    // displacement map
    this.displacementMap=new TONG.Value({alias:GetLanguage('displacementMap'),value:new TONG.Texture()});
    // roughness map
    this.roughnessMap=new TONG.Value({alias:GetLanguage('roughnessMap'),value:new TONG.Texture()});
    // metalness map
    this.metalnessMap=new TONG.Value({alias:GetLanguage('metalnessMap'),value:new TONG.Texture()});
    // specular map
    this.specularMap=new TONG.Value({alias:GetLanguage('specularMap'),value:new TONG.Texture()});
    // env map
    this.envMap=new TONG.Value({alias:GetLanguage('envMap'),value:new TONG.Texture()});
    // light map
    this.lightMap=new TONG.Value({alias:GetLanguage('lightMap'),value:new TONG.Texture()});
    // ambient occlusion map
    this.aoMap=new TONG.Value({alias:GetLanguage('aoMap'),value:new TONG.Texture()});
    // emissive map
    this.emissiveMap=new TONG.Value({alias:GetLanguage('emissiveMap'),value:new TONG.Texture()});

}
MaterialClass.prototype=Object.create(TONG.Component.prototype);
MaterialClass.prototype.constructor=MaterialClass;

var UniformClass=function(){
    TONG.Component.call(this);
    this.title="Uniforms";
    this.icon="imgs/components/uniform.png";
    this.helpIcon="";
    this.settingsIcon="";
}
UniformClass.prototype=Object.create(TONG.Component.prototype);
UniformClass.prototype.constructor=UniformClass;


TONG.MaterialClasses={};

/**
 * Register a Material class so it is listed when searching for new materials to attach
 *
 * @method registerMaterialClass
 * @param {ComponentClass} comp component class to register
 */
TONG.MaterialClasses.registerMaterialClass=function( material_class )
{   var mat =null;
    var class_name=null;
    material_class.is_material=true;
    if(material_class instanceof TONG.Material) {
        mat=material_class;
        class_name=mat.name;

        //register
        TONG.MaterialClasses[ class_name ] = mat;
    }else {
        material_class.prototype.editorTarget=null;
        material_class.prototype.callEditorTarget=function(){
            if(this.editorTarget){return this.editorTarget;}
            this.editorTarget=new MaterialClass(this);
            return this.editorTarget;
        }
        mat=new material_class;
        class_name = getMaterialName(mat);

        //register
        TONG.MaterialClasses[ class_name ] = material_class;

    }



   // this.Classes[ class_name ] = material_class;

    //add extra material methods
    //extendClass( material_class, TONG.Material );
    TONG.RM.registerResourceClass(material_class);


    //event
    TONG.Event.trigger( TONG.MaterialClasses, "materialclass_registered", material_class );

}

TONG.MaterialClasses.unRegisterMaterialClass=function( material_class )
{   var mat =null;
    var class_name=null;
    if(material_class instanceof TONG.Material) {
        mat=material_class;
        class_name=mat.name;
        //register
       delete TONG.MaterialClasses[ class_name ];
    }else {
        mat=new material_class;
        class_name = getMaterialName(mat);
        //register
       delete TONG.MaterialClasses[ class_name ];

    }



    // this.Classes[ class_name ] = material_class;

    //add extra material methods
    //extendClass( material_class, TONG.Material );
    TONG.RM.registerResourceClass(material_class);


    //event
    TONG.Event.trigger( TONG.MaterialClasses, "materialclass_registered", material_class );

}


/*extendClass(TONG.LineBasicMaterial,TONG.Component);
extendClass(TONG.LineDashedMaterial,TONG.Component);
extendClass(TONG.MeshBasicMaterial,TONG.Component);
extendClass(TONG.MeshDepthMaterial,TONG.Component);
extendClass(TONG.MeshLambertMaterial,TONG.Component);
extendClass(TONG.MeshNormalMaterial,TONG.Component);
extendClass(TONG.MeshPhongMaterial,TONG.Component);
extendClass(TONG.MeshPhysicalMaterial,TONG.Component);
extendClass(TONG.MeshStandardMaterial,TONG.Component);
extendClass(TONG.MeshToonMaterial,TONG.Component);
extendClass(TONG.PointsMaterial,TONG.Component);
extendClass(TONG.RawShaderMaterial,TONG.Component);
extendClass(TONG.ShadowMaterial,TONG.Component);
extendClass(TONG.SpriteMaterial,TONG.Component);*/

TONG.Material.prototype.serialize=function(){
        /*var imgObj={"images":{},"textures":{}};*/
        var data=this.toJSON();
        data.filename=this.filename;
        data.fullpath=this.fullpath;
        if(this instanceof TONG.ShaderMaterial && this.shader!=undefined){
            data.shader=this.shader;
        }
        data.resource_type=TONG.Resource.TYPE.Material;
        return data;

}

TONG.Material.prototype.clone=function(){
    var matR=new this.constructor().copy( this );
    //var fullpath = TONG.RM.cleanFullpath( folder + "/" + resName );

    var resName= FileNameHelper.GetNextFileName(matR.name);

    matR.fullpath=matR.name=matR.filename = resName;

    /*matR.callEditorTarget=function(){
         if(matR.editorTarget){return matR.editorTarget;}
        matR.editorTarget=new MaterialClass(matR);
         return matR.editorTarget;
     };*/
    matR.resource_type = TONG.Resource.TYPE.Material;
    matR.is_material = true;
    return matR;
}


TONG.MaterialClasses.registerMaterialClass(TONG.ShaderMaterial);
TONG.MaterialClasses.registerMaterialClass(TONG.LineBasicMaterial);
TONG.MaterialClasses.registerMaterialClass(TONG.LineDashedMaterial);
TONG.MaterialClasses.registerMaterialClass(TONG.MeshBasicMaterial);
TONG.MaterialClasses.registerMaterialClass(TONG.MeshDepthMaterial);
TONG.MaterialClasses.registerMaterialClass(TONG.MeshLambertMaterial);
TONG.MaterialClasses.registerMaterialClass(TONG.MeshNormalMaterial);
TONG.MaterialClasses.registerMaterialClass(TONG.MeshPhongMaterial);
TONG.MaterialClasses.registerMaterialClass(TONG.MeshPhysicalMaterial);
TONG.MaterialClasses.registerMaterialClass(TONG.MeshStandardMaterial);
TONG.MaterialClasses.registerMaterialClass(TONG.MeshToonMaterial);
TONG.MaterialClasses.registerMaterialClass(TONG.PointsMaterial);
/*TONG.MaterialClasses.registerMaterialClass(TONG.RawShaderMaterial);*/
TONG.MaterialClasses.registerMaterialClass(TONG.ShadowMaterial);
TONG.MaterialClasses.registerMaterialClass(TONG.SpriteMaterial);

