import Vue from 'vue'
//import Vuex from "vuex";
//Vue.config.productionTip = false
import TongEditor from "./tong-editor"
import TongEngine from "./tong-render"
import Tools from "./tong-tools"
import Inspector from './tong-inspector'
import Resource from "./tong-resource"
import Hierarchy from "./tong-hierarchy"
import Toolbar from "./tong-toolbar"
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import './element-#313131/index.css'
import i18n from './assets/i18n'
import App from './tong-editor/App.vue'
Vue.use(TongEditor)
Vue.use(TongEngine)
Vue.use(Element,{
  i18n: (key, value) => i18n.t(key, value)
})
Vue.use(Inspector)
Vue.use(Resource)
Vue.use(Tools)
Vue.use(Hierarchy)
Vue.use(Toolbar)

new Vue({
  i18n,
  render: h => h(App),
}).$mount('#app')
