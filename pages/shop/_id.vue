<template>
<div class="shop">
  <v-row justify="center" align="center">
    <v-col cols="12">
      <!-- <layouts-bradcrumbs/> -->
    </v-col>
    <v-col cols="12">
      <v-container>
        <v-row>
          <v-col cols="12" v-if="loading">
            <v-skeleton-loader
              width="100%"
              type="image"
            >
            </v-skeleton-loader>
          </v-col>

          <v-col cols="12" v-else>
            <v-row>

              <v-col cols="12" lg="6" >
                <div class="img shadow">
                    <v-img min-height="200" :src="product.ItemImage"></v-img>
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
                      v-for="tag in tags"
                      :key="tag"
                    >
                      {{ tag }}
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
                      v-for="tag in colors"
                      :key="tag"
                      large
                    >
                     <span class="color" :style="{backgroundColor : tag}"></span>
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
      colors :[
        "#87674f",
        "#1b1f21"
      ],
      tags: [
        '31',
        '32',
        '33',
        '34',
        '35',
        '36',
        '37',
        '38',
        '39',
        '31',
        '32',
        '33',
        '34',
        '35',
        '36',
        '37',
        '38',
        '39',
        '31',
        '32',
        '33',
        '34',
        '35',
        '36',
        '37',
        '38',
        '39',
      ],
    }
  },
  created(){
    console.log(this.$route.name)
    this.$store.dispatch('product/getProduct' , this.$route.params.id)
    .then(() => {
      this.qtys = this.product.byWeight ? 
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
  methods:{
    openFiltersModal(){
				this.$store.commit('ui/mobileFiltersModal', true)
    },
    
  }
  
}
</script>

<style scoped src="@/assets/scss/pages/single-product.css"/>

