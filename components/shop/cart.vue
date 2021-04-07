<template>
    <div class="cart">
        <v-row class="p-b">
            <v-col cols="12" v-if="cart.products.length > 0">
                <partials-cart-product v-for="(item,index) in cart.products" :key="index" :product="item"/>
            </v-col>
            <v-col v-else cols="12" class="no-products" > 
                <v-icon x-large class="remove-icon">
                mdi-cart-remove
                </v-icon>
                <span class="text-large">{{$t('no_products_cart')}}</span>
                <v-btn @click.prevent="$router.push({name : `shop___${$i18n.locale}`})" color="primary">{{$t('continue_shopping')}} <v-icon dark>mdi-arrow-right</v-icon></v-btn>
            </v-col>
        </v-row>
        <div class="totals"  v-if="cart.products.length > 0">
            <h2 class="product-title"> {{$t('total_amount')}}: {{ $n(cart.total, 'currency' , 'en') }}</h2>
            <v-subheader>{{$t('shipping_note')}}</v-subheader>
            <v-row class="btns">
                <v-col cols="5" @click.prevent="$router.go(-1)">
                    <v-btn text >
                        <v-icon>mdi-arrow-left</v-icon>
                        {{$t('back')}}
                    </v-btn>
                </v-col>
                <v-col cols="7">
                    <v-btn text @click.prevent="$emit('clicked')">
                        {{$t('continute')}}
                        <v-icon>mdi-arrow-right</v-icon>
                    </v-btn>
                </v-col>
            </v-row>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    computed: {
      ...mapGetters({
        cart: 'cart/cart'
      })
    },
}
</script>

<style src="@/assets/scss/pages/cart.css"/>
