/*
    存储从app上获取的app信息（包括token、版本信息和设备号）
*/
const state = {
    // token: 'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIzIiwiaWF0IjoxNTcwNTE5ODc1LCJzdWIiOiIzIiwiaXNzIjoidGFua2UiLCJleHAiOjE1NzMxMTE4NzV9.FAtjku2ms3q_KVsdePffZmd4tFIF8nsdNUgPauc0rQo',
    // deviceName: 'iphone',
    // appVersion: '1.0.0',
    // istest: true
    token: false,
    deviceName: false,
    appVersion: false,
    istest: true
};
const mutations = {
    getAppInfo(state,param){
        state.token = param['token'];
        state.deviceName = param['device'];
        state.appVersion = param['version'];
        state.istest = param['istest'] == undefined ? false : param['istest'];
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