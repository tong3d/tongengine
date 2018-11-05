/**
 * Created by TongWorld on 2017/5/12.
 */
var CameraComponent=function(){
    TONG.Component.call(this);
    this.title=GetLanguage("Camera");
    this.helpUrl="http://showdoc.tong3d.com";
    this.icon="css/pic/inspector/camera.png";
    /*this.onInspectorGUI=function(editor, inspector) {
        var signals = editor.signals;

        var typeOptions={disabled:true};
        var typeWidget=inspector.addString("Type","Perspective",typeOptions);
        var fovOptions={};
        var fovWidget=inspector.addNumber("Fov",50,fovOptions);
        fovWidget.setRange(1,179);
        var nearOptions={};
        var nearWidget=inspector.addNumber("Near",0.01,nearOptions);
        nearWidget.setRange(0.01);
        var farOptions={};
        var farWidget=inspector.addNumber("Far",10000,farOptions);
        farWidget.setRange(0.02);

        function update() {

            var object = editor.selected;

            if (object !== null) {

                if (object.fov !== undefined && Math.abs(object.fov - fovWidget.getValue()) >= 0.01) {

                    editor.execute(new SetValueCommand(object, 'fov', fovWidget.getValue()));
                    object.updateProjectionMatrix();

                }

                if (object.near !== undefined && Math.abs(object.near - nearWidget.getValue()) >= 0.01) {

                    editor.execute(new SetValueCommand(object, 'near', nearWidget.getValue()));

                }

                if (object.far !== undefined && Math.abs(object.far - farWidget.getValue()) >= 0.01) {

                    editor.execute(new SetValueCommand(object, 'far', farWidget.getValue()));

                }

            }

        }
         var uuid = -1;

         this.updateUI=function(object) {

            typeWidget.setValue(object.type,true);

            uuid = object.uuid;


            if (object.fov !== undefined) {

                fovWidget.setValue(object.fov,true);

            }

            if (object.near !== undefined) {

                nearWidget.setValue(object.near,true);

            }

            if (object.far !== undefined) {

                farWidget.setValue(object.far,true);

            }


        }
        this.init=function(){
            //updateRows(editor.selected);
            this.updateUI(editor.selected);
            typeOptions["callback"]=fovOptions["callback"]=nearOptions["callback"]=farOptions["callback"]=update;
        }
        TONG.Component.prototype.onInspectorGUI.call(this,editor,inspector);

    }*/
    this.isSelectedObject=true;
    this.type=new TONG.Enum(["PerspectiveCamera","OrthographicCamera"],{callback:function(value){
        //console.log(value);
        if(this.selected.type!=value){

            var cameraTarget=new TONG[value];
            cameraTarget.name=this.selected.name;
            cameraTarget.uuid=this.selected.uuid;
            var objPos=this.selected.position.clone();
            var objRot=this.selected.rotation.clone();
            var objScale=this.selected.scale.clone();
            //AddComponents
            for(var i=0;i<this.selected.getComponents().length;i++){
                cameraTarget.addComponent(this.selected.getComponents()[i]);
            }


            this.editor.execute(new RemoveObjectCommand(this.selected));
            cameraTarget.position.copy(objPos);
            cameraTarget.rotation.copy(objRot);
            cameraTarget.scale.copy(objScale);
            this.editor.execute(new AddObjectCommand(cameraTarget));
        }
    }.bind(this),alias:GetLanguage("type")});

    this.far=new TONG.Value({value:1000,alias:GetLanguage("far")}); //1000;
    this.near=new TONG.Value({value:0.01,alias:GetLanguage("near")});
    this.fov=new TONG.Value({value:50,alias:GetLanguage("fov")});
    this.layers=new TONG.Value({value:0,alias:GetLanguage("layers")});
    this.filmOffset=new TONG.Value({value:0,alias:GetLanguage("filmOffset")});
    this.filmGauge=new TONG.Value({value:35,alias:GetLanguage("filmGauge")});
    this.zoom=new TONG.Value({value:1,alias:GetLanguage("zoom")});
    this.bottom=new TONG.Value({value:-1,alias:GetLanguage("bottom")});
    this.left=new TONG.Value({value:-1,alias:GetLanguage("left")});
    this.right=new TONG.Value({value:1,alias:GetLanguage("right")});
    this.top=new TONG.Value({value:1,alias:GetLanguage("top")});
    /*this.far=1000; //1000;
    this.near=0.01;
    this.fov=50;
    this.layers=0;
    this.filmOffset=0;
    this.filmGauge=35;
    this.zoom=1;
    this.bottom=-1;
    this.left=-1;
    this.right=1;
    this.top=1;*/
}

CameraComponent.prototype=Object.create(TONG.Component.prototype);
CameraComponent.prototype.constructor=CameraComponent;
TONG.Camera.prototype.registerComponents=[Entity,CameraComponent];