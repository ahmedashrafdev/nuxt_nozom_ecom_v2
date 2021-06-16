<template>
  <v-app :class="{rtl : $i18n.locale == 'ar'}" dark>
   
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
     
  </v-app>
</template>

<script>
export default {
  created(){
    this.$store.dispatch('cart/get')
    this.$store.dispatch('wishlist/get')
    const locale = this.$i18n.locale 
      if(locale == 'ar'){
          this.$vuetify.rtl = true
      } else {
          this.$vuetify.rtl = false
      }
  }
}
</script>

<style scoped>

</style>