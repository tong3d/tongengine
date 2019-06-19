<template>
    <div class="tong_tabs">
        <tong-popup-menu ref="popupContext" @select="onPopupSelect" :data="popupDatas"></tong-popup-menu>
        <tong-el-tabs v-model="editableTabsValue" class="tong_el_tabs" type="card" editable @edit="handleTabsEdit">
            <el-tab-pane
                class="tong_el_tab_pane"
                :key="index"
                v-for="(item, index) in editableTabs"
                :label="item.title"
                :name="item.name"
            >
            <component ref="targetComponent" class="tong_el_tab_component" :if='item.content && item.content.length>0' :is= 'item.content'></component>
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
        onPopupSelect(data, itemCom) {
            let selectItem=data.label
            let newTabName = ++this.tabIndex + ''
            this.editableTabs.push({
            title: selectItem,
            name: newTabName,
            content: `Tong${data.value}App`
            })
            this.editableTabsValue = newTabName
        },
        handleTabsEdit(eve, targetName, action) {
            if (action === 'add') {
                let bounding = eve.target.getBoundingClientRect()
                this.$refs.popupContext.open(bounding.left, bounding.top)
            }
            if (action === 'remove') {
                let tabs = this.editableTabs
                let activeName = this.editableTabsValue
                if (activeName === targetName) {
                tabs.forEach((tab, index) => {
                    if (tab.name === targetName) {
                    let nextTab = tabs[index + 1] || tabs[index - 1]
                    if (nextTab) {
                        activeName = nextTab.name
                    }
                    }
                })
                }
                this.editableTabsValue = activeName
                this.editableTabs = tabs.filter(tab => tab.name !== targetName)
            }
        }
    }
}
</script>
<style lang="stylus" scoped>
>>>.el-tabs__header
    padding: 0
    position: relative
    margin: 0 0 0px
>>>.el-tabs__content
    width 100%
    height calc(100% - 41px)
.tong_tabs
.tong_el_tabs
.tong_el_tab_pane
.tong_el_tab_component
    width 100%
    height 100%
</style>
