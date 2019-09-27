import Vue from 'vue'
import Vuex from 'vuex'
import appInfo from './module/appInfo'
import caculateInfo from './module/caculateDetailInfo'

Vue.use(Vuex)

export default new Vuex.Store({
    modules:{
        appInfo,
        caculateInfo
    }
})
