<template>
    <div>
        <tong-toolbar-layout></tong-toolbar-layout>
        <tong-hierarchy-tabs :popupDatas="popupDatas" v-resize-right></tong-hierarchy-tabs>
        <tong-inspector-tabs :popupDatas="popupDatas" v-resize-left></tong-inspector-tabs>
        <tong-resource-tabs :popupDatas="popupDatas" v-resize-top="[{effect:'hierarchy-tabs',dir:'right'},{effect:'inspector-tabs',dir:'left'}]"></tong-resource-tabs>
        <tong-render-tabs :popupDatas="popupDatas" ref="render-tabs" @t-resize="renderResize" v-effect-resize="[{effect:'hierarchy-tabs',dir:'right'},{effect:'resource-tabs',dir:'top'},{effect:'inspector-tabs',dir:'left'}]"></tong-render-tabs>
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
            this.$refs['render-tabs'].setSize(width, height)
        }
    }
}
</script>
<style lang="stylus">
body 
  margin 0
  overflow hidden
</style>
