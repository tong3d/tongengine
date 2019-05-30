<template>
    <div>
        <video ref="videoContext" class="file-video" :src="item.url || url" />
        <i @click="videoPlay" class="playbtn iconfont" :class="isPlay?'tong-iconpause':'tong-iconshipin-'"></i>
		<div class="label">{{ item.label }}</div>
    </div>
</template>
<script>
import AssetsType from "../js/AssetsType";
export default {
    props:{
        item:{
            type:Object,
            default(){
                return {}
            }
        }
    },
    data(){
        return {
            url:AssetsType.Video.url,
            isPlay:false
        }
    },
    methods:{
        videoPlay(){
            let videoEle=this.$refs.videoContext
            this.isPlay?videoEle.pause():videoEle.play()
            this.isPlay=!this.isPlay
        }
    }
}
</script>
<style scoped lang="stylus">
.file-video
    width 90px
    height 89px
.playbtn
    position: absolute;
    left: 41px;
    top: 41px;
    color: white;
</style>

