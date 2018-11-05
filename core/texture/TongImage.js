"use strict";

/**
 * Image class is used to store image data that is used to create Textures.
 * 
 * Images can be stored in mutiple formats.
 *
 * Some formats (tga, tiff, etc) are converted to png or jpeg in order to work with the rest of the code.
 * 
 * @class Image
 * @constructor
 * @extends {ResourceSys}
 * @module Resources
 * @param {ArrayBuffer, Base64, String} data Can be URL to image, ArrayBuffer data or base64 encoded data.
 * @param {String} encoding Image encoding, required for ArrayBuffer data.
 */
function TongImage(url, encoding)
{
	ResourceSys.call(this, "tongImage", "TongImage");

	this.width = -1;
	this.height = -1;

	if(url !== undefined)
	{
		//ArrayBuffer
		if(url instanceof window.ArrayBuffer)
		{
			this.loadArrayBufferData(url, encoding);
		}
		//Base64
		else if(Base64Utils.isBase64(url))
		{
			this.encoding = Base64Utils.getFileFormat(url);
			this.format = "base64";
			this.data = url;
		}
		//URL
		else
		{
			this.encoding = FileSystem.getFileExtension(url);
			this.format = "url";
			this.data = url;
		}
	}
	else
	{
		this.createSolidColor();
	}
}

TongImage.prototype = Object.create(ResourceSys.prototype);

/**
 * Check if a file name refers to a supported binary image file.
 *
 * @method fileIsImage
 * @static
 * @param {File} file
 * @return {boolean} True if the file refers to a supported image format.
 */
TongImage.fileIsImage = function(file)
{
	if(file !== undefined)
	{
		if(file.type.startsWith("tongTexture"))
		{
			return true;
		}

		file = file.name.toLocaleLowerCase();

		return file.endsWith("tga") || file.endsWith("dds") || file.endsWith("pvr") || file.endsWith("ktx");
	}

	return false;
};

/**
 * Create a new image with 1x1 resolution with solid color.
 *
 * Can be called externally on data load error to load dummy data.
 *
 * @method createSolidColor
 * @param {String} color Color code
 */
TongImage.prototype.createSolidColor = function(color)
{
	var canvas = document.createElement("canvas");
	canvas.width = 1;
	canvas.height = 1;

	var context = canvas.getContext("2d");
	context.fillStyle = (color !== undefined) ? color : MathUtils.randomColor();
	context.fillRect(0, 0, 1, 1);

	this.data = canvas.toDataURL("image/png");
	this.format = "base64";
	this.encoding = "png";
};

/**
 * Load arraybuffer data to this image.
 *
 * Creates a blob with data to be stored on data atribute and used by external objects.
 *
 * @method loadArrayBufferData
 * @param {ArrayBuffer} data Data to be loaded.
 * @param {String} encoding Image enconding (jpeg, png, etc).
 */
TongImage.prototype.loadArrayBufferData = function(data, encoding)
{
	var view = new Uint8Array(data);
	var blob = new Blob([view], {type: "image/" + encoding});

	this.data = URL.createObjectURL(blob);
	this.arraybuffer = data;
	this.encoding = encoding;
	this.format = "arraybuffer";
};

/**
 * Check if this image has alpha channel.
 *
 * This checks the file encoding if the file a GIF or a PNG is assumed that the file has alpha channel.
 *
 * @method hasTransparency
 * @return {boolean} True if the image is encoded as PNG or GIF
 */
TongImage.prototype.hasTransparency = function()
{
	return this.encoding === "png" || this.encoding === "gif";
	
	/*var image = document.createElement("img");
	image.src = this.data;

	var canvas = document.createElement("canvas");
	canvas.width = image.width;
	canvas.height = image.height;

	var context = canvas.getContext("2d");
	context.drawImage(image, 0, 0, image.width, image.height);
	
	var data = context.getImageData(0, 0, image.width, image.height).data;
	for(var i = 3; i < data.length; i += 4)
	{
		if(data[i] !== 255)
		{
			return true;
		}
	}

	return false;*/
};

/**
 * Compresses image data to JPEG.
 *
 * Can be used to compress data and save some space.
 * 
 * @method compressJPEG
 * @param {Number} quality JPEG compression quality level by default 0.7 is used (1.0  means max quality).
 */
TongImage.prototype.compressJPEG = function(quality)
{
	var self = this;
	var blob = canvas.toBlob("image/jpeg", quality !== undefined ? quality : 0.7);

	var reader = new FileReader();
	reader.onload = function()
	{
		self.encoding = "jpeg";
		self.format = "arraybuffer";
		self.data = reader.result;
	};

	reader.readAsArrayBuffer(blob);
};

/**
 * Serialize Image resource to json.
 *
 * If image is stored as URL it is converter to PNG or JPEG.
 *
 * @method toJSON
 * @param {Object} meta
 * @return {Object} json
 */
TongImage.prototype.toJSON = function(meta)
{
	if(meta.images[this.uuid] !== undefined)
	{
		return meta.images[this.uuid];
	}

	var data = ResourceSys.prototype.toJSON.call(this, meta);

	if(this.format === "url")
	{
		this.loadArrayBufferData(FileSystem.readFileArrayBuffer(this.data), this.encoding);
	}

	data.width = this.width;
	data.height = this.height;
	data.encoding = this.encoding;

	if(this.format === "arraybuffer")
	{
		data.format = this.format;
		data.data = this.arraybuffer;
	}
	else if(this.format === "base64")
	{
		data.format = "arraybuffer";
		data.data = ArraybufferUtils.fromBase64(Base64Utils.removeHeader(this.data));
	}
	else
	{
		data.format = this.format;
		data.data = this.data;
	}
	console.log("========data=========");


	meta.images[this.uuid] = data;
    console.log(meta);
	return data;
};