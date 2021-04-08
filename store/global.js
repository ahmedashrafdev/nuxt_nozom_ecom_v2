
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
            url : "www.facebook.com",
            icon : "facebook"
        },
        {
            title : "instagram",
            url : "www.instagram.com",
            icon : "instagram"
        },
        {
            title : "twitter",
            url : "www.twitter.com",
            icon : "twitter"
        }
    ]
});

export const mutations = {
    contacts(state, payload) {
        state.contacts = payload;
    },
    links(state, payload) {
        state.links = payload;
    },
};

export const getters = {
    contacts(state){
        return state.contacts
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
   
}
