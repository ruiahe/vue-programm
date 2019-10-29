/*
    存储从app上获取的app信息（包括token、版本信息和设备号）
*/
const state = {
    token: 'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIzIiwiaWF0IjoxNTcyMzIxNTI0LCJzdWIiOiIzIiwiaXNzIjoidGFua2UiLCJleHAiOjE1NzQ5MTM1MjR9.F48C_Z2HnffDMiZWF6aqqTZ1jsD6SZasvJr4rwZSfeU',
    deviceName: 'iphone',
    appVersion: '1.0.0',
    istest: true
    // token: false,
    // deviceName: false,
    // appVersion: false,
    // istest: true
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