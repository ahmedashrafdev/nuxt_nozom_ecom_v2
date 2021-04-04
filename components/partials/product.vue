<template>
    <div>
      <v-skeleton-loader
        v-if="loading"
        class="mx-auto"
        type="card, list-item-two-line"
      ></v-skeleton-loader>
      <div class="pr-partial" v-else>
        <div class="img"  @click.prevent="$router.push({name : `shop-id___${$i18n.locale}` , params : {id : product.id}})">
          <v-img min-height="200" :src="product.ItemImage"></v-img>
          <div class="actions"  v-if="product.InCart">
            <div class="right d-flex atc items-center py-2">
                <v-icon @click.prevent="increase" small>mdi-plus</v-icon>
                <v-select @change="updateQty" :items="qtys" class="atc-input"  v-model="qty"/>
                <v-icon @click.prevent="decrease" small>mdi-minus</v-icon>
            </div>
          </div>
          <div class="actions" v-else>
             <v-btn
                class="mx-2"
                :class="{active : product.inWishlist}"
                fab
                dark
                small
                @click.prevent="addToWishlist()"
                color="primary"
              >
                <v-icon dark>
                  mdi-heart
                </v-icon>
              </v-btn>
              <v-btn
                class="mx-2"
                :class="{active : product.inCart}"
                fab
                dark
                small
                @click.prevent="addToCart()"
                color="primary"
              >
                <v-icon dark>
                  mdi-cart-arrow-down
                </v-icon>
              </v-btn>
          </div>
        </div>
        <div class="meta text-center">
          <h2 class="product-title pointer mb-2"  @click.prevent="$router.push({name : `shop-id___${$i18n.locale}` , params : {id : product.id}})" v-if="$i18n.locale == 'ar'">{{product.ItemName}}</h2>
          <h2 class="product-title  pointer mb-2"  @click.prevent="$router.push({name : `shop-id___${$i18n.locale}` , params : {id : product.id}})" v-else>{{product.ItemNameEn}}</h2>
          <div class="price">
            <del class="text-sm">{{ $n(120, 'currency' , 'en') }}</del>
            <span class="text-primary text-sm">{{ $n(100, 'currency' , 'en') }}</span>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
// import { qtyss , wieghts } from '@/utilities/updateQty.js'
export default {
  props : ['loading' , 'product'],
  data () {
    let qtys = this.product.byWeight ? [
    1,2,3,4,5,6,7,8,9,10
    ] : [
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
    let qty = this.product.cartQty ? this.product.cartQty : 1
    return {
      inCart : [],
      qtys,
      qty
    }
  },
  methods:{
    addToCart(id){
      this.inCart.push(id)
      if(this.$auth.loggedIn){
        this.$store.dispatch('cart/create', {product: this.product.id , qty :this.qty})
        .then(() => {
          this.product.InCart = true
        })
      } else {
        const snackbar = {
            active : true,
            text: 'logged in successfully'
        }
        this.$store.commit('ui/setSnackbar' , snackbar)
        localStorage.setItem('product' , this.product.id )
        localStorage.setItem('qty' , this.qty )

        this.$router.push('/login')
      }
    },
    addToWishlist() {
        if(this.$auth.loggedIn){
            this.$store.dispatch('wishlist/create', {product: this.product.id})
        } else {
           const snackbar = {
            active : true,
            text: 'logged in successfully'
        }
        this.$store.commit('ui/setSnackbar' , snackbar)
        localStorage.setItem('productW' , this.product.id )
        localStorage.setItem('qtyW' , this.qty )
        this.$router.push('/login')
        }
    },
    updateQty() {
      const payload = {
        id : this.product.id,
        qty : this.qty
      }
      this.$store.dispatch('cart/update' , payload)
    },
    decrease(){
      const index = this.qtys.indexOf(this.qty)
      if(index !== 0){
        this.qty = this.qtys[index-1]
        this.updateQty()
      }
    },
    increase(){
      const index = this.qtys.indexOf(this.qty)
      if(index !== this.qtys.length -1)
      this.qty = this.qtys[index + 1]
      this.updateQty()
    },
  },
}
</script>

<style scoped src="@/assets/scss/partials/product2.css"/>
