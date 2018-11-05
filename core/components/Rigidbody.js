var Rigidbody=function(){
    TONG.Component.call(this);
    this.title=GetLanguage('Rigidbody');
    this.icon="imgs/components/rigidbody.png";
    var that=this;
    //weight
    this.mass=new TONG.Value({value:1,min:0,alias:GetLanguage("mass"),callback:function(val){
            if(that.body) {
                that.body.mass = val;
            }
        }});

    this.drag=new TONG.Value({value:0,min:0,alias:GetLanguage('linearDamping')});
    this.angular=new TONG.Value({value:0.05,min:0,alias:GetLanguage('angularDamping')});

    this.isKinematic=new TONG.Value({value:false,alias:GetLanguage('isKinematic')});
    this.useGravity=new TONG.Value({alias:GetLanguage('useGravity'),value:true,callback:function(value){

        }});

    function applyBody(scene){

        that.body= that.root.body;
        that.body.type=CANNON.Body.DYNAMIC;
        if(that.isKinematic.getValue()){
            that.body.type=CANNON.Body.KINEMATIC;
        }
        that.body.linearDamping=that.drag.getValue();
        that.body.angularDamping=that.angular.getValue();
        //that.body.mass=that.weight.getValue();
        scene.world.addBody(that.body);
    }
    this.Awake=function(){
        applyBody(this.scene);
        var body = that.body;
        var vector=this.root.worldPosition;
        body.position.copy(vector);
        body.quaternion.copy(this._root.worldQuaternion)
        that.body.updateMassProperties();
        that.body.updateBoundingRadius();
        that.body.aabbNeedsUpdate = true;
    }

    this.Update=function(){
        if(!this.useGravity.getValue() ||  !this.scene.usePhysics){
            return;
        }
        if(this.body.shapes.length==0){
            that.root.position.copy(this.body.position);
        }



    }

}
Rigidbody.prototype=Object.create(TONG.Component.prototype);
Rigidbody.prototype.constructor=Rigidbody;
TONG.Components.registerComponent(Rigidbody);