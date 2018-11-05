var RenderTexture=function(width, height, options){
    width=width?width:512;
    height=height?height:512;
    TONG.WebGLRenderTarget.call(this,width,height,options);
}
TONG.RenderTexture=RenderTexture;
TONG.RenderTexture.prototype=Object.create(TONG.WebGLRenderTarget.prototype);
TONG.RenderTexture.prototype.constructor=TONG.RenderTexture;
TONG.RenderTexture.prototype.isRenderTexture=true;
//TODO:是否是texture的形式赋值?主要针对Inspector编辑属性
TONG.RenderTexture.prototype.isApplyTexture=false;