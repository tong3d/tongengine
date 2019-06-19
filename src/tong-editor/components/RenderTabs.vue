<template>
    <div ref="renderLayout" class="renderLayout">
        <tong-tabs ref="renderScene" :popupDatas="popupDatas" :editableTabs='editableTabs'></tong-tabs>
    </div>
</template>
<script>
export default {
    mounted() {
        let bounding = this.$refs['renderLayout'].getBoundingClientRect()
        this.setSize(bounding.width,bounding.height)
    },
    methods: {
        setSize(width, height) {
            this.$refs['renderScene'].$refs['targetComponent'][0].$children[0].setSize(width, height)
        }
    },
    props: {
        editableTabs: {
            type: Array,
            default() {
                return [{
                    title: this.$t('Scene'),
                    name: '1',
                    content: 'tong-render-app'
                }]
            }
        },
        popupDatas:{
            type: Object,
            default() {
                return {
                    color:'#aaa',
                    children:[]
                }
            }
        }
    }
}
</script>
<style lang="stylus" scoped>
.renderLayout
    position absolute
    top 42px
    bottom 360px
    left 300px
    right 300px
    border-bottom 1px solid #EEE
    z-index 2
</style>

