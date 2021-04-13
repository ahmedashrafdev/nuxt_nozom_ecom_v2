<template>
  <div>
      <v-list>
        <v-subheader>{{$t('categories')}}</v-subheader>
        <v-list-item
          v-for="group in groups"
          :key="group.id"
          @click.prevent="setGroup(group)"
          link
        >

          <v-icon>mdi-{{group.icon}}</v-icon>
          <v-list-item-title v-text="group.GroupName" v-if="$i18n.locale === 'ar'"></v-list-item-title>
          <v-list-item-title v-text="group.GroupNameEn" v-else></v-list-item-title>
        </v-list-item>
        <v-subheader>{{$t('price')}}</v-subheader>
        <v-list-item>
          <v-row>
            <v-col cols="12">
              <div class="d-flex">
                <v-chip
                  class="ma-2"
                  color="primary"
                >
                 {{ $n(price[0], 'currency' , 'en') }} 
                </v-chip>
                <v-chip
                  class="ma-2"
                  color="primary"
                >
                {{ $n(price[1], 'currency' , 'en') }}
                </v-chip>

              </div>
            </v-col>
            <v-col cols="12">
              <v-range-slider
                v-model="price"
                @change="setPrice"
                dense
                max="500"
                min="0"
              ></v-range-slider>
            </v-col>
          </v-row>
        </v-list-item>
        <v-list-item>
          <v-btn @click.prevent="apply" class="d-block w-full" color="primary">{{$t('apply')}}</v-btn>
        </v-list-item>
      </v-list>
  </div>
</template>

<script>
import filters from '@/mixins/filters.js'
// import addParamsToLocation from '@/utilities/helpers.js'
  export default {
    mixins : [filters],
    
  }
</script>