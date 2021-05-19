
import http from '~/utilities/http.js';
export const state = () => ({
   contacts : [
        {
            icon : 'map-marker-outline',
            title : 'No 60 Lorem Street 6/2 lorem city, Cairo. ',
        },
        {
            icon : 'phone-outline',
            title : '0123456789',
        },
        {
            icon : 'email-outline',
            title : 'info@elradymarket.com',
        },  
    ],
    
    links : [
        {
            title : "facebook",
            url : "http://www.facebook.com",
            icon : "facebook"
        },
        {
            title : "instagram",
            url : "http://www.instagram.com",
            icon : "instagram"
        },
        {
            title : "twitter",
            url : "http://www.twitter.com",
            icon : "twitter"
        }
    ],
    sliders: [],
    slidersLoading: false,
    bannersLoading: [],
    banners: false,
});

export const mutations = {
    contacts(state, payload) {
        state.contacts = payload;
    },
    links(state, payload) {
        state.links = payload;
    },
    bannersLoading(state, payload) {
        state.bannersLoading = payload;
    },
    banners(state, payload) {
        state.banners = payload;
    },
    sliders(state, payload) {
        state.sliders = payload;
    },
    slidersLoading(state, payload) {
    state.slidersLoading = payload;
    },
};

export const getters = {
    contacts(state){
        return state.contacts
    },
    sliders(state) {
        return state.sliders;
    },
    bannersLoading(state) {
        return state.bannersLoading;
    },
    banners(state) {
        return state.banners;
    },
    slidersLoading(state) {
    return state.slidersLoading;
    },
    contactsNav(state){
        const contacts = [
            state.contacts[0],
            // state.contacts[1],
        ]
        return contacts
    },
    links(state){
        return state.links
    },
    
   
}
export const actions = {
    getSliders({commit}){
        commit("slidersLoading", true);
        return new Promise((resolve, reject) => {
            http.get(`banners/sliders`)
            .then(res => {
              commit("slidersLoading", false)
              commit("sliders", res.data)
              resolve(res.data)
            })
            .catch((res) => {
              commit("slidersLoading", false)
              reject(res);
            });
        });
      },
      getHomeBnners({commit}){
        commit("bannersLoading", true);
        return new Promise((resolve, reject) => {
            http.get(`banners/home`)
            .then(res => {
              commit("bannersLoading", false)
              commit("banners", res.data)
              resolve(res.data)
            })
            .catch((res) => {
              commit("bannersLoading", false)
              reject(res);
            });
        });
      },
}
