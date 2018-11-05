/**
 * Created by TongWorld on 2017/5/10.
 */
var Entity=function(root){

    TONG.Component.call(this);
    this.title=GetLanguage("Transform");
    this.icon="css/pic/inspector/3d.png";
    this.helpUrl="http://showdoc.tong3d.com";
    /*this.onInspectorGUI=function(editor, inspector){
        var enableOptions={};
        var enabledWidget=inspector.addCheckbox("Enable",true,enableOptions);//,true,{"callback":update}
        var nameOptions={};
        var nameWidget= inspector.addString("Name","",nameOptions);//,"",{"callback":function(){editor.execute( new SetValueCommand( editor.selected, 'name', nameWidget.getValue()));}}
        var posOptions={};EntityTransformMode
        var posWidget= inspector.addVector3("Position",[0,0,0],posOptions);//,[0,0,0],{"callback":update});
        var rotOptions={};
        var rotationWidget= inspector.addVector3("Rotation",[0,0,0],rotOptions);//,[0,0,0],{"callback":update});
        var scaleOptions={};
        var scaleWidget=inspector.addVector3("Scale",[1,1,1],scaleOptions);//,[0,0,0],{"callback":update});

        function update() {
            var object = editor.selected;

            if ( object !== null ) {
                var newPosition = new TONG.Vector3( inspector.values["Position"][0], inspector.values["Position"][1], inspector.values["Position"][2] );
                if ( object.position.distanceTo( newPosition ) >= 0.01 ) {
                    EntityTransformMode="translate";
                    editor.execute( new SetPositionCommand( object, newPosition ));

                }
                var newRotation = new TONG.Euler( inspector.values["Rotation"][0] * TONG.Math.DEG2RAD, inspector.values["Rotation"][1] * TONG.Math.DEG2RAD, inspector.values["Rotation"][2] * TONG.Math.DEG2RAD );
                if ( object.rotation.toVector3().distanceTo( newRotation.toVector3() ) >= 0.01 ) {
                    EntityTransformMode="rotation";
                    editor.execute( new SetRotationCommand( object, newRotation ) );

                }
                var newScale = new TONG.Vector3( inspector.values["Scale"][0], inspector.values["Scale"][1], inspector.values["Scale"][2]);
                if ( object.scale.distanceTo( newScale ) >= 0.01 ){
                    EntityTransformMode="scale";
                    editor.execute( new SetScaleCommand( object, newScale ) );

                }

                if ( object.visible !== enabledWidget.data ){

                    editor.execute( new SetValueCommand( object, 'visible', enabledWidget.data ) );

                }

                if(object.name!=nameWidget.getValue()){
                    editor.execute( new SetValueCommand( object, 'name', nameWidget.getValue()));
                }

            }

        }
         this.updateUI=function() {
            var object = editor.selected;
            nameWidget.setValue(object.name);
            enabledWidget.setValue(object.visible);
            posWidget.setValue([object.position.x,object.position.y,object.position.z],true);
            rotationWidget.setValue([object.rotation.x * TONG.Math.RAD2DEG,object.rotation.y * TONG.Math.RAD2DEG,object.rotation.z * TONG.Math.RAD2DEG],true);
            scaleWidget.setValue([object.scale.x,object.scale.y,object.scale.z],true);

        }
        this.init=function(){
            this.updateUI();
            scaleOptions["callback"]=rotOptions["callback"]=posOptions["callback"]=nameOptions["callback"]=enableOptions["callback"]= update;
        }
        TONG.Component.prototype.onInspectorGUI.call(this,editor,inspector);

    }*/
    var that=this;
    this.isSelectedObject=true;
    this.name=new TONG.Value({value:root.name,alias:GetLanguage("name"),callback:function(val){
            TONG.Event.trigger( EditorModule.target.scene, "node_name_changed",that.root);
    }});
    this.visible=new TONG.Value({value:root.visible,alias:GetLanguage("visible")});
    this.position=new TONG.Value({value:root.position,alias:GetLanguage("position")});

    this.rotation=new TONG.Value({value:root.rotation,alias:GetLanguage("rotation")});

    this.scale=new TONG.Value({value:root.scale,alias:GetLanguage("scale")});


}

Entity.prototype=Object.create(TONG.Component.prototype);
Entity.prototype.constructor=Entity;
TONG.Object3D.prototype.registerComponents=[Entity];

var SceneEntity=function(root){
    TONG.Component.call(this);
    this.title=GetLanguage("Scene");
    this.icon="css/pic/inspector/scene.png";
    this.helpUrl="http://showdoc.tong3d.com";
    var that=this;

    var sky=null;



    this.isSelectedObject=true;
    this.name=new TONG.Value({value:root.name,alias:GetLanguage("name"),callback:function(val){
            TONG.Event.trigger( EditorModule.target.scene, "node_name_changed",that.root);
        }});
    this.OnInspectorAwake=function(){
        sky= this._root['Sky'];

       this.distance=new TONG.Value({must:true,min:800,value:sky.distance,alias:GetLanguage('sunDistance'),callback:function(val){
               sky.distance=val;
               sky.updateSky();
       }});
        this.inclination=new TONG.Value({must:true,min:-1,max:1,value:sky.inclination,alias:GetLanguage('inclination'),callback:function(val){
                sky.inclination=val;
                sky.updateSky();
            }});
        this.azimuth=new TONG.Value({must:true,
            min:0,
            max:1,
            value:sky.azimuth,
            alias:GetLanguage('azimuth'),callback:function(val){
                sky.azimuth=val;
                sky.updateSky();
            }});
        this.turbidity=new TONG.Value({must:true,
            min:1,
            max:20,
            value:sky.turbidity,
            alias:GetLanguage('turbidity'),callback:function(val){
                sky.turbidity=val;
                sky.updateSky();
            }});
        this.rayleigh=new TONG.Value({must:true,
            min:0,
            max:4,
            value:sky.rayleigh,
            alias:GetLanguage('rayleigh'),callback:function(val){
                sky.rayleigh=val;
                sky.updateSky();
            }});
        this.luminance=new TONG.Value({must:true,
            min:0,
            max:1.2,
            value:sky.luminance,
            alias:GetLanguage('luminance'),callback:function(val){
                sky.luminance=val;
                sky.updateSky();
            }});

        this.mieCoefficient=new TONG.Slider(sky.mieCoefficient,{must:true,
            min:0,
            max:0.1,
            step:0.001,
            alias:GetLanguage('mieCoefficient'),callback:function(val){
                sky.mieCoefficient=val;
                sky.updateSky();
            }});
        this.mieDirectionalG=new TONG.Slider(sky.mieDirectionalG,{must:true,
            min:0,
            max:1,
            step:0.001,
            alias:GetLanguage('mieDirectionalG'),callback:function(val){
                sky.mieDirectionalG=val;
                sky.updateSky();
            }});
        this.castShadow=new TONG.Value({must:true,
            value:sky.sun.castShadow,
            alias:GetLanguage('castShadow'),callback:function(val){
                sky.sun.castShadow=val;
                //sky.updateSky();
            }});
        this.intensity=new TONG.Value({must:true,min:0,max:1,value:sky.sun.intensity,alias:GetLanguage('intensity'),
            callback:function(val){
                sky.sun.intensity=val;
            }})
    }
    /*this.sunColor=new TONG.Value();*/

}
SceneEntity.prototype=Object.create(TONG.Component.prototype);
SceneEntity.prototype.constructor=SceneEntity;
TONG.Scene.prototype.registerComponents=[SceneEntity];