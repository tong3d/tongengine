"use strict";

/**
 * Audio class is used to store audio data as a arraybuffer to be later used by objects with the WebAudio API.
 * 
 * @class Audio
 * @extends {ResourceSys}
 * @constructor
 * @module Resources
 * @param {ArrayBuffer, String} url URL to Audio file or ArrayBuffer data.
 * @param {String} encoding Audio encoding (mp3, wav, etc).
 */
function Audio(url, encoding)
{
    ResourceSys.call(this, "audio", "Audio");
	this.isReady=true;
	if(url !== undefined)
	{
		//Arraybuffer
		if(url instanceof window.ArrayBuffer)
		{
			this.data = url;
			this.encoding = (encoding !== undefined) ? encoding : "";
			this.format = "arraybuffer";
		}
		//Base64
		else if(Base64Utils.isBase64(url))
		{
			this.encoding = (encoding !== undefined) ? encoding : "";
			this.data = ArraybufferUtils.fromBase64(url);
			this.format = "arraybuffer";
		}
		//URL
		else
		{
            this.isReady=false;
			this.data = FileSystem.readFileArrayBuffer(url,true,this.onLoadAudio);
			this.encoding = FileSystem.getFileExtension(url);
			this.format = "arraybuffer";
		}
	}
    this.onEndCallback=null;
	this.onLoadCallback=null;
    this.filters=[];
    this.listener =  new TONG.AudioListener();
    this.context = this.listener.context;
    this.gain = this.context.createGain();
    this.gain.connect(this.listener.getInput());
    this.startTime=0;
    this.playbackRate=1;
    this.loop=true;
    this.volume=1;
    this.autoplay=true;

}


Audio.prototype = Object.create(ResourceSys.prototype);
ExtendClass(Audio,TONG.Audio);

Audio.prototype.onLoadAudio=function(data){
    this.isReady=true;
    this.onLoadCallback?this.onLoadCallback(data):null;
    this.data=data;
    if(this.autoplay){
        this.play();
    }
}

Audio.prototype.setAutoPlay=function(auto){
    this.autoplay=auto;
}

Audio.prototype.setStartTime=function(time){
	this.startTime=time;
}

Audio.prototype.play=function(){
    if(!this.isReady){
        return;
    }
	if(this.isPlaying){
		return;
	}
    this.disposed=false;
    var self = this;

    this.getAudioBuffer(this.context, function(buffer)
    {
        self.setBuffer(buffer);
    });
}

Audio.prototype.setBuffer = function(audioBuffer)
{
    this.buffer = audioBuffer;
    this.sourceType = "buffer";

    if(!this.disposed)
    {
        if(this.buffer === null)
        {
            console.warn("TONG ENGINE: Audio buffer not ready, audio will not play.");
            return;
        }

        if(this.isPlaying)
        {
            console.warn("TONG ENGINE: Audio is already playing, its only possible to control the last playing instance.");
        }

        var source = this.context.createBufferSource();
        source.buffer = this.buffer;
        source.loop = this.loop;
        source.onended = this.onEndCallback?this.onEndCallback.bind(this):null;
        source.playbackRate.setValueAtTime(this.playbackRate, this.startTime);
        source.start(0, this.startTime);

        this.isPlaying = true;
        this.source = source;

        return this.connect();
    }

    return null;
};

/**
 * Pauses audio playback.
 *
 * @method pause
 * @return {AudioEmitter} Self pointer for chaining
 */
Audio.prototype.pause = function()
{
	if(!this.source || !this.isPlaying){
		return;
	}
    this.source.stop();
    this.startTime=this.context.currentTime;
    this.isPlaying = false;

    return this;
};

Audio.prototype.getCurrentTime=function(){
	return this.context.currentTime;
}


/**
 * Resumes audio playback.
 *
 * @method resume
 * @return {AudioEmitter} Self pointer for chaining
 */
Audio.prototype.resume = function()
{
    if(!this.source || this.isPlaying){
        return;
    }
    this.source.start(this.startTime);
    //this.startTime=this.context.currentTime;
    this.isPlaying = true;

    return this;
};

/**
 * Stops audio playback and resets time to 0.
 *
 * @method pause
 * @return {AudioEmitter} Self pointer for chaining
 */
Audio.prototype.stop = function()
{
    if(!this.source || !this.isPlaying){
        return;
    }
    this.source.stop();
    this.startTime=0;
    this.isPlaying = false;

    return this;
};

/**
 * Dispose audio object, stops the playback and disconnects audio node.
 *
 * @method dispose
 */
Audio.prototype.dispose = function()
{
    if(this.isPlaying)
    {
        this.stop();
        this.disconnect();
        this.source=null;
        this.startTime=0;
        this.isPlaying=false;
    }

    this.disposed = true;


};

/**
 * Change audio resource.
 *
 * If changed after initialization the audio buffer will be disconnected and reintialized.
 *
 * @method setAudio
 * @param {Audio} audio Audio resource.
 */
