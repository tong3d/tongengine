import Vue from 'vue'
import Vuex from 'vuex'
import hierarchy from './modules/Hierarchy'
import inspector from './modules/Inspector'
import render from './modules/Render'
import resource from './modules/Resource'
import toolbar from './modules/Toolbar'
Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    hierarchy,
    inspector,
    render,
    resource,
    toolbar
  }
})