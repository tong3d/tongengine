var Constraint=function(){
    TONG.Component.call(this);
    this.RequireComponent(Rigidbody);
    this.title=GetLanguage('Constraint');
    this.icon="css/pic/inspector/joint.png";

    //this.type=new TONG.Enum([""]);
    var that=this;
    this.type=new TONG.Enum(["LockConstraint","PointConstraint","DistanceConstraint","HingeConstraint","ConeTwistConstraint"],{alias:GetLanguage('type'),callback:function(value){
        if(isPlay){return}
        switch(value){
            case "LockConstraint":
                that.pivotA=null;
                that.pivotB=null;
                that.axisA=null;
                that.axisB=null;
                that.distance=null;
                that.angle =null;
                break;
            case "PointConstraint":
                that.axisA=null;
                that.axisB=null;

                that.pivotA=new TONG.Value({value:new TONG.Vector3().copy(that.root.position),alias:GetLanguage('pivotA')});
                that.pivotB=new TONG.Value({value:new TONG.Vector3().copy(that.connectBody.root?that.connectBody.root.position:new TONG.Vector3()),alias:GetLanguage('pivotB')});
                that.distance=null;
                that.angle =null;
                break;
            case "DistanceConstraint":
                that.pivotA=null;
                that.pivotB=null;
                that.axisA=null;
                that.axisB=null;
                that.distance=new TONG.Value({value:1,alias:GetLanguage('distance')});
                that.angle =null;
                break;
            case "HingeConstraint":
                that.distance=null;
                that.pivotA=new TONG.Value({value:new TONG.Vector3().copy(that.root.position),alias:GetLanguage('pivotA')});
                that.pivotB=new TONG.Value({value:new TONG.Vector3().copy(that.connectBody.root?that.connectBody.root.position:new TONG.Vector3()),alias:GetLanguage('pivotB')});
                that.axisA=new TONG.Value({value:new TONG.Vector3(1,0,0),alias:GetLanguage('axisA')});
                that.axisB=new TONG.Value({value:new TONG.Vector3(1,0,0),alias:GetLanguage('axisB')});
                that.angle =null;
                break;
            case "ConeTwistConstraint":
                that.pivotA=new TONG.Value({value:new TONG.Vector3().copy(that.root.position),alias:GetLanguage('pivotA')});
                that.pivotB=new TONG.Value({value:new TONG.Vector3().copy(that.connectBody.root?that.connectBody.root.position:new TONG.Vector3()),alias:GetLanguage('pivotB')});
                that.axisA=new TONG.Value({value:new TONG.Vector3(1,0,0),alias:GetLanguage('axisA')});
                that.axisB=new TONG.Value({value:new TONG.Vector3(1,0,0),alias:GetLanguage('axisB')});
                that.angle =new TONG.Value({value:0,alias:GetLanguage('angle')});
                break;
        }
        that.refreshInspector();
    }});
    this.connectBody=new TONG.Value({value:new Rigidbody(),alias:GetLanguage('connectBody'),callback:function(body){
            if(that.pivotB){
                that.pivotB.setValue(body.root.position,true);
                that.refreshInspector();
            }
        }});
    this.maxForce=new TONG.Value({value:10,alias:GetLanguage('maxForce')});
    this.distance=new TONG.Value({value:1,alias:GetLanguage('distance')});
    this.pivotA=new TONG.Value({value:new TONG.Vector3(),alias:GetLanguage('pivotA')});
    this.pivotB=new TONG.Value({value:new TONG.Vector3(),alias:GetLanguage('pivotB')});
    this.axisA=new TONG.Value({value:new TONG.Vector3(1,0,0),alias:GetLanguage('axisA')});
    this.axisB=new TONG.Value({value:new TONG.Vector3(1,0,0),alias:GetLanguage('axisB')});
    this.angle =new TONG.Value({value:0,alias:GetLanguage('angle')});
    this.OnInspectorAwake=function(){
        //this.connectBody.setValue(this.root.Rigidbody,true);
        switch(this.type.getValue()){
            case "LockConstraint":
                this.pivotA=null;
                this.pivotB=null;
                this.axisA=null;
                this.axisB=null;
                this.distance=null;
                this.angle =null;
                break;
            case "PointConstraint":
                this.axisA=null;
                this.axisB=null;
                this.pivotA=new TONG.Value({value:new TONG.Vector3().copy(that.root.position),alias:GetLanguage('pivotA')});
                this.pivotB=new TONG.Value({value:new TONG.Vector3().copy(that.connectBody.root?that.connectBody.root.position:new TONG.Vector3()),alias:GetLanguage('pivotB')});
                this.distance=null;
                this.angle =null;
                break;
            case "DistanceConstraint":
                this.pivotA=null;
                this.pivotB=null;
                this.axisA=null;
                this.axisB=null;
                this.distance=new TONG.Value({value:1,alias:GetLanguage('distance')});
                this.angle =null;
                break;
            case "HingeConstraint":
                this.distance=null;
                this.pivotA=new TONG.Value({value:new TONG.Vector3().copy(that.root.position),alias:GetLanguage('pivotA')});
                this.pivotB=new TONG.Value({value:new TONG.Vector3().copy(that.connectBody.root?that.connectBody.root.position:new TONG.Vector3()),alias:GetLanguage('pivotB')});
                this.axisA=new TONG.Value({value:new TONG.Vector3(1,0,0),alias:GetLanguage('axisA')});
                this.axisB=new TONG.Value({value:new TONG.Vector3(1,0,0),alias:GetLanguage('axisB')});
                this.angle =null;
                break;
            case "ConeTwistConstraint":
                this.pivotA=new TONG.Value({value:new TONG.Vector3().copy(that.root.position),alias:GetLanguage('pivotA')});
                this.pivotB=new TONG.Value({value:new TONG.Vector3().copy(that.connectBody.root?that.connectBody.root.position:new TONG.Vector3()),alias:GetLanguage('pivotB')});
                this.axisA=new TONG.Value({value:new TONG.Vector3(1,0,0),alias:GetLanguage('axisA')});
                this.axisB=new TONG.Value({value:new TONG.Vector3(1,0,0),alias:GetLanguage('axisB')});
                this.angle =new TONG.Value({value:0,alias:GetLanguage('angle')});
                break;
        }

    }

    var constraint=null;
    this.Start=function(){

        if(!this.connectBody.getValue() || !this.connectBody.getValue().uuid || this.connectBody.getValue().uuid==''){
            return;
        }
        if(this.connectBody.getValue().uuid==this.root.getComponents('Rigidbody').uuid){
            return;
        }
        var typeVal=this.type.getValue();
        console.log(this.connectBody.value.root);
        switch(typeVal){
            case "LockConstraint":
                constraint=new CANNON.LockConstraint(this.root.body,this.connectBody.value.root.body,{maxForce:this.maxForce.getValue()});
                break;
            case "PointConstraint":
                constraint=new CANNON.PointToPointConstraint(this.root.body,this.pivotA.getValue(),this.connectBody.value.root.body,this.pivotB.getValue(),this.maxForce.getValue());
                break;
            case "DistanceConstraint":
                constraint=new CANNON.DistanceConstraint(this.root.body,this.connectBody.value.root.body,this.distance.value,this.maxForce.value);
                break;
            case "HingeConstraint":
                constraint=new CANNON.HingeConstraint(this.root.body,this.connectBody.value.root.body,{maxForce:this.maxForce.getValue(),pivotA:this.pivotA.getValue(),pivotB:this.pivotB.getValue(),axisA:new CANNON.Vec3().copy(this.axisA.value),axisB:new CANNON.Vec3().copy(this.axisB.value)});
                break;
            case "ConeTwistConstraint":
                constraint=new CANNON.ConeTwistConstraint(this.root.body,this.connectBody.value.root.body,{maxForce:this.maxForce.getValue(),pivotA:this.pivotA.getValue(),pivotB:this.pivotB.getValue(),axisA:new CANNON.Vec3().copy(this.axisA.value),
                    axisB:new CANNON.Vec3().copy(this.axisB.value),angle:this.angle.value});
                break;
        }
        if(constraint){
            this.scene.world.addConstraint(constraint);

        }
    }

}
Constraint.prototype=Object.create(TONG.Component.prototype);
Constraint.prototype.constructor=Constraint;
TONG.Components.registerComponent(Constraint);