/*Audio.prototype.setAudio = function(audio)
{
    this.audio.setData( audio);

    if(this.buffer !== null)
    {
        if(this.isPlaying)
        {
            this.stop();
        }
        this.disconnect();
    }

    var self = this;

    this.audio.getData().getAudioBuffer(this.context, function(buffer)
    {
        self.setBuffer(buffer);
    });
};*/

/**
 * Get audio emitter volume.
 *
 * @param {Number} volume
 * @method getVolume
 */
Audio.prototype.getVolume = function()
{
    return this.gain.gain.value;
};

/**
 * Set audio emitter volume.
 *
 * @method setVolume
 * @param {Number} value Audio volume
 * @return {AudioEmitter} Self pointer for chaining
 */
Audio.prototype.setVolume = function(value)
{
    this.volume= value;
    this.gain.gain.value = value;

    return this;
};

/**
 * Set loop mode. If loop set to True the audio repeats after ending.
 *
 * @method setLoop
 * @param {boolean} loop
 * @return {AudioEmitter} Self pointer for chaining
 */
Audio.prototype.setLoop = function(loop)
{
    this.loop= loop;

    if(this.source && this.isPlaying)
    {
        this.source.loop = this.loop;
    }

    return this;
};

/**
 * Get loop mode.
 *
 * @method getLoop
 * @return {boolean} Loop mode.
 */
Audio.prototype.getLoop = function()
{
    return this.loop;
};

/**
 * Set playback speed.
 *
 * @method setPlaybackRate
 * @param {Number} speed
 * @return {AudioEmitter} Self pointer for chaining
 */
Audio.prototype.setPlaybackRate = function (speed)
{
    this.playbackRate= speed;

    if(this.source && this.isPlaying)
    {
        this.source.playbackRate.setValueAtTime(this.playbackRate, this.context.currentTime);
    }

    return this;
};

/**
 * Get the playback speed.
 *
 * @method getPlaybackRate
 * @return {Number} Playback speed.
 */
Audio.prototype.getPlaybackRate = function()
{
    return this.playbackRate;
};

/**
 * Get Array with all the filters applied to this audio emitter.
 *
 * @method getFilters
 * @return {Array} Filters in this audio emitter.
 */
Audio.prototype.getFilters = function()
{
    return this.filters;
};

/**
 * Set the entire filters array.
 *
 * @method setFilters
 * @param {Array} value
 * @return {AudioEmitter} Self pointer for chaining
 */
Audio.prototype.setFilters = function(value)
{
    if(!value)
    {
        value = [];
    }

    if(this.isPlaying)
    {
        this.disconnect();
        this.filters = value;
        this.connect();
    }
    else
    {
        this.filters = value;
    }

    return this;
};

/**
 * Get a filter to the filters array.
 *
 * @method getFilter
 * @param {Number} index Index of the filter.
 * @return Filter.
 */
Audio.prototype.getFilter = function(index)
{
    return this.getFilters()[index !== undefined ? index : 0];
};

/**
 * Set a filter to the filters array.
 *
 * @method setFilter
 * @param {Object} filter
 */
Audio.prototype.setFilter = function(filter)
{
    return this.setFilters(filter ? [filter] : []);
};

/**
 * Change the source audio node.
 *
 * @method setNodeSource
 * @param {Object} node
 * @return {AudioEmitter} Self pointer for chaining
 */
Audio.prototype.setNodeSource = function(node)
{
    this.hasPlaybackControl = false;
    this.sourceType = "audioNode";

    this.source = node;
    this.connect();

    return this;
};

/**
 * Get output audio node.
 *
 * @method getOutput
 * @return {Object} Output audio node.
 */
Audio.prototype.getOutput = function()
{
    return this.gain;
};

/**
 * Check if a file name refers to a supported audio file.
 *
 * @method fileIsAudio
 * @static
 * @param {File} file
 * @return {boolean} True if the file refers to a supported audio format.
 */
Audio.fileIsAudio = function(file)
{
	if(file !== undefined)
	{
		if(file.type.startsWith("audio"))
		{
			return true;
		}
	}

	return false;
};

/**
 * Get an WebAudio buffer to play the audio stored in this resources.
 *
 * This method is asyncronous and the value is returned using a callback function.
 * 
 * @method getAudioBuffer
 * @param {AudioContext} context WebAudio context used to decode the audio data.
 * @param {Function} callback Callback funtion that receives an audio buffer as argument.
 */
Audio.prototype.getAudioBuffer = function(context, callback)
{
	context.decodeAudioData(this.data.slice(0), callback, function(error)
	{
		console.error("TONG ENGINE: Cannot decode audio buffer (" + error + ")");
	});
};


/**
 * Serialize audio data as json.
 * 
 * Audio data is serialized in Base64.
 *
 * @method toJSON
 * @param {meta} meta
 * @return {Object} data
 */
Audio.prototype.toJSON = function(meta)
{
	if(meta.audio[this.uuid] !== undefined)
	{
		return meta.audio[this.uuid];
	}

	var data = ResourceSys.prototype.toJSON.call(this, meta);
	
	data.encoding = this.encoding;
	data.data = this.data;
	data.format = this.format;

	meta.audio[this.uuid] = data;

	return data;
};
