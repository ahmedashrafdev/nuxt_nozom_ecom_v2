<template>
<div class="shop">
  <v-row justify="center" align="center">
    <v-col cols="12">
      <!-- <layouts-bradcrumbs/> -->
    </v-col>
    <v-col cols="12">
      <v-container>
        <v-row>
          <v-col cols="12" md="6" v-if="loading">
            <v-skeleton-loader
              width="100%"
              type="image"
              height="800"
            >
            </v-skeleton-loader>
          </v-col>
          <v-col cols="12" md="6" v-if="loading">
            <v-skeleton-loader
            v-for="i in 6"
            :key="i"
              width="100%"
              type="list-item"
            >
            </v-skeleton-loader>
          </v-col>

          <v-col cols="12" v-else>
            <v-row>

              <v-col cols="12" lg="6" >
                <div class="">
                    <!-- <v-img min-height="200" :src="product.ItemImage"></v-img> -->
                     <v-tabs vertical v-model="tabs">
                      <v-tab class="left mb-2" v-for="(item,index) in product.images" :key="index">
                        <div class="img-wrapper">
                          <v-img height="48" width="50" :src="item.image"></v-img>
                        </div>
                      </v-tab>
                      <v-tab-item class="" v-for="(item,index) in product.images" :key="index">
                        <v-img class="img shadow" :src="item.image">
                        </v-img>
                      </v-tab-item>
                    </v-tabs>
                </div>
              </v-col>
              <!-- <v-col cols="2"></v-col> -->

              <v-col cols="12" class="product-description" lg="6" >   
                <h2 class="product-title larger mb-1" v-if="$i18n.locale == 'ar'">{{product.ItemName}}</h2>
                <h2 class="product-title larger mb-1" v-else>{{product.ItemNameEn}}</h2>
                <span class="category" v-if="$i18n.loale == 'ar'">{{product.group.GroupName}}</span>
                <nuxt-link :to="{name : `shop___${$i18n.locale}` , query: {group : product.group.id}}" class="category" v-else>{{product.group.GroupNameEn}}</nuxt-link>
                <!-- <p class="p">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis, quibusdam quos? Minima iure repellendus quia dignissimos perspiciatis similique consequatur optio reiciendis, repudiandae aperiam iste aspernatur, dicta asperiores corrupti distinctio soluta?
                </p> -->
                <div class="price  text-h4">
                  <span class="text-primary">{{ $n(100, 'currency' , 'en') }}</span>
                  <del >{{ $n(120, 'currency' , 'en') }}</del>
                </div>
                <div class="size-chart">
                  <h4 class="mb-4 mt-4">{{$t('sizes')}}</h4>
                  <v-chip-group
                    active-class="primary--text"
                    column
                  >
                    <v-chip
                      v-for="(size , index) in product.sizes"
                      :key="index"
                      :class="$route.query.size == size.size? `primary--text v-chip--active` : ''"
                      class=""
                    @click.prevent="filter('size' , size.size)"
                    >
                      <span>{{size.size}}</span>
                    </v-chip>
                  </v-chip-group>
                </div>
                <div class="colors">
                  <h4 class="mb-4 mt-4">{{$t('colors')}}</h4>
                  <v-chip-group
                    active-class="primary--text"
                    column
                  >
                    <v-chip
                      v-for="(color,index) in product.colors"
                      :key="index"
                      :class="product.initlaColor == color.color || $route.query.color == color? `primary--text v-chip--active` : ''"
                      large
                    @click.prevent="filter('color' , color.color)"
                    >
                     <span class="color" :style="{backgroundColor : `#${color.color}`}"></span>
                    </v-chip>
                  </v-chip-group>
                </div>
                <div class="qty">
                  <div class="d-flex atc items-center py-2">
                    <v-icon @click.prevent="increase" small>mdi-plus</v-icon>
                    <v-select @change="updateQty" :items="qtys" class="atc-input"  v-model="qty"/>
                    <!-- <v-text-field class="atc-input"  v-model="qty"/> -->
                    <v-icon @click.prevent="decrease" small>mdi-minus</v-icon>
                  </div>
                </div>
                <div class="btns d-flex">
                  <v-btn  :disabled="product.InCart" text @click.prevent="addToCart" :class="{primary :product.InCart || activeCart.includes(product.id) , textWhite :product.InCart || activeCart.includes(product.id)}"  class="border  p-4 rounded-xl">
                    <v-icon>mdi-cart-arrow-down</v-icon>
                    <span v-if="product.InCart || activeCart.includes(product.id)">{{$t('on_your_cart')}}</span>
                    <span v-else>{{$t('add_to_cart')}}</span>
                  </v-btn>
                  <v-btn
                    class="mx-2 p-4 wishlist-btn border"
                    fab
                    @click.prevent="addToWishlist"
                    :disabled="product.inWishlist"
                    :class="{active :product.inWishlist || activeWishlist.includes(product.id)}"
                    text
                    light
                    small
                  >
                    <v-icon light>
                      mdi-heart
                    </v-icon>
                  </v-btn>
                </div>
              </v-col>
            </v-row>

            
          </v-col>
        </v-row>
      </v-container>
    </v-col>
  </v-row>
  <modals-mobile-filters/>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import updateCart from '@/mixins/updateCart.js'
