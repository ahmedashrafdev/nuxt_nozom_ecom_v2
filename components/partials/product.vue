<template>
    <div>
      <v-skeleton-loader
        v-if="loading"
        class="mx-auto"
        type="card, list-item-two-line"
      ></v-skeleton-loader>
      <div class="pr-partial" v-else>
        <div class="img">
          <v-img min-height="200" :src="product.ItemImage"></v-img>
          <div class="actions"  v-if="product.InCart">
            <div class="right d-flex atc items-center py-2">
                <v-icon @click.prevent="qty++" small>mdi-plus</v-icon>
                <v-text-field class="atc-input"  v-model="qty"/>
                <v-icon @click.prevent="qty--" small>mdi-minus</v-icon>
            </div>
          </div>
          <div class="actions" v-else>
             <v-btn
                class="mx-2"
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
          <h2 class="product-title mb-2" v-if="$i18n.locale == 'ar'">{{product.ItemName}}</h2>
          <h2 class="product-title  mb-2" v-else>{{product.ItemNameEn}}</h2>
          <div class="price">
            <del class="text-sm">{{ $n(120, 'currency' , 'en') }}</del>
            <span class="text-primary text-sm">{{ $n(100, 'currency' , 'en') }}</span>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  props : ['loading' , 'product'],
  data () {
    return {
      inCart : [],
      qty : 1
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
  }
}
</script>

<style scoped src="@/assets/scss/partials/product2.css"/>
