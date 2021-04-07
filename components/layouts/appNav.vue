<template>
    <nav class="nav">
        <div class="top">
            <v-container>
                <div class="d-flex items-center space-between w-full">
                   <span> welcome to  el rady foods & fruits</span>
                    <ul class="d-flex right">
                        <li class="b-right">
                            <v-btn
                                icon
                                @click.prevent="$router.push({name : `shop-cart___${$i18n.locale}`})"
                            >
                                
                                    <v-icon >
                                        mdi-account-outline
                                    </v-icon>
                               
                            {{$t('account')}}
                            </v-btn>
                        </li>
                        <li class="b-right">
                            <!-- <v-icon class="mr-2" >mdi-cart-arrow-down</v-icon> -->
                            <v-btn
                                icon
                                @click.prevent="$router.push({name : `shop-cart___${$i18n.locale}`})"
                            >
                                <v-badge
                                    :content="count"
                                    :value="count"
                                    color="primary"
                                    
                                >
                                    <v-icon >
                                    mdi-cart-arrow-down
                                    </v-icon>
                                </v-badge>
                            {{$t('cart')}}
                            </v-btn>
                        </li>
                        <ul class="d-flex items-center">
                            <li>
                                <v-icon small>mdi-facebook</v-icon>
                            </li>
                            <li>
                                <v-icon small>mdi-instagram</v-icon>
                            </li>
                            <li>
                                <v-icon small>mdi-twitter</v-icon>
                            </li>
                            <li>
                                <v-icon small>mdi-facebook</v-icon>
                            </li>

                        </ul>
                    </ul>
                </div>
            </v-container>
        </div>
        <div class="bottom" ref="nav">
            <v-container>
                <div class="nav d-flex space-between items-center">
                    <nuxt-link to="/" class="logo">
                        <img src="https://www.ocsolutions.co.in/html/organic_food/images/style_blue.png">
                    </nuxt-link>

                    <div class="links">
                        <ul class="d-flex">
                            <li>
                                <nuxt-link to="/" >
                                    {{$t('home')}}
                                </nuxt-link>
                            </li>
                            <li>
                                <nuxt-link to="/shop" >
                                    {{$t('Store')}}
                                </nuxt-link>
                            </li>
                            <li>
                                <a @click.prevent="setGroup({id: 1 , itemName : 'خضراوات' , itemNameEn : 'vegitables'})">
                                    {{$t('Vegitables')}}
                                </a>
                            </li>
                            <li>
                                <a @click.prevent="setGroup({id: 3 , itemName : 'فاكهة' , itemNameEn : 'fruits'})" >
                                    {{$t('Fruits')}}
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div class="search">
                       <v-autocomplete
                        filled
                        rounded
                        dense
                        hide-details=""
                        label="search"
                        ></v-autocomplete>
                    </div>
                </div>
            </v-container>
        </div>
    </nav>
</template>


<script>
import { mapGetters } from 'vuex'
export default {

    methods: {
        handleScroll () {
        // Your scroll handling here
            if(window.scrollY > 500){
                this.$refs.nav.classList.add('fixed')
            } else {
                this.$refs.nav.classList.remove('fixed')

            }
        },
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
    },
    beforeMount () {
        window.addEventListener('scroll', this.handleScroll);
    },
    computed:{
        ...mapGetters({
            count: 'cart/cartCount',
            loading: 'product/loading',
            filtersParams: 'product/filtersParams',

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
