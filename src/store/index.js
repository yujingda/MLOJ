import Vue from'vue'
import Vuex from 'vuex'
//不加./就会被当成插件
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex);

const state = {
    username:'',
    cartCount:0,
    is_admin:0
}
export default new Vuex.Store({
    state,
    mutations,
    actions
})