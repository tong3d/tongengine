<template>
    <div class="tongTree">
        <el-input
            class="tongTreeSearch"
            size='mini'
            :placeholder="`${$t('Search')}...`"
            v-model="filterText"
            >
        </el-input>
        <el-tree
            :data="trees.children"
            node-key="id"
            ref="tongTree"
            :highlight-current="true"
            :render-after-expand="false"
            @node-click="clickAssetFolder"
            :expand-on-click-node="false"
            :filter-node-method="onFilterNode"
            @node-drag-start="handleDragStart"
            @node-drag-enter="handleDragEnter"
            @node-drag-leave="handleDragLeave"
            @node-drag-over="handleDragOver"
            @node-drag-end="handleDragEnd"
            @node-drop="handleDrop"
            @node-contextmenu="rightContext"
            :render-content="onRenderContent"
            @node-expand="onNodeExpand"
            @node-collapse="onNodeCollapse"
            draggable
            :allow-drop="onAllowDrop"
            :allow-drag="onAllowDrag">
        </el-tree>
    </div>
</template>
<script>
let currId=0
export default {
    props:{
        trees:{
            type:Object,
            default(){
                return {}
            }
        },
        filterNode:Function,
        renderContent:Function,
        nodeCollapse:Function,
        nodeExpand:Function,
        allowDrop:Function,
        allowDrag:Function
    },
    data(){
        return {
            filterText: '',
            tree:null
        }
    },
    watch: {
        filterText(val) {
            this.tree.filter(val)
        }
    },
    mounted(){
        this.tree=this.$refs.tongTree
    },
    methods: {
        //根据id进行节点点击,由于setCurrentKey没效果，重新封装
        clickFromId(id){
            function traverseNodeClick(children){
                for(let i=0;i<children.length;i++){
                    if(children[i].node.data.id===id){
                        return children[i].handleClick()
                    }
                    if(children[i].$children){
                        traverseNodeClick(children[i].$children)
                    }
                }
            }
            traverseNodeClick(this.tree.$children)
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
        onFilterNode(value, data) {
            if(this.filterNode instanceof Function && this.filterNode(value,data)===false){
                return false
            }
            if (!value ) return true;
            return data.label.indexOf(value) !== -1
        },
        onRenderContent(h, { node, data }){
            //parent数据赋值与当前数据,可以更容易的知道父子级数据关系
            data.parent=node.parent.data
            //把assetsTree渲染的node赋予data
            data.node=node
            //赋值nodecomponent
            //data.nodeCom=this.$refs.assetsTree
            !data.id && currId++
            data.id=data.id || currId
            this.renderContent instanceof Function && this.renderContent(h, { node, data })
            //是否允许拖拽，默认为true
            data.allowDrag=data.allowDrag===undefined?true:data.allowDrag
            //设置默认icon
            let iconEle=(<i id='icon' class={data.icon} ></i>)
            let iconDiv=(
                <span>
                {iconEle}
                <span> </span>
                <span>{node.label}</span>
                </span>
                );
            node.iconEle=iconEle
            node.allowDrag=data.allowDrag
            return iconDiv
        },
        onNodeExpand(data,node){
           this.nodeExpand instanceof Function && this.nodeExpand(data,node)
        },
        onNodeCollapse(data,node){
           this.nodeCollapse instanceof Function && this.nodeCollapse(data,node)
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
        onAllowDrop(draggingNode, dropNode) {
            if(this.allowDrop instanceof Function && this.allowDrop(draggingNode,dropNode)===false){
                return false
            }
            if(!this.isOutterDrag && dropNode.level===1){
                return false
            }
            return true
        },
        onAllowDrag(draggingNode) {
            if(this.allowDrag instanceof Function && this.allowDrag(draggingNode)===false){
                return false
            }
            return draggingNode.allowDrag
        }
    }
}
</script>
<style lang='stylus' scoped>
.tongTree
    .tongTreeSearch
        input
            border-radius: 0px
    >>> .el-tree-node__content
        font-size 12.5px
    >>> .el-tree__empty-text
        font-size 13px
</style>