<template>
    <div class="cart">
        <v-row class="p-b">
            <v-col cols="12">
                <partials-cart-product v-for="(item,index) in products" :key="index"/>
            </v-col>
        </v-row>
        <div class="totals">
            <h2 class="product-title"> {{$t('total_amount')}}: {{ $n(100, 'currency' , 'en') }}</h2>
            <v-subheader>{{$t('shipping_note')}}</v-subheader>
            <v-row class="btns">
                <v-col cols="5">
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
        products: 'cart/products'
      })
    },
}
</script>

<style scoped src="@/assets/scss/pages/cart.css"/>
