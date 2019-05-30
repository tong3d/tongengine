class Utils{
    static compareObjVal = (curr,target)=>{
        //取对象a和b的属性名
    
       var currProps = Object.getOwnPropertyNames(curr)
    
       var targetProps = Object.getOwnPropertyNames(target)
    
        //判断属性名的length是否一致
    
       if (currProps.length != targetProps.length) {
    
           return false;
    
       }
    
        //循环取出属性名，再判断属性值是否一致
    
       for (var i = 0; i < currProps.length; i++) {
           var propName = currProps[i];
           if (curr[propName] !== target[propName]) {
               return false;
           }
    
       }
    
       return true;
    }
    static lowercaseFirstLetter=string => {
        return string.charAt(0).toLowerCase() + string.slice(1);
    }
    static getAllPropertyNames=( obj )=>{
        var props = []
        do {
            props= props.concat(Object.getOwnPropertyNames( obj ))
        } while ( obj = Object.getPrototypeOf( obj ))
        return props;
    }

    static getWatcher = (vueCom,name)=>{
       return vueCom._watchers.filter(item=>{
            if(item.expression===name){
               return true   
            }
        })
    }

    static removeStrSpace = (str)=>{
        return str.replace(/\s+/g, "")
    }
}
export default Utils