/**
 * Created by Administrator on 2017/5/11.
 */
var Model=function(){

    TONG.Component.call(this);
    this.title=GetLanguage("Model");
    this.icon="css/pic/inspector/model.png";
    this.helpUrl="http://showdoc.tong3d.com";
   /* this.materials=[];
    this.materialNames=[];*/
    this.isSelectedObject=true;
    var that=this;

    this.material =new Material();
    this.material.isNested=true;

    this.geometry=new Geometry();
    this.geometry.isNested=true;

    this.castShadow=new TONG.Value({value:true,alias:GetLanguage("castShadow")});
    this.receiveShadow=new TONG.Value({value:true,alias:GetLanguage("receiveShadow")});

   /* this.onInspectorGUI=function(editor, inspector){
        this.materials=[];
        this.materialNames=[];
        var uuid = -1;
        var signals = editor.signals;


        var typeOptions={values:["Box","Circle","Sphere","Cylinder","Plane","Torus","TorusKnot","Lathe","Icosahedron"]};
        this.typeWidget=inspector.addCombo("Type","Box",typeOptions);

       //var editMeshWidget=inspector.addButton(null,"Edit",{callback:geometryEditor});
        var materialInspector=new LiteGUI.Inspector();
        var materialContainer=inspector.addContainer();
        materialInspector.addSection("Materials",{collapsed:true});
        materialContainer.append(materialInspector.root);

        var object = editor.selected;

        var materialOptions={disabled:true, icon:"imgs/mini-icon-materialres.png"};
        var materialEle="Default-Material";

        this.materialArray=materialInspector.addArray("Material",[materialEle],materialOptions);

            /!*InspectorPanel.SwitchContent(SwitchContentEnum.Material);*!/
        var materialContentContainer=materialInspector.addContainer();
        var materialContentInspector=new LiteGUI.Inspector();
        materialContentContainer.append(materialContentInspector.root);

        var that=this;
        if (Array.isArray(object.material) && object.material.length != 0) {
            for(var i=0;i<object.material.length;i++) {

                this.mat._root = object;
                this.materialNames[i]=this.mat.title = "" + object.material[0].type;
                this.mat.collapsed=true;
                this.mat.onEditorTitle(materialContentInspector, this.mat);
                this.mat.onInspectorGUI(editor, materialContentInspector);
                this.materials[i]=mat;

            }
            this.materialArray.setValue(this.materialNames);
        }else{

            this.mat._root = object;
            this.materialArray.setValue([this.mat.title = "" + object.material.type]);
            this.mat.collapsed=true;
            this.mat.onEditorTitle(materialContentInspector, this.mat);
            this.mat.onInspectorGUI(editor, materialContentInspector);
            this.materials[0]=this.mat;
        }
        if(!this.signalInit) {
          /!*  signals.materialChanged.add(function () {
                if(that._root==editor.selected) {
                    refreshUI();
                }
            });*!/
        }


        //接收投影,与放射投影事件响应函数
        function update() {
            var object = editor.selected;

            if (object !== null) {
                if (object.castShadow !== undefined && object.castShadow !== that.castShadowsWidget.data) {

                    editor.execute(new SetValueCommand(object, 'castShadow', that.castShadowsWidget.data));

                }

                if (object.receiveShadow !== undefined && object.receiveShadow !== that.recShadowsWidget.data) {

                    editor.execute(new SetValueCommand(object, 'receiveShadow', that.recShadowsWidget.data));
                    object.material.needsUpdate = true;

                }
            }
        }




        //模型类型选择器事件触发
        function ModelSelect(selRes) {
            if (object && (object.geometry)){
                var objGeometry = null;
                switch (selRes) {
                    case "Box":
                        objGeometry = new TONG.BoxBufferGeometry(1, 1, 1);
                        break;
                    case "Circle":
                        var radius = 1;
                        var segments = 32;
                        objGeometry = new TONG.CircleBufferGeometry(radius, segments);
                        break;
                    case "Sphere":
                        var radius = 1;
                        var widthSegments = 32;
                        var heightSegments = 16;
                        var phiStart = 0;
                        var phiLength = Math.PI * 2;
                        var thetaStart = 0;
                        var thetaLength = Math.PI;
                        objGeometry = new TONG.SphereBufferGeometry(radius, widthSegments, heightSegments, phiStart, phiLength, thetaStart, thetaLength);
                        break;
                    case "Cylinder":
                        var radiusTop = 1;
                        var radiusBottom = 1;
                        var height = 2;
                        var radiusSegments = 32;
                        var heightSegments = 1;
                        var openEnded = false;
                        objGeometry = new TONG.CylinderBufferGeometry(radiusTop, radiusBottom, height, radiusSegments, heightSegments, openEnded);
                        break;
                    case  "Plane":
                        objGeometry = new TONG.PlaneBufferGeometry(2, 2);
                        break;
                    case "Torus":
                        var radius = 2;
                        var tube = 1;
                        var radialSegments = 32;
                        var tubularSegments = 12;
                        var arc = Math.PI * 2;
                        objGeometry = new TONG.TorusBufferGeometry(radius, tube, radialSegments, tubularSegments, arc);
                        break;
                    case "TorusKnot":
                        var radius = 2;
                        var tube = 0.8;
                        var tubularSegments = 64;
                        var radialSegments = 12;
                        var p = 2;
                        var q = 3;
                        objGeometry = new TONG.TorusKnotBufferGeometry(radius, tube, tubularSegments, radialSegments, p, q);
                        break;
                    case "Lathe":
                        var points = [
                            new TONG.Vector2(0, 0),
                            new TONG.Vector2(4, 0),
                            new TONG.Vector2(3.5, 0.5),
                            new TONG.Vector2(1, 0.75),
                            new TONG.Vector2(0.8, 1),
                            new TONG.Vector2(0.8, 4),
                            new TONG.Vector2(1, 4.2),
                            new TONG.Vector2(1.4, 4.8),
                            new TONG.Vector2(2, 5),
                            new TONG.Vector2(2.5, 5.4),
                            new TONG.Vector2(3, 12)
                        ];
                        var segments = 20;
                        var phiStart = 0;
                        var phiLength = 2 * Math.PI;
                        objGeometry = new TONG.LatheBufferGeometry(points, segments, phiStart, phiLength);
                        break;
                    case "Icosahedron":
                        var radius = 1;
                        var detail = 2;
                        objGeometry = new TONG.IcosahedronGeometry(radius, detail);
                        break;
                   /!* case "Sprite":
                        mesh = new TONG.Sprite(new TONG.SpriteMaterial());
                        mesh.name = object.name;
                        signals.currentObjectMeshChange.dispatch(object, mesh);
                        editor.removeObject(object);
                        editor.execute(new AddObjectCommand(mesh));
                        editor.execute(new SetPositionCommand(mesh, objPos));
                        editor.execute(new SetRotationCommand(mesh, objRot));
                        editor.execute(new SetScaleCommand(mesh, objScal));
                        return;
                        break;*!/
                }
                /!*if (mesh == null) {
                    mesh = new TONG.Mesh(objGeometry, new TONG.MeshStandardMaterial());
                }
                mesh.name = object.name;

                signals.currentObjectMeshChange.dispatch(object, mesh);
                editor.removeObject(object);
                editor.execute(new AddObjectCommand(mesh));
                editor.execute(new SetPositionCommand(mesh, objPos));
                editor.execute(new SetRotationCommand(mesh, objRot));
                editor.execute(new SetScaleCommand(mesh, objScal));*!/
                object.geometry.dispose();
                object.geometry=objGeometry;
                signals.objectSelected.dispatch(object);
            }

        };
        var containerInspector=new LiteGUI.Inspector();
        containerInspector.addSection("GeometryEditor",{collapsed:true});


        //containerParametera.append(parameters);



        function geometryEditor() {

            if (object && object.geometry){
                var geometry = object.geometry;

               // parameters.setDisplay('');
                // parameters
               // parameters.clear();

                if (geometry.type === 'BufferGeometry' || geometry.type === 'Geometry') {

                    new Sidebar.Geometry.Modifiers(editor, object,containerInspector);

                } else if (Sidebar.Geometry[geometry.type] !== undefined) {

                    new Sidebar.Geometry[geometry.type](editor, object,containerInspector);

                }



            }
            /!*else if(object && object.type == "Sprite"){
                     }*!/
        };
        geometryEditor();
        var containerParametera=inspector.addContainer();
        containerParametera.append(containerInspector.root);


        var castOptions={callback:update};
         this.castShadowsWidget=inspector.addCheckbox("Cast Shadows",true,castOptions);
        var recOptions={callback:update};
        this.recShadowsWidget=inspector.addCheckbox("Receive Shadows",true,recOptions);

         this.updateUI=function(object) {

             if (object && object.geometry) {

                 var geometry = object.geometry;
                 // console.log(geometry.type);
                 var geoType = geometry.type;

                 if (geoType.indexOf('BufferGeometry') >= 0) {
                     var res = geoType.replace("BufferGeometry", "");
                     this.typeWidget.setValue(res,true);

                 } else if (geoType.indexOf('Geometry') >= 0) {
                     var res = geoType.replace("Geometry", "");
                     this.typeWidget.setValue(res,true);
                 }
                 uuid = geometry.uuid;
             } /!*else if (object && object.type == "Sprite") {

                 uuid = object.uuid;
             }*!/

            if (object.castShadow !== undefined) {

                this.castShadowsWidget.setValue(object.castShadow);

            }

            if (object.receiveShadow !== undefined) {

                this.recShadowsWidget.setValue(object.receiveShadow);

            }
        }
        this.init=function(){
            this.updateUI(editor.selected);
            typeOptions["callback"]=ModelSelect;
        }
        TONG.Component.prototype.onInspectorGUI.call(this,editor,inspector);

    }*/
}

