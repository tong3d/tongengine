var Animation=function(){
    TONG.Component.call(this);
    this.icon="imgs/components/animation.png";
    this.title=GetLanguage('Animation');
    this.file=new TONG.Value({value:new TONG.AnimationAsset(),alias:GetLanguage("animationAsset")});
    this.isAutoPlay=new TONG.Value({value:true,alias:GetLanguage("isAutoPlay")});
    //this.cullingType=new TONG.Enum(['always animate','base on renderers']);
    this.isLoop=new TONG.Value({value:true,alias:GetLanguage('isLoop')});

    var that=this;
    var currTime=0;
    var isPlay=true;
    this.Awake=function(){
        if(this.file.getValue().filename){
            this.mixer = new TONG.AnimationMixer(this.scene);
            var clipResource=this.file.getValue().getData();
            var tracks=[];
            for ( var i = 0, n = clipResource.tracks.length; i !== n; ++ i ) {

                var trackFrame=TONG.KeyframeTrack.toJSON(clipResource.tracks[ i ]);
                var index=trackFrame.name.indexOf('.');
                var info= trackFrame.name.substring(index);
                var name= this.root.uuid+info;
                trackFrame.name=name;
                tracks.push(trackFrame);

            }
            var clipJson= TONG.AnimationClip.toJSON(clipResource);
            clipJson.tracks=tracks;

            this.clip=TONG.AnimationClip.parse(clipJson);

            this.action = this.mixer.clipAction(this.clip).play();
            if(!this.isAutoPlay.getValue()){
                isPlay=false;
            }

        }
    }
    this.play=function(time){
        currTime=time;
        isPlay=true;

    }

    this.stop=function(){
        isPlay=false;
        currTime=0;
    }

    this.Update=function(e){
        if(this.mixer && isPlay){
            currTime+=e.delta;
            //console.log(currTime);
            this.action.time = currTime;
            this.mixer.update( 0 );
            if(this.isLoop.getValue() && currTime>this.clip.duration){
                currTime=0;
            }else if(!this.isLoop.getValue()){
                if(currTime>=this.clip.duration){
                    isPlay=false;
                }
            }
        }


    }

}
Animation.prototype=Object.create(TONG.Component.prototype);
Animation.prototype.constructor=Animation;
TONG.Components.registerComponent(Animation);