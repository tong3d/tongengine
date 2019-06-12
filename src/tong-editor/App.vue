<template>
    <div>
        <tong-hierarchy-tabs :popupDatas="popupDatas" v-resize-right></tong-hierarchy-tabs>
        <tong-inspector-tabs :popupDatas="popupDatas" v-resize-left></tong-inspector-tabs>
        <tong-resource-tabs @t-resize="resourceResize" :popupDatas="popupDatas" v-resize-top="[{effect:'hierarchy-tabs',dir:'right'},{effect:'inspector-tabs',dir:'left'}]"></tong-resource-tabs>
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
        resourceResize(width, height) {
        }
    }
}
</script>
<style lang="stylus" scoped>

</style>
