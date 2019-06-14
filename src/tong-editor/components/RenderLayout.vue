<template>
    <div ref="renderLayout" class="renderLayout">
        <RenderApp ref="renderScene"></RenderApp>
    </div>
</template>
<script>
import RenderApp from "../../tong-render/App";
export default {
    components:{
        RenderApp
    },
    mounted() {
        let bounding = this.$refs['renderLayout'].getBoundingClientRect()
        this.setSize(bounding.width,bounding.height)
    },
    methods:{
        setSize(width, height) {
            this.$refs['renderScene'].$children[0].setSize(width, height)
        }
    }
}
</script>
<style lang="stylus" scoped>
.renderLayout
    position absolute
    top 45px
    bottom 360px
    left 300px
    right 300px
    border-bottom 1px solid #EEE
    z-index 2
</style>

