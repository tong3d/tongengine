
var Joint=function(){

    TONG.Component.call(this);
    this.RequireComponent(Rigidbody);
    this.title=GetLanguage('Joint');
    this.icon="imgs/components/rigidbody.png";

    //this.type=new TONG.Enum([""]);
    var that=this;
    this.type=new TONG.Enum(["PointConstraint","HingeConstraint","SliderConstraint","ConeTwistConstraint","DOFConstraint"],function(value){
        switch(value){
            case "PointConstraint":
                break;
            case "HingeConstraint":
                that.axis=new TONG.Vector3(0,1,0);
                that.limit=new TONG.Vector4(-1,1,0,0);
                that.refreshInspector();
                break;
            case "SliderConstraint":
                break;
            case "ConeTwistConstraint":
                break;
            case "DOFConstraint":
                break;
        }
    });
    this.connectBody=new Rigidbody();


   /* this.isAttachPoint=new TONG.Value({value:false,callback:function(value){

    }});*/


    var constraint=null;
    this.Awake=function(){

        if(this.connectBody.uuid==""){
            return;
        }
       var typeVal=this.type.getValue();

       switch(typeVal){
           case "HingeConstraint":
               constraint=new Physijs.HingeConstraint(this.root,this.connectBody.root,this.connectBody.mesh.position,this.axis);

               break;
           case "SliderConstraint":
               constraint=new Physijs.SliderConstraint(this.root,this.connectBody.root,new TONG.Vector3(0,2,0),new TONG.Vector3(0,1,0));
               break;
           case "ConeTwistConstraint":
               constraint=new Physijs.ConeTwistConstraint(this.connectBody.root,this.root,this.connectBody.root.position);

               break;
           case "DOFConstraint":
               constraint=new Physijs.DOFConstraint(this.root,this.connectBody.root,this.connectBody.mesh.position);
               break;
           case "PointConstraint":
           default:
               constraint=new Physijs.PointConstraint(this.root,this.connectBody.root,this.connectBody.mesh.position);
               break;
       }
       if(constraint){
           this.scene.addConstraint(constraint);
        /*   constraint.setLimit(0.5 * Math.PI, 0.5 * Math.PI, 0.5 * Math.PI);
           constraint.setMaxMotorImpulse(1);
           constraint.setMotorTarget(new TONG.Vector3(0, 0, 0)); // desired rotation*/


          // constraint.setLimits(that.limit.x,that.limit.y,that.limit.z,that.limit.w);
           /*constraint.enableMotor();
           constraint.setLimit(0.5*Math.PI,0.5*Math.PI,0.5*Math.PI);
           constraint.setMaxMotorImpulse(1);
           constraint.setMotorTarget(new TONG.Vector3(0,0,0));*/
          // console.log();
       }
    }
    var firstRun=false;
    this.Update=function(){
        if(!firstRun){
            firstRun=true;
           /*  constraint.enableMotor();
            constraint.setMotorTarget(new TONG.Vector3(1, 0, 0));*/
            // constraint.disableMotor();
        }
    }
}
Joint.prototype=Object.create(TONG.Component.prototype);
Joint.prototype.constructor=Joint;
//TONG.Components.registerComponent(Joint);