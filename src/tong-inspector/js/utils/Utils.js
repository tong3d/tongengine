class Utils{
    static parseStringToDom(value){
        var objE = document.createElement("div");
        objE.innerHTML = value;
        return objE.childNodes;
    }
    
    static generateUUID(){
        function S4() {
            return (((1+Math.random())*0x10000)|0).toString(16).substring(1)
        }
        return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4())
    }
}

export default Utils