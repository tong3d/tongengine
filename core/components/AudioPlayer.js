var AudioPlayer=function(){
    TONG.Component.call(this);
    this.title=GetLanguage('AudioPlayer');
    this.icon="imgs/components/audio.png";

    var that=this;
    /*this.isUrl=new TONG.Value({value:false,alias:GetLanguage("urlPlay"),callback:function(val){
            if(val){
                that.audio=null;
                that.urlPath=new TONG.Value({value:"",alias:GetLanguage("url")});
            }else{
                that.urlPath=null;
                that.audio=new TONG.Value({value:new TONG.AudioAsset(),alias:GetLanguage('audioAsset')});
            }
            that.refreshInspector();
        }});
    this.urlPath=new TONG.Value({value:"",alias:GetLanguage("url")});
*/
    /*this.OnInspectorAwake=function(){
        if(this.isUrl.getValue()){
            this.audio=null;
        }else{
            this.urlPath=null;
        }


    }*/

    this.audio=new TONG.Value({value:new TONG.AudioAsset(),alias:GetLanguage('audioAsset')});
    /**
     * If true the playback starts automatically.
     * @property autoplay
     * @default true
     * @type {boolean}
     */
    this.autoplay = new TONG.Value({value:true,alias:GetLanguage('isAutoPlay')});

    /**
     * Audio volume.
     * @property volume
     * @default 1.0
     * @type {Number}
     */
    this.volume =new TONG.Slider(1.0,{min:0,max:1.0,step:0.1,alias:GetLanguage('volume'),callback:function(val){
           that.setVolume(val);
    }});

    /**
     * Start time in seconds.
     * @property playbackRate
     * @default 1.0
     * @type {Number}
     */
    this.playbackRate =new TONG.Value({value:1.0,min:1.0,max:2.0,alias:GetLanguage('playbackRate'),
    callback:function(val){
        that.setPlaybackRate(val);
    }
    });

    /**
     * Start time in seconds.
     * @property startTime
     * @default 0.0
     * @type {Number}
     */
    this.startTime =new TONG.Value({min:0,value:0,alias:GetLanguage('startTime'),
        callback:function(val){
            that.setStartTime(val);
        }});

    /**
     * If true the audio plays in loop.
     * @property loop
     * @default true
     * @type {boolean}
     */
    this.loop =new TONG.Value({value:true,alias:GetLanguage('isLoop'),callback:function(val){
        that.setLoop(val);
        }});

    this.onEndCallback=null;

    /*this.Awake=function(){
        if(this.isUrl.getValue()  ){
            if(this.urlPath.getValue()!=""){
                var audioAsset=new TONG.AudioAsset();
                var audioObj= new Audio(this.urlPath.getValue());
                audioObj.setAutoPlay(this.autoplay.getValue());
                audioAsset.setData(audioObj);
                this.audio=new TONG.Value({value:audioAsset});
            }
        }


    }*/

    this.Start=function(){
        /*if(this.isUrl.getValue()  ){
            if(this.urlPath.getValue()==""){
                return;
            }
        }*/
        if(!this.audio.getValue().getData()){
            return;
        }
        this.audioObj= this.audio.getValue().getData();
        this.audioObj.setVolume(this.volume.getValue());
        this.audioObj.setStartTime(this.startTime.getValue());
        this.audioObj.setLoop(this.loop.getValue());
        this.audioObj.setPlaybackRate(this.playbackRate.getValue());
        if(this.autoplay.getValue()){

            this.play();
        }
    }

    this.getIsReady=function(){
        if(this.audioObj) {
          return  this.audioObj.isReady;
        }
        return false;
    }

    /**
     * Play audio.
     *
     * @method play
     * @return {AudioEmitter} Self pointer for chaining
     */
   this.play = function()
    {
        if(this.audioObj) {
            this.audioObj.play();
        }
    };

    /**
     * Pauses audio playback.
     *
     * @method pause
     * @return {AudioEmitter} Self pointer for chaining
     */
    this.pause = function()
    {
        if(this.audioObj) {
            this.audioObj.pause();
        }

    };

    /**
     * Stops audio playback and resets time to 0.
     *
     * @method pause
     * @return {AudioEmitter} Self pointer for chaining
     */
    this.stop = function()
    {
        if(this.audioObj) {
            this.audioObj.stop();
        }
    };

    this.Stop=function () {
        this.stop();
    }
    /**
     * Change audio resource.
     *
     * If changed after initialization the audio buffer will be disconnected and reintialized.
     *
     * @method setAudio
     * @param {Audio} audio Audio resource.
     */
    this.setAudioAsset = function(audioAsset)
    {
        this.audio.setValue(audioAsset);

        if(this.audio.getValue().getData().buffer !== null)
        {
            if(this.audio.getValue().getData().isPlaying)
            {
                this.audio.getValue().getData().stop();
            }
            this.audio.getValue().getData().disconnect();
        }

        var self = this;

        this.audio.getValue().getData().getAudioBuffer(this.context, function(buffer)
        {
            self.audio.getValue().getData().setBuffer(buffer);
        });
    };

    /**
     * Get audio emitter volume.
     *
     * @param {Number} volume
     * @method getVolume
     */
    this.getVolume = function()
    {
        return this.volume.getValue();
    };


    this.getCurrentTime=function(){
        if(this.audioObj){
          return  this.audioObj.getCurrentTime();
        }
        return 0;
    }

    /**
     * Set audio emitter volume.
     *
     * @method setVolume
     * @param {Number} value Audio volume
     * @return {AudioEmitter} Self pointer for chaining
     */
    this.setVolume = function(value)
    {
        this.volume.setValue( value,true);
       if(this.audioObj){
            this.audioObj.setVolume(value);
       }
    };

    /**
     * Set loop mode. If loop set to True the audio repeats after ending.
     *
     * @method setLoop
     * @param {boolean} loop
     * @return {AudioEmitter} Self pointer for chaining
     */
    this.setLoop = function(loop)
    {
        this.loop.setValue( loop,true);
        if(this.audioObj){
            this.audioObj.setLoop(loop);
        }
    };

    /**
     * Get loop mode.
     *
     * @method getLoop
     * @return {boolean} Loop mode.
     */
    this.getLoop = function()
    {
        return this.loop.getValue();
    };

    /**
     * Set playback speed.
     *
     * @method setPlaybackRate
     * @param {Number} speed
     * @return {AudioEmitter} Self pointer for chaining
     */
    this.setPlaybackRate = function (speed)
    {
        this.playbackRate.setValue(speed,true);
        if(this.audioObj){
            this.audioObj.setPlaybackRate(speed);
        }
    };

    /**
     * Get the playback speed.
     *
     * @method getPlaybackRate
     * @return {Number} Playback speed.
     */
    this.getPlaybackRate = function()
    {
        return this.playbackRate.getValue();
    };

    /**
     * Get Array with all the filters applied to this audio emitter.
     *
     * @method getFilters
     * @return {Array} Filters in this audio emitter.
     */
    this.getFilters = function()
    {
        if(this.audioObj){
            return this.audioObj.getFilters();
        }
        return [];
    };

    /**
     * Set the entire filters array.
     *
     * @method setFilters
     * @param {Array} value
     * @return {AudioEmitter} Self pointer for chaining
     */
    this.setFilters = function(value)
    {
        if(this.audioObj){
            this.audioObj.setFilters(value);
        }
    };

    /**
     * Get a filter to the filters array.
     *
     * @method getFilter
     * @param {Number} index Index of the filter.
     * @return Filter.
     */
    this.getFilter = function(index)
    {
        if(this.audioObj){
          return  this.audioObj.getFilter(index);
        }
        return null;
    };

    /**
     * Set a filter to the filters array.
     *
     * @method setFilter
     * @param {Object} filter
     */
    this.setFilter = function(filter)
    {
        if(this.audioObj){
            this.audioObj.setFilter(filter);
        }
    };

    /**
     * Change the source audio node.
     *
     * @method setNodeSource
     * @param {Object} node
     * @return {AudioEmitter} Self pointer for chaining
     */
    this.setNodeSource = function(node)
    {
        if(this.audioObj){
            this.audioObj.setNodeSource(node);
        }
    };

    /**
     * Get output audio node.
     *
     * @method getOutput
     * @return {Object} Output audio node.
     */
    this.getOutput = function()
    {
        if(this.audioObj){
           return this.audioObj.getOutput();
        }
        return null;
    };

    /**
     * Dispose audio object, stops the playback and disconnects audio node.
     *
     * @method dispose
     */
   this.dispose = function()
    {
        if(this.audioObj){
            return this.audioObj.dispose();
        }
    };
   
   this.Dispose=function () {
       this.dispose();
   }


}

AudioPlayer.prototype=Object.create(TONG.Component.prototype);
AudioPlayer.prototype.constructor=AudioPlayer;
TONG.Components.registerComponent(AudioPlayer);