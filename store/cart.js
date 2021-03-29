

export const state = () => ({
    products: 3,

});

export const mutations = {
    setProducts(state, payload) {
        state.products = products;
    },
};

export const getters = {
    products: state => {
        return state.products
    }
}