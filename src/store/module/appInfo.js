/*
    存储从app上获取的app信息（包括token、版本信息和设备号）
*/
import status from '@/common/json/config.json'
const obj = (()=>{
    var obj = {};
    switch (status.domain){
        case 'formal':
            obj['token'] = 'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiI0IiwiaWF0IjoxNTY5MjI3MDU2LCJzdWIiOiI0IiwiaXNzIjoidGFua2UiLCJleHAiOjE1NzE4MTkwNTZ9.VZ92w_G4bKXsaqGMEM6S1hdXEPKFJW-1VKwsIyZNEgI';
            break;
        case 'beta':
            obj['token'] = 'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIzIiwiaWF0IjoxNTcwNTE5ODc1LCJzdWIiOiIzIiwiaXNzIjoidGFua2UiLCJleHAiOjE1NzMxMTE4NzV9.FAtjku2ms3q_KVsdePffZmd4tFIF8nsdNUgPauc0rQo';
            break;
        case 'local':
            obj['token'] = 'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIzIiwiaWF0IjoxNTcwNTE5ODc1LCJzdWIiOiIzIiwiaXNzIjoidGFua2UiLCJleHAiOjE1NzMxMTE4NzV9.FAtjku2ms3q_KVsdePffZmd4tFIF8nsdNUgPauc0rQo';
            break;
    }
    obj['deviceName'] = 'iphone';
    obj['appVersion'] = '1.0.0';
    return obj;
})();
const state = {
    token: obj['token'],
    deviceName: obj['deviceName'],
    appVersion: obj['appVersion'],
    // token: false,
    // deviceName: false,
    // appVersion: false,
};
const mutations = {
    getAppInfo(state,param){
        state.token = param['token'];
        state.deviceName = param['device'];
        state.appVersion = param['version'];
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