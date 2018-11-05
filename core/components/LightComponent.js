/**
 * Created by DaTong on 2017/5/11.
 */

var LightComponent=function(){
    TONG.Component.call(this);
    this.title=GetLanguage("Light");
    this.helpUrl="http://showdoc.tong3d.com";
    this.icon="css/pic/inspector/light.png";
    this.isSelectedObject=true;
   /* this.onInspectorGUI=function(editor, inspector) {
        var typeOptions={disabled:true};
        var typeWidget=inspector.addString("Type","DirectionalLight",typeOptions);
        var intensityOptions={};
        var intensityWidget=inspector.addNumber("Intensity",1,intensityOptions);
        var colorOptions={};
        var colorWidgets=inspector.addColor("Light Color",[1,1,1],colorOptions);
        var groundColorOptions={};
        var groundColorWidgets=inspector.addColor("Ground Color",[1,1,1],groundColorOptions);
        var distanceOptions={};
        var distanceWidgets=inspector.addNumber("Distance",1,distanceOptions);
        var angleOptions={};
        var angleWidget=inspector.addNumber("Angle",10,angleOptions);
        var penumbraOptions={};
        var penumbraWidget=inspector.addNumber("Penumbra",1,penumbraOptions);
        var decayOptions={};
        var decayWidget=inspector.addNumber("Decay",1,decayOptions);
        var castShadowOptions={};
        var castShadowWidget=inspector.addCheckbox("Shadow",true,castShadowOptions);
        var recShadowOptions={};
        var recShadowWidget=inspector.addCheckbox("Shadow",true,recShadowOptions);
        var shadowRadiusOptions={};
        var shadowRadiusWidget=inspector.addNumber("Shadow Radius",1,shadowRadiusOptions);

        function update() {

            var object = editor.selected;

            if (object !== null) {


                if (object.intensity !== undefined && Math.abs(object.intensity - intensityWidget.getValue()) >= 0.01) {

                    editor.execute(new SetValueCommand(object, 'intensity', intensityWidget.getValue()));

                }

                if (object.color !== undefined && object.color.getHexString() !== colorWidgets.getHexString()) {

                    editor.execute(new SetColorCommand(object, 'color', colorWidgets.getHex()));

                }

                if (object.groundColor !== undefined && object.groundColor.getHexString() !== groundColorWidgets.getHexString()) {

                    editor.execute(new SetColorCommand(object, 'groundColor', groundColorWidgets.getHex()));

                }

                if (object.distance !== undefined && Math.abs(object.distance - distanceWidgets.getValue()) >= 0.01) {

                    editor.execute(new SetValueCommand(object, 'distance', distanceWidgets.getValue()));

                }

                if (object.angle !== undefined && Math.abs(object.angle - angleWidget.getValue()) >= 0.01) {

                    editor.execute(new SetValueCommand(object, 'angle', angleWidget.getValue()));

                }

                if (object.penumbra !== undefined && Math.abs(object.penumbra - penumbraWidget.getValue()) >= 0.01) {

                    editor.execute(new SetValueCommand(object, 'penumbra', penumbraWidget.getValue()));

                }

                if (object.decay !== undefined && Math.abs(object.decay - decayWidget.getValue()) >= 0.01) {

                    editor.execute(new SetValueCommand(object, 'decay', decayWidget.getValue()));

                }


                if (object.castShadow !== undefined && object.castShadow !== castShadowWidget.data) {

                    editor.execute(new SetValueCommand(object, 'castShadow', castShadowWidget.data));

                }

                if (object.receiveShadow !== undefined && object.receiveShadow !== recShadowWidget.data) {

                    editor.execute(new SetValueCommand(object, 'receiveShadow', recShadowWidget.data));
                    if(object.material) {
                        object.material.needsUpdate = true;
                    }
                }

                if (object.shadow !== undefined) {

                    if (object.shadow.radius !== shadowRadiusWidget.getValue()) {

                        editor.execute(new SetValueCommand(object.shadow, 'radius', shadowRadiusWidget.getValue()));

                    }

                }

                try {

                    /!*  var userData = JSON.parse( objectUserData.getValue() );
                      if ( JSON.stringify( object.userData ) != JSON.stringify( userData ) ) {

                          editor.execute( new SetValueCommand( object, 'userData', userData ) );

                      }*!/

                } catch (exception) {

                    /!* console.warn( exception );*!/

                }

            }

        }

        this.updateRows=function(object) {

            var properties = {

                'intensity': intensityWidget,
                'color': colorWidgets,
                'groundColor': groundColorWidgets,
                'distance': distanceWidgets,
                'angle': angleWidget,
                'penumbra': penumbraWidget,
                'decay': decayWidget,
                'castShadow': castShadowWidget,
                'receiveShadow': recShadowWidget,
                'shadow': shadowRadiusWidget
            };

            for (var property in properties){

                properties[property].style.display=object[property] !== undefined ? '' : 'none';

            }
            /!*  currentBottom=Utils.SetUIVerticalInterval(container,startIntervel,intervel);*!/
        }

        var uuid = -1;

        this.updateUI=function(object) {

            // objectType.setValue(object.type);
            typeWidget.setValue(object.type);
            uuid = object.uuid;
            /!*  objectName.setValue( object.name );*!/


            if (object.intensity !== undefined) {

                //objectIntensity.setValue(object.intensity);
                intensityWidget.setValue(object.intensity,true);
            }

            if (object.color !== undefined) {

                // objectColor.setHexValue(object.color.getHexString());
                colorWidgets.setValue([object.color.r,object.color.g,object.color.b],true);
            }

            if (object.groundColor !== undefined) {

                // objectGroundColor.setHexValue(object.groundColor.getHexString());
                groundColorWidgets.setValue([object.groundColor.r,object.groundColor.g,object.groundColor.b],true);
            }

            if (object.distance !== undefined) {

                //objectDistance.setValue(object.distance);
                distanceWidgets.setValue(object.distance,true);
            }

            if (object.angle !== undefined) {

                //objectAngle.setValue(object.angle);
                angleWidget.setValue(object.angle,true);
            }

            if (object.penumbra !== undefined) {

                //objectPenumbra.setValue(object.penumbra);
                penumbraWidget.setValue(object.penumbra,true);
            }

            if (object.decay !== undefined) {

                // objectDecay.setValue(object.decay);
                decayWidget.setValue(object.decay,true);
            }

            if (object.castShadow !== undefined) {

                //objectCastShadow.setValue(object.castShadow);
                castShadowWidget.setValue(object.castShadow,true);
            }

            if (object.receiveShadow !== undefined) {

                //objectReceiveShadow.setValue(object.receiveShadow);
                recShadowWidget.setValue(object.receiveShadow,true);
            }

            if (object.shadow !== undefined){

                // objectShadowRadius.setValue(object.shadow.radius);
                shadowRadiusWidget.setValue(object.shadow.radius,true);
            }

        }
        this.init=function(){
            this.updateRows(editor.selected);
            this.updateUI(editor.selected);
            typeOptions["callback"]=intensityOptions["callback"]=colorOptions["callback"]=groundColorOptions["callback"]=distanceOptions["callback"]=angleOptions["callback"]
                =penumbraOptions["callback"]=decayOptions["callback"]=castShadowOptions["callback"]=recShadowOptions["callback"]=shadowRadiusOptions["callback"]=update;
         }
        TONG.Component.prototype.onInspectorGUI.call(this,editor,inspector);

        /!*currentBottom=Utils.SetUIVerticalInterval(container,startIntervel,intervel);*!/

    }*/
   /* var properties = {

        'intensity': intensityWidget,
        'color': colorWidgets,
        'groundColor': groundColorWidgets,
        'distance': distanceWidgets,
        'angle': angleWidget,
        'penumbra': penumbraWidget,
        'decay': decayWidget,
        'castShadow': castShadowWidget,
        'receiveShadow': recShadowWidget,
        'shadow': shadowRadiusWidget
    };*/
    this.type=new TONG.Enum(["AmbientLight","DirectionalLight","HemisphereLight","PointLight","RectAreaLight","SpotLight"],{alias:GetLanguage('type'),callback:function typeChange(value) {
       if(this.selected.type!=value){

           var lightTarget=new TONG[value];
            lightTarget.name=this.selected.name;
            lightTarget.uuid=this.selected.uuid;
            var objPos=this.selected.position.clone();
            var objRot=this.selected.rotation.clone();
            var objScale=this.selected.scale.clone();
            //AddComponents
            for(var i=0;i<this.selected.getComponents().length;i++){
                lightTarget.addComponent(this.selected.getComponents()[i]);
            }


            this.editor.execute(new RemoveObjectCommand(this.selected));
           lightTarget.position.copy(objPos);
           lightTarget.rotation.copy(objRot);
           lightTarget.scale.copy(objScale);
            this.editor.execute(new AddObjectCommand(lightTarget));
            this.refreshInspector();
            /*this.editor.execute(new SetPositionCommand(lightTarget,objPos));
            this.editor.execute(new SetRotationCommand(lightTarget,objRot));
            this.editor.execute(new SetScaleCommand(lightTarget,objScale));*/

       }
    }.bind(this)});

    this.intensity=new TONG.Value({value:1,alias:GetLanguage('intensity')});
    this.color=new TONG.Value({value:new TONG.Color(1,1,1),alias:GetLanguage('color')});
    this.groundColor=new TONG.Value({value:new TONG.Color(1,1,1),alias:GetLanguage('groundColor')});
    this.distance=new TONG.Value({value:100,alias:GetLanguage('distance')});
    this.angle=new TONG.Value({value:45,alias:GetLanguage('angle')});
    this.penumbra=new TONG.Value({value:1,alias:GetLanguage('penumbra')});
    this.decay=new TONG.Value({value:1,alias:GetLanguage('decay')});
    this.castShadow=new TONG.Value({value:true,alias:GetLanguage('castShadow')});;
    this.receiveShadow=new TONG.Value({value:true,alias:GetLanguage('receiveShadow')});;
    this.shadow=1.0;
    /*this.intensity=1;
    this.color=new TONG.Color(1,1,1);
    this.groundColor=new TONG.Color(1,1,1);
    this.distance=100;
    this.angle=45;
    this.penumbra=1;
    this.decay=1;
    this.castShadow=true;
    this.receiveShadow=true;
    this.shadow=1.0;*/
}
LightComponent.prototype=Object.create(TONG.Component.prototype);
LightComponent.prototype.constructor=LightComponent;
TONG.Light.prototype.registerComponents=[Entity,LightComponent];