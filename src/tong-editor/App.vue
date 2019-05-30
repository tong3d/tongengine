<template>
    <div>
        <tong-hierarchy-tabs :popupDatas="popupDatas"></tong-hierarchy-tabs>
        <tong-inspector-tabs :popupDatas="popupDatas"></tong-inspector-tabs>
        <tong-resource-tabs :popupDatas="popupDatas"></tong-resource-tabs>
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
