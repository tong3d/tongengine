<template>
    <div class="resource-tabs">
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
                    title: this.$t('Resource'),
                    name: '1',
                    content: 'tong-resource-app'
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
.resource-tabs
    position absolute
    left 300px
    right 300px
    height 360px
    bottom 0px
    min-height 300px
    border-top 1px solid #EEE
</style>

