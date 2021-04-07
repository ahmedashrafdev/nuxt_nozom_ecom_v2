<template>
<div class="slider-wrapper">
    <swiper
    :options="swiperOption" 
    class="slider"
    ref="mySwiper" 
    :space-between="50"
    @swiper="onSwiper"
    @slideChange="onSlideChange"
  >
    <swiper-slide class="slide" v-for="slide in slides" :key="slide.id" :style="{backgroundImage: `url(${slide})`}">
    
    </swiper-slide>
  </swiper>
</div>

</template>

<script>
import swiperOption from '@/utilities/slider.js'
export default {
  data(){
    return {
      slides : [
        'https://www.ocsolutions.co.in/html/organic_food/images/slider/style_blue.png',
        'https://www.ocsolutions.co.in/html/organic_food/images/slider/style_blue.png',
      ],
      swiperOption,
      Componentloading : false
    }
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.$swiper
    },

  },
  
  mounted() {
    this.Componentloading = false
    
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
}
</script>

<style scoped>
.slider-wrapper .slide{
  min-height: 30vh;
  background-size: cover;
  background-position: center;
}
@media(min-width : 769px){
  .slider-wrapper .slide{
    height: 60vh;
  }
}
</style>