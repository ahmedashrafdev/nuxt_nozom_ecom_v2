<template>
  <v-app dark>
   
    <layouts-app-bar/>
    <layouts-app-nav/>
    <v-main>
        <nuxt />
    </v-main>
    <layouts-app-footer/>
    <layouts-bottom-nav/>

    <modals-mobile-categories/>
    <layouts-snack-bar/>
     
  </v-app>
</template>

<script>
export default {
  created(){
    this.$store.dispatch('cart/get')
    this.$store.dispatch('wishlist/get')
  }
}
</script>

<style scoped>

</style>