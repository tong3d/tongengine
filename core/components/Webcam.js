
var Webcam=function(){
    TONG.Component.call(this);
    this.title=GetLanguage('Webcam');
    this.icon="css/pic/inspector/webcam.png";
    var that=this;


    this.facing=new TONG.Enum(['Front','Backend'],{alias:GetLanguage('facingMode'),
        callback:function(val){
            if(val=='Front'){
                if(Webcam.Texture){
                    Webcam.Texture.mode=WebcamTexture.USER;
                }
            }else if(val=='Backend'){
                if(Webcam.Texture){
                    Webcam.Texture.mode=WebcamTexture.ENVIRONMENT;
                }
            }
        }});
    this.isAuto=new TONG.Value({value:true,alias:GetLanguage('autoConnect')});
    function applyTexture(){
        if(Webcam.Texture){
            Webcam.Texture.mode=that.facing.getValue()=='Front'?WebcamTexture.USER:WebcamTexture.ENVIRONMENT;
        }
        if(that.root.material){
            if(that.root.material instanceof Array){
                that.root.material[0].map=Webcam.Texture;
                that.root.material[0].needsUpdate=true;
            }else{
                that.root.material.map=Webcam.Texture;
                that.root.material.needsUpdate=true;
            }
        }

    }

    this.Awake=function(){
        if(!that.root.material){
            return;
        }
        if(this.isAuto.getValue()){
            this.connect();
        }
    }

    this.connect=function(){
        if(Webcam.Texture){
            applyTexture();
            return;
        }
        Webcam.Texture=new WebcamTexture();
        applyTexture();
    }

    this.Stop=function(){
        this.disconnect();
    }
    this.disconnect=function(){
        if(Webcam.Texture){
            Webcam.Texture.disconnect();
        }

    }
    
    this.dispose=function () {
        if(Webcam.Texture){
            Webcam.Texture.dispose();
            Webcam.Texture=null;

        }
    }

    this.Dispose=function(){
        this.dispose();
        applyTexture()
    }
}

Webcam.Texture=null;

Webcam.prototype=Object.create(TONG.Component.prototype);
Webcam.prototype.constructor=Webcam;
TONG.Components.registerComponent(Webcam);