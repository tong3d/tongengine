<template>
  <div class="toolbar_container">
    <tong-toolbar :toolbars="toolbars"/>
  </div>
</template>
<script>
// import Inspector from './tong-inspector'
export default {
  data() {
      return {
          toolbars: {
            children: [
              // {
              //   action: 'menu',
              //   children: [{
              //       trigger: 'hover',
              //       type: 'el-image',
              //       src: 'https://tong3d.com/engine/css/pic/toolBar/logoMini.png'
              //     }
              //   ]
              // },
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
  }
}
</script>
<style lang="stylus" scoped>
.toolbar_container
  background-color #fff
</style>

