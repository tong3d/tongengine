/**
 * Created by zhengxiangkui on 2018/2/26.
 */

var Collider=function(){
    TONG.Component.call(this);
    this.title=GetLanguage('Collider');
    this.icon="css/pic/collision.png";
    this.helpUrl="http://showdoc.tong3d.com";

    var that=this;
    this.type=new TONG.Enum(["BoxCollider",
        "SphereCollider","CylinderCollider","MeshCollider"],{alias:GetLanguage("type"),
        callback:function (val) {

        }});
    //是否使用碰撞
    this.isCollion=new TONG.Value({value:true,alias:GetLanguage("isCollion")});

    //friction
    this.friction=new TONG.Value({value:0.1,min:0,alias:GetLanguage("friction")});;
    //restitution
    this.restitution=new TONG.Value({value:0.1,min:0,alias:GetLanguage("restitution")});

    this.center=new TONG.Value({value:new TONG.Vector3(0,0,0),
        alias:GetLanguage('center'),callback:function(val){
            physicsHelp.tmpPosition.set(val.x,val.y,val.z);
        }});
    this.size=new TONG.Value({value:new TONG.Vector3(1,1,1),
        alias:GetLanguage('size'),callback:function(val){
            physicsHelp.tmpScale.set(val.x,val.y,val.z);
        }});
    this.radius=new TONG.Value({value:0.5,alias:GetLanguage('radius'),callback:function(val){
            physicsHelp.tmpScale.set(val*2,val*2,val*2);
        }});
    this.OnEditorGeometryChange=function(geometry){
        switch(geometry.type){
            case "PlaneBufferGeometry":
                this.type.setValue('BoxCollider');
                break;
            case "BoxBufferGeometry":
                this.type.setValue('BoxCollider');
                break;
            case "CircleBufferGeometry":
                this.type.setValue('BoxCollider');
                break;
            case "CylinderBufferGeometry":
                this.type.setValue('CylinderCollider');

                break;
            case "SphereBufferGeometry":
                this.type.setValue('SphereCollider');

                break;
            case "IcosahedronGeometry":
                this.type.setValue('SphereCollider');
                break;
            case "TorusBufferGeometry":
                this.type.setValue('TrimeshCollider');

                break;
            case "TorusKnotBufferGeometry":
                this.type.setValue('TrimeshCollider');

                break;
            case "LatheBufferGeometry":
                this.type.setValue('MeshCollider');
                break;
        }
    }
    /*this.center= new TONG.Value({value:new TONG.Vector3(1,1,1),alias:GetLanguage('center'),callback:function(val){
            console.log(val);
        }});*/


    function applyBody(scene){
         that.body= that.root.body;
         that.body.material.friction=that.friction.getValue();
         that.body.material.restitution=that.restitution.getValue();
         scene.world.addBody(that.body);

    }
    var physicsHelp=null;
    
    this.OnRemovedFromNode=function () {
        if(isEditor) {
            EditorModule.target.removePhysicsHelper(physicsHelp);
        }
    }
    
    
    this.OnInspectorAwake=function(){
        if(!that.body) {
            var singleShape = PhysicsGenerator.createSingleShape(this.root);
            this._root.addShape(
                singleShape);
            switch (singleShape.type){
                case CANNON.Shape.types.BOX:
                    this.type.setValue('BoxCollider', true);
                    this.radius=null;
                    break;
                case CANNON.Shape.types.SPHERE:
                    this.type.setValue('SphereCollider', true);
                    this.size=null;

                    break;
                case CANNON.Shape.types.TRIMESH:
                    this.type.setValue('TrimeshCollider', true);
                    this.center=null;
                    this.radius=null;
                    this.size=null;
                    break;
                case CANNON.Shape.types.CONVEXPOLYHEDRON:
                    this.type.setValue('MeshCollider', true);
                    this.center=null;
                    this.radius=null;
                    this.size=null;
                    break;
                case CANNON.Shape.types.CYLINDER:
                    this.type.setValue('CylinderCollider', true);
                    this.center=null;
                    this.radius=null;
                    this.size=null;
                    break;
            }
            applyBody(EditorModule.target.scene);
        }
        that.body.position.copy(this._root.position);
        that.body.quaternion.copy(this._root.quaternion);
        physicsHelp=new PhysicsObjectHelper(this._root);
        if(this.center){
            physicsHelp.tmpPosition.set(this.center.getValue().x,this.center.getValue().y,this.center.getValue().z);
        }
        if(this.size){
            physicsHelp.tmpScale.set(this.size.getValue().x,this.size.getValue().y,this.size.getValue().z);
        }
        if(this.radius){
            physicsHelp.tmpScale.set(this.radius.getValue()*2,this.radius.getValue()*2,this.radius.getValue()*2);
        }
        EditorModule.target.addPhysicsHelper(physicsHelp);
    }
    this.OnEditorRemovedFromNode=function(){
        if(isEditor) {
            EditorModule.target.removePhysicsHelper(physicsHelp);
        }
    }

    this.OnEditorRemoveObject=function(){
        if(isEditor) {
            EditorModule.target.removePhysicsHelper(physicsHelp);
        }
    }
    this.OnInspectorUpdate=function(){
        if(physicsHelp){
            //console.log('onInspectorUpdate');
            //var vector = new TONG.Vector3();
            //vector.setFromMatrixPosition( this.root.matrixWorld );
           // physicsHelp.position.set(vector.x, vector.y, vector.z);
            //physicsHelp.rotation.set(this.root.rotation.x, this.root.rotation.y, this.root.rotation.z, this.root.rotation.order);
            //physicsHelp.scale.set(this.root.scale.x, this.root.scale.y, this.root.scale.z);
            physicsHelp.update();
        }
    }
    this.OnInspectorChange=function(node){
        EditorModule.target.removePhysicsHelper(physicsHelp);
        physicsHelp=null;
    }
    this.OnInspectorSelect=function(node){
        //this._root.body.position.copy(this._root.position);
        //this._root.body.quaternion.copy(this._root.quaternion);
        physicsHelp=new PhysicsObjectHelper(this._root);
        if(this.center){
            physicsHelp.tmpPosition.set(this.center.getValue().x,this.center.getValue().y,this.center.getValue().z);
        }
        if(this.size){
            physicsHelp.tmpScale.set(this.size.getValue().x,this.size.getValue().y,this.size.getValue().z);
        }
        if(this.radius){
            physicsHelp.tmpScale.set(this.radius.getValue()*2,this.radius.getValue()*2,this.radius.getValue()*2);
        }
        EditorModule.target.addPhysicsHelper(physicsHelp);
    }
    /*this.onObjectChanged=function(obj,mode){
        if(mode && physicsHelp){
            physicsHelp.update();
        }
    }*/

    this.Start=function(){

            applyBody(this.scene);
            //that.body.mass = this.weight.getValue();
            var singleShape = null;
            switch (this.type.getValue()) {
                case "BoxCollider":
                    singleShape = PhysicsGenerator.createSingleShape(this.root, PhysicsGenerator.Type.BOX);
                    break;
                case "SphereCollider":
                    singleShape = PhysicsGenerator.createSingleShape(this.root, PhysicsGenerator.Type.SPHERE)
                    break;
                case "CylinderCollider":
                    singleShape = PhysicsGenerator.createSingleShape(this.root, PhysicsGenerator.Type.CYLINDER)
                    break;
                case "MeshCollider":
                    singleShape = PhysicsGenerator.createSingleShape(this.root, PhysicsGenerator.Type.HULL)
                    break;
                default:
                    singleShape = PhysicsGenerator.createSingleShape(this.root, PhysicsGenerator.Type.HULL)
                    break;
            }
            that.body.addShape(singleShape);
            var body = that.body;

            /*this.root.updateMatrixWorld(true);
            var worldPosition = new TONG.Vector3().copy(this.root.position);
            var vector=this.root.localToWorld(worldPosition);
            console.log(vector);*/

            var vector=this.root.worldPosition;
            //this.root.setPosition(vector);

           /* var vector = new TONG.Vector3();
            this.root.getWorldPosition(vector);
            console.log(vector);*/
            //vector= this.root.localToWorld(vector);

         //  vector.setFromMatrixPosition( this.root.matrixWorld );

            var scaleWorld=this.root.worldScale;
            body.position.copy(vector);
            //var rootRotation=this.root.rotation;
            body.quaternion.copy(this._root.worldQuaternion);//setFromEuler(rootRotation.x,rootRotation.y,rootRotation.z,rootRotation.order);
            var shapeWorldPosition=new CANNON.Vec3();
            this.shapeOffsetPosition =new CANNON.Vec3();
            var shapeWorldQuaternion =new CANNON.Vec3();
            var shapeOffsetScale=new CANNON.Vec3(1,1,1);

            if(this.center){
                this.shapeOffsetPosition.set(this.center.getValue().x,this.center.getValue().y,this.center.getValue().z);
            }
            if(this.size){
                shapeOffsetScale.set(this.size.getValue().x,this.size.getValue().y,this.size.getValue().z);
            }
            if(this.radius){
                shapeOffsetScale.set(this.radius.getValue()*2,this.radius.getValue()*2,this.radius.getValue()*2);
            }
            var sx=shapeOffsetScale.x*scaleWorld.x/2;
            var sy=shapeOffsetScale.y*scaleWorld.y/2;
            var sz=shapeOffsetScale.z*scaleWorld.z/2;
            if(singleShape.type==CANNON.Shape.types.SPHERE) {
                var radius =Math.max( Math.abs(sx),Math.abs(sy),Math.abs(sz));
                singleShape.radius=radius;
            }else{
                singleShape.halfExtents.set(sx, sy, sz);
            }

            //Get world position
            body.quaternion.vmult(body.shapeOffsets[0], shapeWorldPosition);
            body.position.vadd(shapeWorldPosition, shapeWorldPosition);
            body.position.vadd(this.shapeOffsetPosition,shapeWorldPosition);



        //Get world quaternion
            body.quaternion.mult(body.shapeOrientations[0], shapeWorldQuaternion);


            singleShape.updateConvexPolyhedronRepresentation();
            singleShape.updateBoundingSphereRadius();
            that.body.updateMassProperties();
            that.body.updateBoundingRadius();
            that.body.aabbNeedsUpdate = true;

            //this.scene.world.addBody(this.root.body);

    }
    this.matrix = new TONG.Matrix4();
    this.bodyMatrix=new TONG.Matrix4();
    this.Update=function(e){
        //console.log(this.root.body.position);
        if(this.scene.usePhysics){

           // var worldBodyPos=new TONG.Vector3();
            //worldBodyPos.copy(that.body.position);

            /*var worldBodyQuaternion=new TONG.Quaternion();
            worldBodyQuaternion.copy(this.root.body.quaternion);
            this.bodyMatrix.compose(worldBodyPos,new TONG.Quaternion().copy(this.root.quaternion),new TONG.Vector3().copy(this.root.scale));

            this.root.updateMatrix();
            this.matrix.getInverse( this.root.matrixWorld );
            this.matrix.multiply(this.bodyMatrix );
            this.root.applyMatrix( this.matrix );*/

            //this.root.setPosition(worldBodyPos)
            //this.root.position.copy(that.body.position);
            that.root.position.copy(this.body.position);
            this.root.quaternion.copy(that.body.quaternion);
           // this.meshObj.position.copy(that.body.position);
           // this.meshObj.quaternion.copy(that.body.quaternion);
            //console.log(this.root.position);
        }

       //e.scene.world
    }
}
Collider.prototype=Object.create(TONG.Component.prototype);
Collider.prototype.constructor=Collider;
TONG.Components.registerComponent(Collider);