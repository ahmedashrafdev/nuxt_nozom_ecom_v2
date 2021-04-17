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
              <home-banner :loading="false" img="https://dfcdn.defacto.com.tr/Mobile/2-li-alan-accessories_176c0825-8ddd-4d3f-988d-350f3f8b004e_815726b1-2c0c-40ff-9c56-65488bbeab49_DI_222.jpg"/>
            </v-col>
            <v-col cols="12" sm="6">
              <home-banner :loading="false" img="https://dfcdn.defacto.com.tr/Mobile/2-li-alan-oversize-en_0e513df9-563b-4d58-a79d-8bd163b1f55a_3a80de69-9d12-4cd0-8e94-0a55896a1bda_DI_222.jpg"/>
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