<template>
    <footer class="footer">
        <v-container>
            <v-row class="content">
                <v-col class="about" cols="3">
                    <div class="logo">
                        <img src="https://www.ocsolutions.co.in/html/organic_food/images/header3/footer-logo.png" alt="el rady logo">
                    </div>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi nobis praesentium ab cupiditate dolor.</p>
                    <ul class="contacts">
                        <li v-for="(contact,index) in contacts" :key="index">
                            <v-icon>mdi-{{contact.icon}}</v-icon>
                            {{contact.title}}
                        </li>

                    </ul>
                </v-col>
                <v-col cols="9">
                    <v-row class="right">
                        <v-col cols="12" class="newsletter">
                            <h2>{{$t('news_letter')}}</h2>
                            <p>{{$t('news_letter_content')}}</p>
                            
                            <v-flex class="newsletter__form">
                                <div class="input">
                                    <v-text-field
                                        label="email"
                                        rounded
                                        :rules="rules"
                                        dense
                                        color="black"
                                        hide-details="auto"
                                        ></v-text-field>
                                </div>
                                <div class="btn">
                                     <v-btn height="30" dense color="primary" @click.prevent="$emit('clicked')">
                                            {{$t('subscribe_now')}}
                                            <v-icon>mdi-arrow-right</v-icon>
                                        </v-btn>
                                </div>
                            </v-flex>
                        </v-col>
                        <v-col cols="4" class="list">
                            <h2 class="title">{{$t('stay connected')}}</h2>
                            <ul>
                                <li @click.prevent="link.url" v-for="(link , index) in links" :key="index">
                                    <v-icon small>mdi-{{link.icon}}</v-icon>
                                    {{link.title}}
                                </li>
                            </ul>
                        </v-col>
                        <v-col cols="4" class="list">
                            
                            <h2 class="title">{{$t('categories')}}</h2>
                            <ul>
                                <li v-for="group in groups" :key="group.id">
                                    <v-icon small>mdi-{{group.icon}}</v-icon>
                                    <a @click.prevent="setGroup(group)" v-if="$i18n.locale === 'ar'">
                                        {{group.GroupName}}
                                    </a>
                                    <a @click.prevent="setGroup(group)" v-else>
                                        {{group.GroupNameEn}}
                                    </a>
                                </li>
                            </ul>
                        </v-col>
                        <v-col cols="4" class="list">
                            
                            <h2 class="title">{{$t('my_account')}}</h2>
                            <ul>
                                <li v-for="(item , index) in accountItems" :key="index">
                                     <v-icon small>mdi-{{item.icon}}</v-icon>
                                    {{$t(item.text)}}
                                </li>
                            </ul>

                        </v-col>
                       
                    </v-row>
                </v-col>
                <v-col class="copyrights" cols="12">
                   <span> {{$t('copyrights')}}</span>
                </v-col>
                
            </v-row>
        </v-container>
    </footer>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
    computed:{
        ...mapGetters({
              groups: 'group/groups',
              loading: 'group/loading',
              filters: 'product/filters',
              filtersParams: 'product/filtersParams',
            }),
    },
    data(){
        return{
            accountItems: [
                {  text: 'order_history', icon: 'calendar-blank' },
                {  text: 'wishlist', icon: 'heart-outline' },
                {  text: 'shipping_addresses', icon: 'office-building-marker-outline' },
                {  text: 'my_cart', icon: 'cart-arrow-down' },
            ],
            contacts :[
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
        }
    },
    methods:{
        setGroup(group){
            
            const name = this.$i18n.locale == 'ar' ? group.GroupName : group.GroupNameEn
            const groupFilter = {
                id : group.id,
                name
            }
            const localFilters = {
                price : [],
                group : groupFilter
            }
            
            this.$store.commit('product/filters' , localFilters)
             if(this.$route.name !== `shop___${this.$i18n.locale}`){
                 this.$router.push({name : `shop___${this.$i18n.locale}` , query : {group : group.id}})
             } else {
                 this.addParamsToLocation(this.filtersParams)
             }
        },
        addParamsToLocation(params) {
        this.$store.dispatch('product/getProducts' , params)
        history.pushState(
            {},
            null,
            this.$route.path +
            '?' +
            Object.keys(params)
                .map(key => {
                return (
                    encodeURIComponent(key) + '=' + encodeURIComponent(params[key])
                )
                })
                .join('&')
        )
        window.scrollTo({ top:0, behavior: 'smooth'});
        },
    }
}
</script>
<style scoped src="@/assets/scss/layouts/footer.css"/>
