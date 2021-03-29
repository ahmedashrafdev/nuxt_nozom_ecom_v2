<template>
    <v-row class="product">
        <v-col cols="12">
            <div class="d-flex space-between">
                <div class="d-flex right">
                    <div class="img">
                        <v-img src="https://qomra.pro/wp-content/uploads/2019/03/image-placeholder-350x350.png"/>
                    </div>
                    <div class="data">
                        <h2 class="product-title">name</h2>
                        <h4 class="product-subtitle">subname</h4>
                    </div>
                </div>
                <div class="left">
                    <v-icon class="danger">mdi-trash-can-outline</v-icon>
                </div>
            </div>
            <div class="d-flex space-between items-center">
                <div class="right d-flex atc items-center py-2">
                    <v-icon @click.prevent="qty++" small>mdi-plus</v-icon>
                    <v-text-field class="atc-input"  v-model="qty"/>
                    <v-icon @click.prevent="qty--" small>mdi-minus</v-icon>

                </div>
                <div class="left">
                     <span>{{ $n(100, 'currency' , 'en') }}</span>
                     <del>{{ $n(120, 'currency' , 'en') }}</del>
                </div>
            </div>
        </v-col>
    </v-row>
</template>

<script>

export default {
    data(){
        return{
            qty:1,
        }
    }
}
</script>

<style scoped src="@/assets/scss/partials/product.css"/>