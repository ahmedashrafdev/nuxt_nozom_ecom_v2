import http from '~/utilities/http.js';


export const state = () => ({
    loading: false,
    createLoading: false,
    deleteLoading: false,
    wishlist: []
});

export const mutations = {
    setLoading(state, payload) {
        state.loading = payload;
    },
    setCreateLoading(state, payload) {
        state.createLoading = payload;
    },
    setDeleteLoading(state, payload) {
        state.deleteLoading = payload;
    },
    setWishlist(state, payload) {
        state.wishlist = payload;
    },
};

export const getters = {
    loading(state){
        return state.loading
    },
    createLoading(state){
        return state.createLoading
    },
    deleteLoading(state){
        return state.deleteLoading
    },
    wishlist(state){
        return state.wishlist
    },
    wishlistLength(state){
        return state.wishlist.length
    },
}
export const actions = {
    get({ commit }) {
        return new Promise((resolve, reject) => {
            http
            .get("wishlist")
            .then(res => {
                if(res.data == 'no items'){
                    commit('setWishlist', []);
                } else {
                    commit('setWishlist', res.data);
                }
                commit('setLoading', false);
                resolve(res);
            })
            .catch(e => {
                commit('setLoading', false);
                reject(e.response.data);
            })
        })
    },
    create({ commit , dispatch }, payload) {
        commit('setCreateLoading', true);
        return new Promise((resolve, reject) => {
            http
            .post("wishlist" , payload)
            .then(res => {
                dispatch('get');
                commit('setCreateLoading', false);
                const snackbar = {
                    active : true,
                    text: 'added_to_wishlist_successfully'
                }
                commit('ui/setSnackbar' , snackbar , {root : true})
                resolve(res);
            })
            .catch(e => {
                commit('setCreateLoading', false);
                reject(e);
            })
        })
    },
    remove({commit , dispatch} , payload) {
        commit('deleteLoading', true);
        return new Promise((resolve, reject) => {
            http
            .delete(`wishlist/${payload}`)
            .then(res => {
                dispatch('get');
                commit('deleteLoading', false);
                resolve(res);
            })
            .catch(e => {
                commit('deleteLoading', false);
                reject(e.response.data);
            })
        })     
    }
   
}
