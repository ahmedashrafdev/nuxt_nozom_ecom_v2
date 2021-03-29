<template>
    <div>
      <v-skeleton-loader
        v-if="loading"
        class="mx-auto"
        @click.prevent="$router.push({name : `shop-id___${$i18n.locale}` , params :{id : 1}})"
        type="card, list-item-two-line"
      ></v-skeleton-loader>
      <div class="pr-partial" v-else>
        <div class="img">
          <v-img :src="product.ItemImage"></v-img>
          <div class="actions">
             <v-btn
                class="mx-2"
                fab
                dark
                small
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
      
    }
  }
}
</script>

<style scoped src="@/assets/scss/partials/product2.css"/>
