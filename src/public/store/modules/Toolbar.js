const state = {
    toolbars: {
        children: [
          {
            action: 'menu',
            children: [{
                trigger: 'hover',
                type: 'tong-image',
                left: 0,
                top: 42,
                value: {
                  color:'#aaa',
                  children:[{
                      label:this.$t('File'),
                      value:'File',
                      icon:'',
                      disabled:false,
                      children:[]
                  },
                  {
                      label:this.$t('Edit'),
                      value:'Edit',
                      icon:'',
                      disabled:false,
                      children:[]
                  },
                  {
                      label:this.$t('Add'),
                      value:'Add',
                      icon:'',
                      disabled:false,
                      children:[]
                  },
                  {
                      label:this.$t('Play'),
                      value:'Play',
                      icon:'',
                      disabled:false,
                      children:[]
                  }
                  ]
            },
                src: 'https://tong3d.com/engine/css/pic/toolBar/logoMini.png'
              }
            ]
          },
          {
            action: 'radio',
            children: [
              {
                value: true,
                icon: 'iconfont tong-icon1'
              },
              {
                icon: 'iconfont tong-iconxuanzhuan'
              },
              {
                icon: 'iconfont tong-iconsuofang'
              },
              {
                icon: 'iconfont tong-iconhand'
              }
            ]
          },
          {
            action: 'check',
            children: [
              {
                value: true,
                icon: 'iconfont tong-iconearth'
              }
            ]
          },
          {
          children: [
              {
                type: 'el-select',
                value: {},
                placeholder: `${this.$t('Help')}...?`,
                icon: 'iconfont tong-iconearth'
              }
            ]
          },
          {
            action: 'check',
            children: [
              {
                value: false,
                icon: 'iconfont tong-iconquanping'
              }
            ]
          },
          {
            action: 'check',
            children: [
              {
                value: false,
                icon: 'iconfont tong-iconcitie-weidianji'
              }
            ]
          },
          {
            action: 'check',
            children: [
              {
                value: true,
                icon: 'iconfont tong-iconplay'
              }
            ]
          },
          // {
          //   action: 'check',
          //   children: [
          //     {
          //       value: true,
          //       icon: 'iconfont tong-iconplay',
          //       align: 'right'
          //     }
          //   ]
          // }
        ]
    }
}
const getters = {
    toolbars(state) {
        return state.toolbars
    }
}
const actions = {

}
const mutations = {
    
}
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}