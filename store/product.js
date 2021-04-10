import http , {serializeQuery} from '~/utilities/http.js';


export const state = () => ({
  products: [],
  product: {},
  homeProducts:[],
  filters:{
    price : [],
    group: {
      id : null,
      name : null,
    },
  },
  homeLoading: false,
  loading: false,
});

export const mutations = {
  setProducts(state, payload) {
      state.products = payload;
  },

  filters(state, payload){
    state.filters = payload
  },
  filtersGroup(state, payload){
    state.filters = {
      price : [],
      group: {
        id : null,
        name : null,
      },
    }
  },
  filtersPrice(state, payload){
    state.filters = {
      price : [],
      group: {
        id : null,
        name : null,
      },
    }
  },
  
  homeProducts(state, payload) {
      state.homeProducts = payload;
  },
  homeLoading(state, payload) {
      state.homeLoading = payload;
  },
  updateProductAfterCartUpdated(state , payload){
    if(state.homeProducts){
      const product = state.homeProducts.filter(item => {
        return item.id === payload.id ? item : ''
      })[0]
     product ? product.cartQty = payload.qty : ''
    }
    if(state.products.data){
    const homeProduct = state.products.data.filter(item => {
      return item.id === payload.id ? item : ''
    })[0]
    homeProduct ? homeProduct.cartQty = payload.qty : ''
    }
  },
  setProduct(state, payload) {
    state.product = payload;
},
  setLoading(state, payload) {
    state.loading = payload;
  }
};
export const getters = {
  products: state => {
      return state.products
  },
  filters: state => {
    return state.filters
  },

  filtersParams: state => {
    let params = {}
    if(state.filters.price[0]){
      params.priceFrom = state.filters.price[0]
      params.priceTo = state.filters.price[1]
    }
    if(state.filters.group.id !== null){
      params.group = state.filters.group.id
    }
    return params
  },
  product: state => {
    return state.product
  },
  homeProducts: state => {
    return state.homeProducts
  },
  homeLoading: state => {
    return state.homeLoading
  },
  loading: state => {
      return state.loading
  }
}
export const actions = {
  
  getHomeProducts({commit}, payload) {
    return new Promise((resolve, reject) => {
        commit('homeLoading' , true)
        http
        .get(`product/home/${payload}`)
        .then( async (data) => {
          commit('homeProducts' , data.data)
          commit('homeLoading' , false)
          resolve(data.data);
        })
        .catch(e => {
          commit('homeLoading' , false)
          reject(e.response.data);
        })
      })
    },
    getProducts({commit}, payload) {
      return new Promise((resolve, reject) => {
          commit('setLoading' , true)
          http
          .get(`product?${serializeQuery(payload)}`)
          .then( async (data) => {
            commit('setProducts' , data.data)
            commit('setLoading' , false)
            resolve(data.data);
          })
          .catch(e => {
            commit('setLoading' , false)
            reject(e.response.data);
          })
        })
    },
    getProduct({commit}, payload) {
      return new Promise((resolve, reject) => {
          commit('setLoading' , true)
          http
          .get(`product/find/${payload}`)
          .then( async (data) => {
            commit('setProduct' , data.data)
            commit('setLoading' , false)
            resolve(data.data);
          })
          .catch(e => {
            commit('setLoading' , false)
            reject(e.response.data);
          })
        })
  },
  searchProducts({}, payload) {
    return new Promise((resolve, reject) => {
        http
        .get(`product?Search=${payload}`)
        .then( async (data) => {
            resolve(data.data);
        })
        .catch(e => {
          reject(e.response.data);
        })
      })
  },
};
