<template>
  <v-app :class="{rtl : $i18n.locale == 'ar'}" dark>
   <loading v-if="loading"></loading>
   <div v-else>
      <layouts-app-bar/>
      <layouts-app-nav/>
      <v-main>
          <nuxt />
      </v-main>
      <layouts-app-footer/>
      <layouts-bottom-nav/>

      <modals-mobile-categories/>
      <layouts-snack-bar/>
      <modals-add-to-cart/>

   </div>
     
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      loading : true,
    }
  },
  methods :{
    async init(){
      await this.$store.dispatch('global/getSettings')
      if(this.$auth.user){
        await this.$store.dispatch('wishlist/get')
        await this.$store.dispatch('cart/get')
      }

      this.loading = false
    }
  },
  created(){
    this.init()
   
  }
}
</script>

<style scoped>

</style>