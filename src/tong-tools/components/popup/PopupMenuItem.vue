<template>
    <div class="menu-sub-popup">
       
        <component :disabled="!item.disabled?false:true" :is="type" :index="currId"><template slot="title"> <i size="mini" :class="item.icon || ''"></i>{{ " "+item.label}}</template><div class="menu-sub-popup" v-for="(subItem,index) in item.children" :key="index"><tong-popup-sub-menu :item="subItem"></tong-popup-sub-menu></div></component> 
    </div>
</template>
<script>
let currId=0
export default {
    
    props:{
        item:Object
    },
    data(){
        return {
            type:'el-menu-item',
            currId:''
        }
    },
    
    created(){
        currId+=1
        this.currId=`${currId}`
        if(this.item.children && this.item.children.length>0){
            this.type="el-submenu"
        }else{
            this.type="el-menu-item"
        }
    },

}
</script>
<style scoped lang="stylus">
.menu-sub-popup
    >>> .el-menu--horizontal
        margin-top -5px
</style>

