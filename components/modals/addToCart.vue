<template>
  <v-row justify="center">
    <v-dialog
      v-model="addToCartModal"
      @click:outside="close"
      max-width="600"
    >
      <v-card>
         
        <v-container>
            <div class="d-flex" v-if="loading">
                <v-skeleton-loader width="200" height="350" type="image"></v-skeleton-loader>
                <div>
                    <v-skeleton-loader
                    v-for="i in 6"
                    :key="i"
                    width="300"
                    type="list-item"
                    >
                    click:outside</v-skeleton-loader>
                </div>
            </div> 
            <div class="d-flex" v-else>
                <div class="img shadow mr-4">
                    <v-img max-width="200" class="img shadow" :src="product.ItemImage">
                    </v-img>
                </div>
                <div class="wrapper">
                    <h2 class="product-title larger mb-1" v-if="$i18n.locale == 'ar'">{{product.ItemName}}</h2>
                <h2 class="product-title larger mb-1" v-else>{{product.ItemNameEn}}</h2>
                <span class="category" v-if="$i18n.loale == 'ar'">{{product.group.GroupName}}</span>
                <!-- <nuxt-link :to="{name : `shop___${$i18n.locale}` , query: {group : product.group.id}}" class="category" v-else>{{product.group.GroupNameEn}}</nuxt-link> -->
                <!-- <p class="p">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis, quibusdam quos? Minima iure repellendus quia dignissimos perspiciatis similique consequatur optio reiciendis, repudiandae aperiam iste aspernatur, dicta asperiores corrupti distinctio soluta?
                </p> -->
                <div class="price  text-h4">
                  <span class="text-primary">{{ $n(product.POSPP, 'currency' , 'en') }}</span>
                  <!-- <del >{{ $n(120, 'currency' , 'en') }}</del> -->
                </div>
                <div class="size-chart">
                  <h4 class="mb-4 mt-4">{{$t('sizes')}}</h4>
                  <v-chip-group
                    v-model="size"
                    column
                  >
                    <v-chip
                      v-for="(size , index) in product.sizes"
                      :key="index"
                      :class="$route.query.size == size.size? ` v-chip--active` : ''"
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
                    column
                  >
                    <v-chip
                      v-for="(color,index) in product.colors"
                      :key="index"
                      :class="product.initlaColor == color.color || $route.query.color == color? ` v-chip--active` : ''"
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
                    <v-select :items="qtys" class="atc-input"  v-model="qty"/>
                    <!-- <v-text-field class="atc-input"  v-model="qty"/> -->
                    <v-icon @click.prevent="decrease" small>mdi-minus</v-icon>
                  </div>
                </div>
                </div>
            </div>
            <div class="btns d-flex">
                <v-btn   text @click.prevent="addToCart"  class="border w-full p-4 rounded-xl">
                <v-icon>mdi-cart-arrow-down</v-icon>
                <span >{{$t('add_to_cart')}}</span>
                </v-btn>
            </div>
        
      </v-container>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
    computed : {
        ...mapGetters({
            product: 'product/product',
            loading: 'product/loading'
        }),
        addToCartModal: {
            get: function() {
				return this.$store.getters['ui/addToCartModal']
            },
            set: function(newValue) {
                this.$store.commit('ui/addToCartModal' , newValue)
            }
        },
    },
    data () {
      return {
        qty : 1,
        qtys : [1,2,3,4,5,6,7,8,9,10] ,
        size : null,
      }
    },
    methods:{
        close(){
          this.addParamsToLocation({})
          this.size = null
          this.$store.commit('ui/addToCartModal' , false)
        },
        decrease(){
          const index = this.qtys.indexOf(this.qty)
          if(index !== 0){
            this.qty = this.qtys[index-1]
          }
        },
        increase(){
          const index = this.qtys.indexOf(this.qty)
          if(index !== this.qtys.length -1)
          this.qty = this.qtys[index + 1]
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
            id : this.product.id,
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
        },
        addToCart(){
          if(this.$route.query.color && this.$route.query.size){
            let payload = {product: this.product.id , qty :this.qty , color :this.$route.query.color , size : this.$route.query.size }
            this.$store.dispatch('cart/create', payload)
            .then(() => {
              this.inCart.push(this.product.id)
              this.product.InCart = true
              this.close()
            })
          } else{ 
            const snackbar = {
              active : true,
              text: 'please_select_option'
            }
            this.$store.commit('ui/setSnackbar' , snackbar)
          }
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
          }
        })
    },
        
    },
    created(){
        
    }
  }
</script>