Model.prototype=Object.create(TONG.Component.prototype);
Model.prototype.constructor=Model;
TONG.Mesh.prototype.registerComponents=[Entity,Model];


var TextGeometry=function(){
    TONG.Component.call(this);
    this.title=GetLanguage("3DTextEditor");
    this.icon="";
    this.helpUrl="";
    this.helpIcon="";
    this.settingsIcon="";
    this.collapsed=true;
    this.isSelectedObject=true;
    var that=this;
    this.bevel=new TONG.Value({value:false,alias:GetLanguage('bevel'),callback:function(val){
            that.root.bevel=val;
            that.root.updateGeometry();
        }})
    this.size=new TONG.Value({value:1,alias:GetLanguage('size'),callback:function(val){
            that.root.size=val;
            that.root.updateGeometry();
        }});
    this.text=new TONG.Value({value:"text",alias:GetLanguage('text'),textarea:true,callback:function(val){
            that.root.setText(val);
        }});
    this.bevelThickness=new TONG.Value({value:0.1,alias:GetLanguage('thickness'),callback:function(val){
            that.root.bevelThickness=val;
            that.root.updateGeometry();
        }});

    this.bevelSize=new TONG.Value({value:0.05,alias:GetLanguage('bevelSize'),
        callback:function(val){
            that.root.bevelSize=val;
            that.root.updateGeometry();
        }})
    this.curveSegments=new TONG.Value({value:15,min:0,alias:GetLanguage('curve'),callback:function(val){
            that.root.curveSegments=val;
            that.root.updateGeometry();
        }});
    this.height=new TONG.Value({value:0.5,alias:GetLanguage('height'),
        callback:function(val){
            that.root.height=val;
            that.root.updateGeometry();
        }})
}
TextGeometry.prototype=Object.create(TONG.Component.prototype);
TextGeometry.prototype.constructor=TextGeometry;

var TextModel=function(){
    TONG.Component.call(this);
    this.title=GetLanguage("3D Text");
    this.icon="css/pic/inspector/3dtext.png";
    this.helpUrl="http://showdoc.tong3d.com";
    /* this.materials=[];
     this.materialNames=[];*/
    this.isSelectedObject=true;
    var that=this;


    this.material =new Material();
    this.material.isNested=true;


    this.geometry=new TextGeometry();
    this.geometry.isNested=true;

    this.castShadow=new TONG.Value({value:true,alias:GetLanguage("castShadow")});
    this.receiveShadow=new TONG.Value({value:true,alias:GetLanguage("receiveShadow")});
}
TextModel.prototype=Object.create(TONG.Component.prototype);
TextModel.prototype.constructor=TextModel;
TONG.Text3D.prototype.registerComponents=[Entity,TextModel];
//TONG.Sprite.prototype.registerComponents=[Entity,Model];