<template>
    <div class="tong-popup-root">
        <el-menu
            :default-active="activeIndex"
            menu-trigger="hover"
            class="tong-popup-list"
            mode="horizontal"
            ref="popupListMenu"
            @select="handleSelect"
            :unique-opened="true"
            >
            <el-submenu ref="tongPopupEle" class="tong-popup-menu"  :index="activeIndex">
                <div  v-for="(item,index) in data.children" :key="index">
                    <tong-popup-sub-menu :item="item"></tong-popup-sub-menu>
                </div>
            </el-submenu>
        </el-menu>
    </div>
</template>
<script>
export default {
    props:{
        data:{
            type:Object,
            default(){
                return {}
            }
        }
    },
    data(){
        return {
            activeIndex:"tong-popup-menu",
            popupEle:null
        }
    },
    methods: {
        handleSelect(key, keyPath,itemCom) {
           let data=itemCom.$parent.item
           this.$emit('select',data,itemCom)
        },
        open(left,top){
            this.$refs.popupListMenu.$el.style.left=`${left || 0}px`
            this.$refs.popupListMenu.$el.style.top=`${top || 0}px`
            this.$refs.popupListMenu.open(this.activeIndex)
        }
    },
    mounted(){
        this.popupEle=this.$refs.tongPopupEle.popperElm
    }
        
    
}
</script>
<style lang="stylus" scoped>
>>> .el-menu--horizontal>.el-submenu
    .el-submenu__title
        height: 0px;
        line-height: 0px;
        border-bottom: 0px solid transparent;
.tong-popup-list
    position absolute
    visibility hidden
    left 0px
>>> .el-submenu__title
        font-size 12px
        height: 30px
        line-height: 30px
>>> .el-menu-item
        font-size 12px
        height: 30px
        line-height: 30px
</style>
