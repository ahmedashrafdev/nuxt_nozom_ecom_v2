import http from '~/utilities/http.js';

export const state = () => ({
    loading: false,
    groups: [],
});

export const mutations = {
    loading(state, payload) {
        state.loading = payload;
    },
    groups(state, payload) {
        state.groups = payload;
    }
};

export const getters = {
    loading(state){
        return state.loading
    },
    groups(state){
        return state.groups
    },
}
export const actions = {
    get({ commit }) {
            commit('loading', true);
            return new Promise((resolve, reject) => {
            http
            .get("group/list")
            .then(res => {
                commit('groups', res.data);
                commit('loading', false);
                resolve(res);
            })
            .catch(e => {
                commit('loading', false);
                reject(e.response.data);
            })
        })
    },
}