export default {
  mixins: [updateCart],
  computed: {
    ...mapGetters({
      product: 'product/product',
      loading: 'product/loading'
    })

  },
  data(){
    
    return {
      qty : 1 ,
      qtys : [1],
      tabs: null,
      swiperOption:{
        initialSlide: 0,
        slidesPerView: 1,
        spaceBetween: 20,
        freeMode: true,
        watchOverflow: true,
      },
      
    }
  },
  created(){
    let payload = {
      id : this.$route.params.id,
      filters :{}
    }
    if(this.$route.query.color){
      payload.filters.color = this.$route.query.color
    }
    if(this.$route.query.size){
      payload.filters.size = this.$route.query.size
    }
    this.getProduct(payload)
  },
  methods:{
    openFiltersModal(){
				this.$store.commit('ui/mobileFiltersModal', true)
    },
    getProduct(payload){
      //check if we dont need to perform loading
    payload.loading = payload.loading !== false ? true : false
    this.$store.dispatch('product/getProduct' , payload)
    .then(() => {
      if(payload.filters.color){
        const image = this.product.images.filter(img => {
          return img.color  === payload.filters.color
        })
        console.log('test')
        if(image[0]){
          this.tabs = this.product.images.indexOf(image[0])
        }
          console.log(this.tabs)
      }
      this.qtys = this.product.ByWeight == 0 ? 
        [1,2,3,4,5,6,7,8,9,10] 
        : 
        [
          .25 , .5 , .75 , 1,
          1.25 , 1.5 , 1.75 ,2,
          2.25 , 2.5 , 2.75 , 3,
          3.25 ,3.5 , 3.75 , 4,
          4.25 , 4.5 , 4.75 , 5,
          5.25 , 5.5 , 5.75 , 6,
          6.25 , 6.5 , 6.75 , 7,
          7.25 , 7.5 , 7.75 , 8,
          8.25 , 8.5 , 8.75 , 9,
          9.25 , 9.5 , 9.75 , 10,
          10.25 , 10.5 , 10.75 , 11,
          11.25 , 11.5 , 11.75 , 12,
          12.25 , 12.5 , 12.75 , 13,
          13.25 , 13.5 , 13.75 , 14,
          14.25 , 14.5 , 14.75 , 15,
          15.25 , 15.5 , 15.75 , 16,
          16.25 , 16.5 , 16.75 , 17,
          17.25 , 17.5 , 17.75 , 18,
          18.25 , 18.5 , 18.75 , 19,
          19.25 , 19.5 , 19.75 , 20,
      ]
      this.qty = this.product.cartQty ? this.product.cartQty : 1
    })
    },
    filter(type , value){
      let query = this.$route.query
      if(type == 'size'){
        if(query.size == value){
          delete query.size
        } else {
          query.size = value
        }
      }
      if(type == 'color'){
        if(query.color == value){
          delete query.color
        } else {
          query.color = value
        }
        query.color = value
      }
  
      this.addParamsToLocation(query)
    },
    addParamsToLocation(params) {
      let payload = {
        id : this.$route.params.id,
        loading : false,
        filters :params
      }
      this.getProduct(payload)
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

<style scoped src="@/assets/scss/pages/single-product.css"/>

