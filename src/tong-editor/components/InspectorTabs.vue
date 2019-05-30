<template>
    <div class="inspector-tabs" v-resize-left>
       <tong-tabs :popupDatas="popupDatas" :editableTabs='editableTabs'></tong-tabs>
    </div>
</template>
<script>
export default {
    props: {
        editableTabs: {
            type: Array,
            default() {
                return [{
                    title: this.$t('Inspector'),
                    name: '1',
                    content: 'tong-inspector-app'
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
.inspector-tabs
    position absolute
    right 0px
    width 300px
    height 100%
    border-left 1px solid #EEE
</style>
