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
    <swiper-slide @click.prevent="$router.push({name : `shop___${i18n.locale}`})" class="slide" v-for="slide in slides" :key="slide.id" :style="{backgroundImage: `url(${slide})`}">
    
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
        'https://lcw.akinoncdn.com/cms/2021/04/15/092d5d17-6a5d-4c68-a959-e75f079d9b74.jpg',
        'https://dfcdn.defacto.com.tr/df/1920/Mobile/new-kids-2_bc8d2086-987c-4732-ad2a-4af0f969d42c_dc31b89f-4775-4148-9892-6410998fce5a_DI_198.jpg',
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
    cursor: pointer;
  }
}
</style>