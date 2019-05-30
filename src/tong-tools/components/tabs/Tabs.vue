<template>
    <div>
        <tong-popup-menu ref="popupContext" @select="onPopupSelect" :data="popupDatas"></tong-popup-menu>
        <tong-el-tabs v-model="editableTabsValue" type="card" editable @edit="handleTabsEdit">
            <el-tab-pane
                :key="index"
                v-for="(item, index) in editableTabs"
                :label="item.title"
                :name="item.name"
            >
            <component :if='item.content && item.content.length>0' :is= 'item.content'></component>
            </el-tab-pane>
        </tong-el-tabs>
    </div>
</template>
<script>
export default {
    props: {
        editableTabs: {
            type: Array,
            default() {
                return []
            }
        },
        popupDatas:{
            type: Object,
            default() {
                return {
                    color:'#aaa',
                    children:[]
                }
            }
        }

    },
    data() {
        let tabIndex = this.editableTabs.length
        return {
            editableTabsValue: `${tabIndex}`,
            tabIndex
        }
    },
    methods: {
        // 右键菜单弹出选择事件
        onPopupSelect(data,itemCom){
            let selectItem=data.label
            let newTabName = ++this.tabIndex + '';
            this.editableTabs.push({
            title: selectItem,
            name: newTabName,
            content: `Tong${selectItem}App`
            });
            this.editableTabsValue = newTabName;
        },
        handleTabsEdit(eve, targetName, action) {
            if (action === 'add') {
                console.log (action)
                this.$refs.popupContext.open(eve.clientX - 1,eve.clientY - 1)
            }
            if (action === 'remove') {
                let tabs = this.editableTabs;
                let activeName = this.editableTabsValue;
                if (activeName === targetName) {
                tabs.forEach((tab, index) => {
                    if (tab.name === targetName) {
                    let nextTab = tabs[index + 1] || tabs[index - 1];
                    if (nextTab) {
                        activeName = nextTab.name;
                    }
                    }
                });
                }
                
                this.editableTabsValue = activeName;
                this.editableTabs = tabs.filter(tab => tab.name !== targetName);
            }
        }
    }
}
</script>
<style lang="stylus" scoped>
>>> .el-tabs__header
    padding: 0
    position: relative
    margin: 0 0 0px
</style>
