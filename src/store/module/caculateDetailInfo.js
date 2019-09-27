/*
    房贷计算器计算出的信息（提供给详情页使用）
*/
const state = {
    info: null,
};
const mutations = {
    getCaculateInfo(state,param){
        state.info = param;
    }
}
const actions = {
    getCaculateInfo: ({commit}, param) => {
        commit('getCaculateInfo',param);
    }
}
export default{
    namespaced: true,
    state,
    mutations,
    actions
}