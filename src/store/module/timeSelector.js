/*
    存储从app上获取的app信息（包括token、版本信息和设备号）
*/
const state = {
    getLocation: false
};
const mutations = {
    getAppInfo(state,param){
        state[param['name']] = param['value'];
    }
}
const actions = {
    getAppInfo: ({commit}, param) => {
        commit('getAppInfo',param);
    }
}
export default{
    namespaced: true,
    state,
    mutations,
    actions
}