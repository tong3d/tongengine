<template>
    <div>
        <tong-tree ref="assetsTree" @rightContext="rightContext" 
        @click="clickAssetFolder" :filterNode="filterNode" :renderContent="renderContent"
        :nodeExpand="nodeExpand"
        :nodeCollapse="nodeCollapse"
        :allowDrop="allowDrop"
        :trees="resources" >
        </tong-tree>
    </div>
</template>
<script>
import AssetsType from "../js/AssetsType"
import AssetsUtils from "../js/AssetsUtils"
export default {
    props:{
        resources:{
            type:Object,
            default(){
                return {}
            }
        }
    },
    mounted(){
        this.tree=this.$refs.assetsTree
        this.clickFromId(1)
    },
    methods: {
        //根据id进行节点点击,由于setCurrentKey没效果，重新封装
        clickFromId(id){
            this.$refs.assetsTree.clickFromId(id)
        },
        //根据节点对象进行节点点击,由于setCurrentNode没效果，重新封装
        clickFromNode(node){
            this.clickFromId(node.data.id)
        },
        //根据节点对象数据进行节点点击
        clickFromData(data){
            this.clickFromId(data.id)
        },
        //右键菜单
        rightContext(event,data,node,nodeCom){
            this.$emit('rightContext',event,data,node,nodeCom)
        },
        //点击文件夹
        clickAssetFolder(data,node,nodeCom){
            this.$emit('click',data,node,nodeCom)
        },
        //搜索节点
        filterNode(value, data) {
            if(this.resources.onlyRenderFolder && data.type!=='folder') return false
        },
        renderContent(h, { node, data }){
            // 默认配置类型为folder,通过set方式让type的改变可以随时被监视
            this.$set(data,'type',data.type || 'folder')
            //当前文件在服务端的状态:1未上传,2正在上传，3已上传，-1上传错误
            this.$set(data,'status',data.status || 3)
            //上传的进度，默认为0
            this.$set(data,'progress',data.progress || 0)
            // 类型首字母大写
            let typeKey = AssetsUtils.ToFirstUpperCase(data.type)
            if(this.resources.onlyRenderFolder && typeKey!=='Folder'){
                node.visible=false
                //console.log(node)
                return
            }
            //默认的文件/文件夹图标
            let icon= AssetsType[typeKey].icon
            node.assetType=data.type
            //默认的打开文件夹图标
            let openIcon=AssetsType['FolderOpen'].icon
            if(data.isOpen && typeKey==='Folder' && node.childNodes.length!==0){
                node.expanded=true
                icon=openIcon
                
            }
            //针对拖拽后，对默认文件夹的图标进行更改
            else if(typeKey==='Folder' && node.childNodes.length===0 && data.icon===openIcon){
                node.expanded=false
                data.isOpen=false
                data.icon=icon
                node.iconEle?node.iconEle.elm.className=icon:0
            }
            data.icon=data.icon || icon
        },
        nodeExpand(data,node){
            //首字母大写
            let typeKey = AssetsUtils.ToFirstUpperCase(data.type)
            if(data.type.toLowerCase()==='folder' 
            && data.icon===AssetsType[typeKey].icon){
                data.isOpen=true
                data.icon=AssetsType['FolderOpen'].icon
                node.iconEle.elm.className=data.icon
            }
        },
        nodeCollapse(data,node){
            let currType=AssetsUtils.ToFirstUpperCase(data.type)
            if(currType==='Folder' 
            && data.icon===AssetsType['FolderOpen'].icon){
                data.isOpen=false
                data.icon=AssetsType[currType].icon
                node.iconEle.elm.className=data.icon
            }
        }
        ,
        handleDragStart(node, ev) {
           
        },
        handleDragEnter(draggingNode, dropNode, ev) {
           
        },
        handleDragLeave(draggingNode, dropNode, ev) {
            
        },
        handleDragOver(draggingNode, dropNode, ev) {
            
        },
        handleDragEnd(draggingNode, dropNode, dropType, ev) {
           
        },
        handleDrop(draggingNode, dropNode, dropType, ev) {
            
        }
        ,
        allowDrop(draggingNode, dropNode) {
            let typeKey = AssetsUtils.ToFirstUpperCase(dropNode.assetType)
            if(typeKey!=='Folder'){
                return false
            }
            
        },
        allowDrag(draggingNode) {
            
        }
    }
}
</script>
<style lang='stylus' scoped>
</style>

