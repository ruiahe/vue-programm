/*
    计算个税
*/
const state = {
    special: 0,
    result: {}
};
const mutations = {
    getCaculateInfo(state,param){
        state.special = param;
    },
    getResult(state, param){
        state.result = param;
        console.log('-------------------')
    }
}
const actions = {
    getCaculateInfo: ({commit}, param) => {
        commit('getCaculateInfo',param);
    },
    getResult: ({commit}, param) => {
        commit('getResult',param);
    }
}
export default{
    namespaced: true,
    state,
    mutations,
    actions
}