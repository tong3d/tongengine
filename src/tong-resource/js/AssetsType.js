class AssetsType{
    static Folder={
        icon:'iconfont tong-iconfolder1',
        url:'https://tong3d.com/engine/imgs/misc/images/tong/%E5%8C%85%E6%96%87%E4%BB%B6.png',
        ext:['']
    }
    static FolderOpen={
        icon:'iconfont tong-iconwenjianjia-dakai',
        url:'https://tong3d.com/engine/imgs/misc/images/tong/%E5%8C%85%E6%96%87%E4%BB%B6.png',
        ext:['']
    }
    static Js={
        icon:'iconfont tong-iconjs',
        url:'https://tong3d.com/engine/imgs/misc/images/tong/%E8%84%9A%E6%9C%AC.png',
        ext:['js']
    }

    static Text={
        icon:'iconfont tong-iconTEXT',
        url:'https://tong3d.com/engine/imgs/misc/images/tong/%E6%96%87%E6%9C%AC.png',
        ext:['txt']
    }
    static Txt={
        icon:'iconfont tong-iconTEXT',
        ext:['txt']
    }
    static Glsl={
        icon:'iconfont tong-icons',
        url:'https://tong3d.com/engine/imgs/misc/images/tong/glsl.png',
        ext:['shader']
    }

    static Animation={
        icon:'iconfont tong-iconrunlog',
        url:'https://tong3d.com/engine/imgs/misc/images/tong/%E5%8A%A8%E7%94%BB.png',
        ext:['animation']
    }

    static Json={
        icon:'iconfont tong-iconjsongeshihua',
        url:'https://tong3d.com/engine/imgs/misc/images/tong/json%E6%96%87%E4%BB%B6.png',
        ext:['json']
    }

    static Audio={
        icon:'iconfont tong-iconaudio',
        url:'https://tong3d.com/engine/imgs/misc/images/tong/%E9%9F%B3%E9%A2%91.png',
        ext:['mp3','wav']
    }

    static Video={
        icon:'iconfont tong-iconshipin-',
        url:'https://tong3d.com/engine/imgs/misc/images/tong/%E8%A7%86%E9%A2%91.png',
        ext:['avi','mp4','mov','3gp','flv']
    }

    static Image={
        icon:'el-icon-picture-outline',
        ext:['png','jpg','jpeg','bmp']
    }
    static getTypeFromExt(ext){
        for(let key in AssetsType){
            let typeObj=AssetsType[key]
            if(typeObj.ext.indexOf(ext)!==-1){
                return key
            }
        }
        return null
    }
}
export default AssetsType