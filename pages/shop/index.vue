<template>
<div class="shop">
  <v-row justify="center" align="center">
   <v-col cols="12 p-0">
     <layouts-breadcrumbs/>
   </v-col>
    <!-- <v-col cols="12" class="mt-4 filters font-gray">
     <div class="sort d-flex items-center">
       <span class="mr-2">sorting:</span>
       <v-select
          :items="items"
          label="sorting"
          class="rounded-xl bg-gray no-shadow"
          cache-items
          elivation="0"
          v-model="sorting"
          single-line
          dense
          hide-details
          solo
        ></v-select>
     </div>
    </v-col> -->
    <v-col class="top-icons" cols="12">
      <div class="d-flex space-between px-4">
        <div class="applied-filters d-flex max-w-80 flex-wrap">
          <v-skeleton-loader
            v-for="i in 2"
            :key="i"
            type="chip"
          >
          </v-skeleton-loader>
        </div>
        <div>
          <v-icon @click.prevent="openFiltersModal">mdi-filter-outline</v-icon>
          <v-icon @click.prevent="openFiltersModal">mdi-format-list-bulleted</v-icon>
          <v-icon @click.prevent="openFiltersModal">mdi-view-grid-outline</v-icon>
        </div>
      </div>
    </v-col>
    <v-col cols="12">
      <div class="showing text-center">
        {{$t('showing')}}
      </div>
    </v-col>
    <v-col cols="12">
      <v-row>
        <v-col cols="6" v-for="(product , index) in products.data" :key="index">
          <partials-product :product="product"/>
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="12">
      <div class="text-center">
        <v-pagination
          v-model="page"
          :length="15"
          :total-visible="7"
        ></v-pagination>
      </div>
    </v-col>
  </v-row>
  <modals-mobile-filters/>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      products: 'product/products',
      loading: 'product/loading',
    })
  },

  created(){
    const payload = { }
    this.$store.dispatch('product/getProducts' , payload)
    // console.log(payload)
    // this.$store.dispatch('product/getProducts' ,payload)
  },
  data(){
    return {
      page: 1,
      sorting:'Foo',
      items: ['Foo', 'Bar', 'Fizz', 'Buzz'],
    }
  },
  methods:{
    openFiltersModal(){
				this.$store.commit('ui/mobileFiltersModal', true)

    }
  }
  
}
</script>

<style scoped>
.applied-filters div:not(:last-child){
  margin: 0 10px 10px 0;
}
.showing{
  border-top: 1px solid var(--border-color);
  border-bottom: 1px solid var(--border-color);
  padding: 10px 0;
}
</style>