<template>
    <div>
        <audio ref="audioContext" class="file-audio" :src="item.url || url" />
        <img :src="url">
        <i @click="audioPlay" class="playbtn iconfont" :class="isPlay?'tong-iconpause':'tong-iconshipin-'"></i>
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
            url:AssetsType.Audio.url,
            isPlay:false
        }
    },
    methods:{
        audioPlay(){
            let audioEle=this.$refs.audioContext
            this.isPlay?audioEle.pause():audioEle.play()
            this.isPlay=!this.isPlay
        }
    }
}
</script>
<style scoped lang="stylus">
.playbtn
    position: absolute;
    left: 40px;
    top: 40px;
    color: white;
</style>

