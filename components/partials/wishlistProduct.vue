<template>
    <div>
      <v-skeleton-loader
        v-if="loading"
        class="mx-auto"
        type="card, list-item-two-line"
      ></v-skeleton-loader>
      <div class="pr-partial" v-else>
        <div class="img">
          <v-img max-width="200" :src="product.ItemImage"></v-img>
        </div>
        <div class="meta text-center">
          <h2 class="product-title mb-2" v-if="$i18n.locale == 'ar'">{{product.ItemName}}</h2>
          <h2 class="product-title  mb-2" v-else>{{product.ItemNameEn}}</h2>
          <div class="price">
            <del class="text-sm">{{ $n(120, 'currency' , 'en') }}</del>
            <span class="text-primary text-sm">{{ $n(100, 'currency' , 'en') }}</span>
          </div>
           <div class="actions">
             <v-btn
                class="mr-2"
                dark
                @click.prevent="switchToCart()"
                color="primary"
              >
                <v-icon dark>
                  mdi-cart-arrow-down
                </v-icon>
                {{$t('switch_to_cart')}}
              </v-btn>
              <v-btn
                dark
                fab
                small
                @click.prevent="remove()"
                color="danger"
              >
                <v-icon dark>
                  mdi-trash-can-outline
                </v-icon>
              </v-btn>
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
      qty : 1
    }
  },
  methods:{
    switchToCart(){
      this.$store.dispatch('wishlist/switch', {id : this.product.id , qty : 2})
    },
    remove(){
      this.$store.dispatch('wishlist/remove' , this.product.id)
    },
  }
}
</script>

<style scoped src="@/assets/scss/partials/wishlist-product.css"/>
