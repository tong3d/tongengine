function extendClass( target, origin ){
    if(origin instanceof Function && !(target instanceof Function)){
        var originObj=new origin;
        for(var i in originObj) //copy class properties
        {

            target[i] = originObj[i];
        }
        return;
    }


    for(var i in origin) //copy class properties
    {
        if(target.hasOwnProperty(i))
            continue;
        target[i] = origin[i];
    }

    if(origin.prototype) //copy prototype properties
        for(var i in origin.prototype) //only enumerables
        {
            if(!origin.prototype.hasOwnProperty(i))
                continue;

            if(target.prototype.hasOwnProperty(i)) //avoid overwritting existing ones
                continue;

            //copy getters
            if(origin.prototype.__lookupGetter__(i))
                target.prototype.__defineGetter__(i, origin.prototype.__lookupGetter__(i));
            else
                target.prototype[i] = origin.prototype[i];

            //and setters
            if(origin.prototype.__lookupSetter__(i))
                target.prototype.__defineSetter__(i, origin.prototype.__lookupSetter__(i));
        }
}
var ExtendClass=extendClass;