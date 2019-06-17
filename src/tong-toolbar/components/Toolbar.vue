<template>
    <div>
        <el-button-group v-for="(item,i) in toolbars.children" :key="i">
            <component v-for="(cItem,j) in item.children" :icon="cItem.icon" 
            v-model="cItem.value"
            v-bind="cItem.type==='el-select'?select_data:{}"
            :placeholder="cItem.placeholder"
            :size="toolbars.size" :src="cItem.src" :is="initItem(cItem)" @click="clickItem(cItem,item)" :type="cItem.value?'primary':''" :key="j">
                <div v-if="cItem.type==='el-select'">
                    <el-option
                    v-for="item in cItem.value"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </div>
            </component>
        </el-button-group>
    </div>
</template>
<script>
let currId=0
export default {
    props:{
        toolbars:{
            type:Object,
            default(){
                return {
                    children:[]
                    }
            }
        }
    },
    data(){
        return {
            select_data:{
                'prefix-icon':"el-icon-search",
                multiple:true,
                filterable:true,
                remote:true,
                'reserve-keyword':true
            }
        }
    },
    methods:{
        initItem(item) {
            item.id=item.id || currId++
            this.$set(item, 'value', item.value || false)
            item.type=item.type || 'el-button'
            return item.type
        },
        loading() {},
        remoteMethod() {},
        clickItem(currItem, itemList) {
            switch(itemList.action) {
                case 'radio':
                    currItem.value = true
                    itemList.children.forEach((item) => {
                        if(item !== currItem) {
                            item.value = false
                        }
                    })
                    this.$emit('clicked', currItem, itemList)
                    break
                case 'check':
                    currItem.value = !currItem.value
                    this.$emit('clicked', currItem, itemList)
                    break
            }
        }
    },
    beforeCreate() {
        const iconUrl = '//at.alicdn.com/t/font_1059974_b2uwfq52son.css'
        function isHasIcon() {
            let eles=document.getElementsByTagName('link')
            for(let i = 0; i<eles.length; i++) {
                if(eles[i].getAttribute('href') === iconUrl) {
                    return true
                }
            }
            return false
        }
       if(!isHasIcon()){
            let linkEle= document.createElement('link')
            linkEle.setAttribute('rel', 'stylesheet')
            linkEle.setAttribute('href', iconUrl)
            linkEle.setAttribute('type', 'text/css')
            document.head.appendChild(linkEle)
       }
    }
}
</script>
<style lang="stylus" scoped>
>>> .el-button
    border-radius: 0px
>>> .el-input__inner
    border-radius: 0px
    height: 42px
>>> .el-button-group>.el-button:first-child:last-child
    border-radius: 0px
</style>

