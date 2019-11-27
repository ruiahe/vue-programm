import Vue from 'vue'
import Vuex from 'vuex'
import appInfo from './module/appInfo'
import caculateInfo from './module/caculateDetailInfo'
import caculateTax from './module/caculateTax'
import timeSelector from './module/timeSelector'

Vue.use(Vuex)

export default new Vuex.Store({
    modules:{
        appInfo,
        caculateInfo,
        caculateTax,
        timeSelector
    }
})
