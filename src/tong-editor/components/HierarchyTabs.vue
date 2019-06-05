<template>
    <div class='hierarchy-tabs'>
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
                    title: this.$t('Hierarchy'),
                    name: '1',
                    content: 'tong-hierarchy-app'
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
.hierarchy-tabs
    position absolute
    width 300px
    height 100%
    min-width 300px
    left 0px
    border-right 1px solid #EEE
</style>
