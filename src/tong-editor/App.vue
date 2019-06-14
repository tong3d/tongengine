<template>
    <div>
        <tong-hierarchy-tabs :popupDatas="popupDatas" v-resize-right></tong-hierarchy-tabs>
        <tong-inspector-tabs :popupDatas="popupDatas" v-resize-left></tong-inspector-tabs>
        <tong-resource-tabs :popupDatas="popupDatas" v-resize-top="[{effect:'hierarchy-tabs',dir:'right'},{effect:'inspector-tabs',dir:'left'}]"></tong-resource-tabs>
        <tong-render-layout ref="render-layout" @t-resize="renderResize" v-effect-resize="[{effect:'hierarchy-tabs',dir:'right'},{effect:'resource-tabs',dir:'top'},{effect:'inspector-tabs',dir:'left'}]"></tong-render-layout>
        <tong-toolbar-layout></tong-toolbar-layout>
    </div>
</template>
<script>
let a = 0
export default {
   props:{
        popupDatas:{
            type: Object,
            default() {
                return {
                    color:'#aaa',
                    children:[{
                        label:this.$t('Hierarchy'),
                        value:'Hierarchy',
                        icon:'',
                        disabled:false,
                        children:[]
                    },
                    {
                        label:this.$t('Inspector'),
                        value:'Inspector',
                        icon:'',
                        disabled:false,
                        children:[]
                    },
                    {
                        label:this.$t('Resource'),
                        value:'Resource',
                        icon:'',
                        disabled:false,
                        children:[]
                    },
                    {
                        label:this.$t('Scene'),
                        value:'Scene',
                        icon:'',
                        disabled:false,
                        children:[]
                    }
                    ]
                }
            }
        }
    },
    methods: {
        renderResize(width, height) {
            console.log(this.$refs['render-layout'].$el.getBoundingClientRect())
            this.$refs['render-layout'].setSize(width, height)
        }
    }
}
</script>
<style lang="stylus">
body 
  margin 0
  overflow hidden
</style>
