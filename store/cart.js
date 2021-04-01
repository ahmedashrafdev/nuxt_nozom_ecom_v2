import http from '~/utilities/http.js';

export const state = () => ({
    loading: false,
    createLoading: false,
    updateLoading: false,
    deleteLoading: false,
    couponLoading: false,
    checkoutLoading: false,
    cart: [],
    cartCount : null,
    orders: []
});

export const mutations = {
    setLoading(state, payload) {
        state.loading = payload;
    },
    setCreateLoading(state, payload) {
        state.createLoading = payload;
    },
    setUpdateLoading(state, payload) {
        state.updateLoading = payload;
    },
    setCouponLoading(state, payload) {
        state.couponLoading = payload;
    },
    setDeleteLoading(state, payload) {
        state.deleteLoading = payload;
    },
    setCart(state, payload) {
        state.cart = payload;
    },
    setCartCount(state, payload) {
        state.cartCount = payload;
    },
    setCheckoutLoading(state, payload) {
        state.checkoutLoading = payload;
    },
    setOrders(state, payload) {
        state.orders = payload;
    },
};

export const getters = {
    loading(state){
        return state.loading
    },
    cartCount(state){
        return state.cartCount
    },
    checkoutLoading(state){
        return state.checkoutLoading
    },
    couponLoading(state){
        return state.couponLoading
    },
    createLoading(state){
        return state.createLoading
    },
    updateLoading(state){
        return state.updateLoading
    },
    couponLoading(state){
        return state.updateLoading
    },
    deleteLoading(state){
        return state.deleteLoading
    },
    cart(state){
        return state.cart
    },
    orders(state){
        return state.orders
    },
    cartLength(state){
        const length = typeof state.cart.products !== 'undefined' ? state.cart.products.length : 0
        return length
    },
}
export const actions = {
    get({ commit }) {
        return new Promise((resolve, reject) => {
            http
            .get("cart")
            .then(res => {
                commit('setCart', res.data);
                commit('setCartCount', res.data.products.length);
                commit('setLoading', false);
                resolve(res);
            })
            .catch(e => {
                commit('setLoading', false);
                reject(e.response.data);
            })
        })
    },
    getOrders({ commit }) {
        return new Promise((resolve, reject) => {
            http
            .get(`user/orders`)
            .then(res => {
                commit('setOrders', res.data);
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
            .post("cart" , payload)
            .then(res => {
                dispatch('get');
                const snackbar = {
                    active : true,
                    text: 'added_to_cart_successfully'
                }
                commit('ui/setSnackbar' , snackbar , {root : true})
                commit('setCreateLoading', false);
                resolve(res);
            })
            .catch(e => {
                commit('setCreateLoading', false);
                reject(e);
            })
        })
    },
    update({ commit , dispatch }, payload) {
        commit('setUpdateLoading', true);
        return new Promise((resolve, reject) => {
            http
            .put(`cart/${payload.id}` , {qty : payload.qty})
            .then(res => {
                dispatch('get');
                commit('setUpdateLoading', false);
                resolve(res);
            })
            .catch(e => {
                commit('setUpdateLoading', false);
                reject(e.response.data);
            })
        })
    },
    applyCoupon({ commit , dispatch }, payload) {
        commit('setCouponLoading', true);
        return new Promise((resolve, reject) => {
            http
            .post("cart/coupon" , payload)
            .then(res => {
                dispatch('get');
                commit('setCouponLoading', false);
                resolve(res);
            })
            .catch(e => {
                commit('setCouponLoading', false);
                reject(e.response.data);
            })
        })
    },
    remove({commit , dispatch} , payload) {
        commit('setDeleteLoading', true);
        return new Promise((resolve, reject) => {
            http
            .delete(`cart/${payload}`)
            .then(res => {
                dispatch('get');
                commit('setDeleteLoading', false);
                const snackbar = {
                    active : true,
                    text: 'added_to_cart_successfully'
                }
                commit('ui/setSnackbar' , snackbar , {root : true})
                resolve(res);
            })
            .catch(e => {
                commit('setDeleteLoading', false);
                reject(e.response.data);
            })
        })     
    },
    checkout({ commit , dispatch }) {
        commit('setCheckoutLoading', true);
        return new Promise((resolve, reject) => {
            http
            .post("cart/checkout")
            .then(res => {
                dispatch('get');
                commit('setCheckoutLoading', false);
                resolve(res);
            })
            .catch(e => {
                commit('setCheckoutLoading', false);
                reject(e.response.data);
            })
        })
    },
    applyAddress({ dispatch }, payload) {
        return new Promise((resolve, reject) => {
            http
            .put(`cart/address/${payload}`)
            .then(res => {
                dispatch('get');
                resolve(res);
            })
            .catch(e => {
                reject(e.response.data);
            })
        })
    },
   
}
