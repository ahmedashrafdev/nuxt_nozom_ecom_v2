<template>
  <v-row justify="center" align="center">
    <v-col cols="12" class="p-0">
      <home-slider/>
    </v-col>
    <v-col cols="12">
      <div class="d-flex space-between px-4">
        <h4 class="section-header d-inline">{{$t('latest_products')}}</h4>
        <div class="d-inline controllers">
          <nuxt-link :to="{name : `shop___${$i18n.locale}`}" class=" d-inline underline">{{$t('view_all')}}</nuxt-link>

        </div>
      </div>
      <home-products/>
    </v-col>
    <v-col cols="12">
      <home-banner/>
    </v-col>
    <v-col cols="12">
      <home-banner/>
    </v-col>
    <v-col cols="12">
      <div class="d-flex space-between px-4">
        <h4 class="section-header d-inline">{{$t('featured_products')}}</h4>
        <div class="d-inline controllers">
          <nuxt-link :to="{name : `shop___${$i18n.locale}`}" class=" d-inline underline">{{$t('view_all')}}</nuxt-link>

        </div>
      </div>
      <home-products/>
    </v-col>
  </v-row>
</template>

<script>

export default {

}
</script>
