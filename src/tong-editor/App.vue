<template>
    <div>
        <tong-hierarchy-tabs :popupDatas="popupDatas" v-resize-right></tong-hierarchy-tabs>
        <tong-inspector-tabs :popupDatas="popupDatas" v-resize-left></tong-inspector-tabs>
        <tong-resource-tabs :popupDatas="popupDatas" v-resize-top="[{effect:'hierarchy-tabs',dir:'right'},{effect:'inspector-tabs',dir:'left'}]"></tong-resource-tabs>
        <tong-toolbar-layout></tong-toolbar-layout>
    </div>
</template>
<script>
export default {
   props:{
        popupDatas:{
            type: Object,
            default() {
                return {
                    color:'#aaa',
                    children:[{
                        label:'Hierarchy',
                        icon:'',
                        disabled:false,
                        children:[]
                    },
                    {
                        label:'Inspector',
                        icon:'',
                        disabled:false,
                        children:[]
                    },
                    {
                        label:'Resource',
                        icon:'',
                        disabled:false,
                        children:[]
                    },
                    {
                        label:'Render',
                        icon:'',
                        disabled:false,
                        children:[]
                    }
                    ]
                }
            }
        }
   }
}
</script>
<style lang="stylus" scoped>

</style>
