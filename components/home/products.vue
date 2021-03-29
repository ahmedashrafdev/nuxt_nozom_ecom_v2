<template>
  <swiper
    :options="swiperOption" 
    v-show="!loading"
    ref="mySwiper" 
    :space-between="50"
    @swiper="onSwiper"
    @slideChange="onSlideChange"
  >
    <swiper-slide v-for="product in products" :key="product">
     <partials-product/>
    </swiper-slide>
  </swiper>
</template>

<script>
import swiperOption from '@/utilities/swiper.js'
import { mapGetters } from 'vuex'
export default {
  name: 'carrousel',
    data() {
      return {
        loading : true,
        swiperOption,
      }
    },
    computed: {
      swiper() {
        return this.$refs.mySwiper.$swiper
      },
      ...mapGetters({
        products: 'shop/products'
      })

    },
    
    mounted() {
      this.loading = false
      
      console.log('Current Swiper instance object', this.swiper)
      // this.swiper.slideTo(3, 1000, false)
    },

    
    methods: {
      onSwiper(swiper) {
        console.log(swiper);
      },
      onSlideChange() {
        console.log('slide change');
      },
    },
   
};
</script>

<style scoped>
.swiper-pagination-bullet.swiper-pagination-bullet-active::after {
  width:100%
}
</style>