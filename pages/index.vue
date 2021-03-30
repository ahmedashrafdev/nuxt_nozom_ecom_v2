<template>
  <v-row justify="center" align="center">
      <v-col cols="12" class="p-0">
        <home-slider/>
      </v-col>
      <v-col cols="12">
        <v-container>
          <v-row justify="center" align="center">
            <v-col cols="12">
              <div class="d-flex space-between px-4">
                <h4 class="section-header d-inline">{{$t('latest_products')}}</h4>
                <div class="d-inline controllers">
                  <nuxt-link :to="{name : `shop___${$i18n.locale}`}" class=" d-inline underline">{{$t('view_all')}}</nuxt-link>
                </div>
              </div>
              <home-products productKey="featured"/>
            </v-col>
            <v-col cols="12" sm="6">
              <home-banner :loading="false" img="https://www.ocsolutions.co.in/html/organic_food/images/header3/shipping-2.png"/>
            </v-col>
            <v-col cols="12" sm="6">
              <home-banner :loading="false" img="https://www.ocsolutions.co.in/html/organic_food/images/header3/shipping-1.png"/>
            </v-col>
            <v-col cols="12">
              <div class="d-flex space-between px-4">
                <h4 class="section-header d-inline">{{$t('featured_products')}}</h4>
                <div class="d-inline controllers">
                  <nuxt-link :to="{name : `shop___${$i18n.locale}`}" class=" d-inline underline">{{$t('view_all')}}</nuxt-link>
                </div>
              </div>
              <home-products productKey="latest"/>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
  </v-row>
</template>

<script>

export default {

}
</script>

<style scoped src="@/assets/scss/pages/home.css">