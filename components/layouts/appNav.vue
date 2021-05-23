
<template>
    <nav class="nav">
        <div class="top">
            <v-container>
                <div class="d-flex items-center space-between w-full">
                   <ul class="d-flex left">
                       <li v-for="(contact,index) in contacts" :key="index">
                            <v-icon>mdi-{{contact.icon}}</v-icon>
                            {{contact.title}}
                        </li>
                   </ul>
                    <ul class="d-flex right">
                        <li class="b-right pointer"  v-if="$auth.loggedIn" @click.prevent="$router.push({name : `account___${$i18n.locale}`})">
                            <a>
                                <v-icon >
                                    mdi-account-outline
                                </v-icon>
                                {{$auth.user.user.name}}
                            </a>
                        </li>
                        <li class="b-right pointer"  v-else @click.prevent="$router.push({name : `login___${$i18n.locale}`})">
                            <a>
                                
                                    <v-icon >
                                        mdi-account-outline
                                    </v-icon>
                               
                            {{$t('login-rgister')}}
                            </a>
                        </li>
                        <li class="b-right"  @click.prevent="$router.push({name : `shop-cart___${$i18n.locale}`})">
                            <!-- <v-icon class="mr-2" >mdi-cart-arrow-down</v-icon> -->
                            <a
                            >
                                <v-badge
                                    :content="count"
                                    :value="count"
                                    color="primary"
                                    left
                                    
                                >
                                    <v-icon >
                                    mdi-cart-arrow-down
                                    </v-icon>
                                </v-badge>
                            {{$t('cart')}}
                            </a>
                        </li>
                        
                        <ul class="d-flex items-center socials pointer">
                            <li @click.prevent="link.url" v-for="(link , index) in links" :key="index">
                                <v-icon medium>mdi-{{link.icon}}</v-icon>
                            </li>
                            <li class="language-switcher" @click.prevent="switchLanguage"><v-icon>mdi-earth</v-icon>{{$t('language')}}</li>
                        </ul>
                    </ul>
                </div>
            </v-container>
        </div>
        <div class="bottom" ref="nav">
            <v-container>
                <div class="nav d-flex space-between items-center">
                    <nuxt-link to="/" class="logo">
                        <img :src="logo">
                    </nuxt-link>

                    <div class="links">
                        <ul class="d-flex">
                            <li>
                                <nuxt-link :to="{name: `index___${$i18n.locale}`}" >
                                    {{$t('home')}}
                                </nuxt-link>
                            </li>
                            <li>
                                <a @click.prevent="goToStore()" >
                                    {{$t('Store')}}
                                </a>
                            </li>
                            <!-- <li>
                                <a @click.prevent="setGroup({id: 1 , GroupName : 'فواكهة' , GroupNameEn : 'fruits'})">
                                    {{$t('fruits')}}
                                </a>
                            </li>
                            <li>
                                <a @click.prevent="setGroup({id: 2 , GroupName : 'خضروات' , GroupNameEn : 'vigitables'})" >
                                    {{$t('vigitables')}}
                                </a>
                            </li> -->
                        </ul>
                    </div>
                    <div class="search">
                        <layouts-search/>
                    </div>
                </div>
            </v-container>
        </div>
    </nav>
</template>


<script>
import { mapGetters } from 'vuex'
export default {
    data(){
        return {
            items : ['asd'],
            isLoading : false,
            term : '',
        }
    },
    watch:{
        term: newVal => {
            console.log(newVal)
        } 
    },
    methods: {
        switchLanguage(){
            const locale = this.$i18n.locale === 'en' ? 'ar' : 'en'
            if(locale == 'ar'){
                this.$vuetify.rtl = true
            } else {
                this.$vuetify.rtl = false

            }
            this.$router.push({name : `index___${locale}`})
        },
        handleScroll () {
        // Your scroll handling here
            if(window.scrollY > 145){
                this.$refs.nav.classList.add('fixed')
                // document.querySelector('main.v-main').classList().add('fixed-nav')
            } else {
                this.$refs.nav.classList.remove('fixed')
                // document.querySelector('main.v-main').classList().remove('fixed-nav')

            }
        },
        search(val){
            console.log('asd')
            console.log(val)
        },
        setGroup(group){
            
            const name = this.$i18n.locale == 'ar' ? group.GroupName : group.GroupNameEn
            const groupFilter = {
                id : group.id,
                name
            }
           this.$store.commit('product/groupFilter' , groupFilter)
            if(this.$route.name !== `shop___${this.$i18n.locale}`){
                 this.$router.push({name : `shop___${this.$i18n.locale}` , query : {group : group.id}})
             } else {
                  let query = this.$route.query
                    query.group = group.id
                 this.addParamsToLocation(query)
             }
        },
        goToStore(){
           this.$store.commit('product/groupFilter' , {  name : null,  id : null})
           this.$store.commit('product/priceFrom' , null)
           this.$store.commit('product/priceTo' , null)
           if(this.$route.name !== `shop___${this.$i18n.locale}`){
                this.$router.push({name : `shop___${this.$i18n.locale}` , query : {}})
            } else {
                this.addParamsToLocation({})
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
    },
    beforeMount () {
        window.addEventListener('scroll', this.handleScroll);
    },
    computed:{
        ...mapGetters({
            count: 'cart/cartCount',
            loading: 'product/loading',
            filtersParams: 'product/filtersParams',
            links : 'global/links',
            logo : 'global/logo',
            contacts : 'global/contactsNav'

        })
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
    beforeDestroy() {
        window.removeEventListener('scroll', this.handleScroll);
    }
}
</script>
<style scoped src="@/assets/scss/layouts/nav.css"/>
