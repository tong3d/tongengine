var MoviePlayer=function(){
    TONG.Component.call(this);
    this.title=GetLanguage('MoviePlayer');
    this.icon="imgs/components/movie.png";

    var that=this;

    this.video=new TONG.Value({value:new TONG.VideoAsset(),alias:GetLanguage('videoAsset')});
    this.autoplay=new TONG.Value({value:true,alias:GetLanguage('isAutoPlay'),callback:function(val){
            if(that.videoTexture){
                that.videoTexture.setAutoPlay(val);
            }
        }});
    this.volume=new TONG.Slider(1.0,{min:0,max:1,step:0.1,alias:GetLanguage('volume'),callback:function(val){
            if(that.videoTexture){
                that.videoTexture.setVolume(val);
            }
        }});
    this.playbackRate=new TONG.Value({value:1,min:1,max:2,alias:GetLanguage('playbackRate'),callback:function (val) {
            if(that.videoTexture){
                that.videoTexture.setPlaybackRate(val);
            }
        }});
    this.loop=new TONG.Value({value:true,alias:GetLanguage('isLoop'),callback:function(val){
            if(that.videoTexture){
                that.videoTexture.setLoop(val);
            }
        }});
    this.startTime =new TONG.Value({min:0,value:0,alias:GetLanguage('startTime'),
        callback:function(val){
            if(that.videoTexture){
                that.videoTexture.setTime(val);
            }
        }});

    this.Awake=function(){
        //var texture = new VideoTexture("http://tong3d.com/engine/test/export/fz.mp4");
        //this.root.material.map = texture;
        if(!this.root.material){
            return;
        }

        var videoObj=this.video.getValue().getData();
        if(this.autoplay.getValue() && videoObj){
            var videoData=videoObj;
            this.videoTexture=new VideoTexture(videoData);
            that.videoTexture.setAutoPlay(this.autoplay.getValue());
            that.videoTexture.setVolume(this.volume.getValue());
            that.videoTexture.setPlaybackRate(this.playbackRate.getValue());
            that.videoTexture.setLoop(this.loop.getValue());
            that.videoTexture.setTime(this.startTime.getValue());
            if(this.root.material){
                if(this.root.material instanceof Array){
                    this.root.material[0].map=this.videoTexture;
                    this.root.material[0].needsUpdate=true;
                }else{
                    this.root.material.map=this.videoTexture;
                    this.root.material.needsUpdate=true;
                }
            }
            this.videoTexture.needsUpdate=true;
           // this.video.getValue().getData().play();
        }
    }

    this.Stop=function(){
        if(this.videoTexture) {
            this.videoTexture.pause();
        }
    }

    this.Dispose=function(){
        if(this.videoTexture) {
            this.videoTexture.dispose();
            if(this.root.material instanceof Array){
                this.root.material[0].map=null;
                this.root.material[0].needsUpdate=true;
            }else{
                this.root.material.map=null;
                this.root.material.needsUpdate=true;
            }
        }
    }
}

MoviePlayer.prototype=Object.create(TONG.Component.prototype);
MoviePlayer.prototype.constructor=MoviePlayer;
TONG.Components.registerComponent(MoviePlayer);