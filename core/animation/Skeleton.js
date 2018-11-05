//write by XiangkuiZheng

Object.defineProperty( TONG.Skeleton.prototype, 'uuid', {
    set: function( uuid )
    {
        if(!uuid)
            return;

        if(uuid == this._uuid)
            return;
        //if( this._root && this._root._components_by_uid[ this.uid ] )
        //	delete this._root && this._root._components_by_uid[ this.uid ];
        this._uuid = uuid;
        //if( this._root )
        //	this._root && this._root._components_by_uid[ this.uid ] = this;
    },
    get: function(){
        this._uuid=this._uuid?this._uuid:TONG.Math.generateUUID();
        return this._uuid;
    },
    enumerable: false //uid better not be enumerable (so it doesnt show in the editor)
});

/**
 * Serialize skeleton to json.
 *
 * @method toJSON
 * @param {Object} meta Meta.
 * @return {Object} Serialized data.
 */
TONG.Skeleton.prototype.toJSON = function()
{
	var data = {};

	var bones = [];
	var boneInverses = [];

	for(var i = 0, il = this.bones.length; i < il; i++)
	{
		bones.push(this.bones[i].uuid);
	}

	for(var i = 0, il = this.boneInverses.length; i < il; i++)
	{
		boneInverses.push(this.boneInverses[i].toArray());
	}

	data.uuid = this.uuid;
	data.bones = bones;
	data.boneInverses = boneInverses;

	return data;
};