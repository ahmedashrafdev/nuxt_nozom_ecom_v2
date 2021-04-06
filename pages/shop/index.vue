<template>
<div class="shop">
  <v-container>
    <v-row justify="center" align="center">
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
        <div class="d-flex flex-wrap space-between px-4">
          <div class="applied-filters d-flex max-w-80 flex-wrap">
            <v-flex v-if="filters">
              <v-chip
                v-if="filters.group !== null"
                class="ma-2"
                close
                @click:close="filters.group = null"
              >
                {{filters.group.name}}
              </v-chip>
              <v-chip
                v-if="filters.price !== null"
                class="ma-2"
                close
                @click:close="filters.price = null"
              >
                {{ $n(filters.price[0], 'currency' , 'en') }} - {{ $n(filters.price[1], 'currency' , 'en') }}
              </v-chip>
            </v-flex>
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
          {{$t('showing')}} {{products.total}} {{$t('products')}}
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
              :length="products.last_page"
              @input="paginate"
              :total-visible="10"
            ></v-pagination>
        </div>
      </v-col>
    </v-row>
  </v-container>
  <modals-mobile-filters/>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      products: 'product/products',
      filters: 'product/filters',
      loading: 'product/loading',
    })
  },

  created(){
    // console.log(this.$route)
    const payload = {}
    this.$route.query.group ? payload.group = this.$route.query.group : ''
    this.$route.query.PriceFrom ? payload.PriceFrom = this.$route.query.PriceFrom : ''
    this.$route.query.PriceTo ? payload.PriceTo = this.$route.query.PriceTo : ''
    this.$route.query.page ? payload.page = this.$route.query.page : ''
    this.$route.query.page ? this.page = this.$route.query.page : ''
    this.$store.dispatch('product/getProducts' , payload)
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

    },
    paginate(page){
      let query = this.$route.query
      query.page = page
      this.addParamsToLocation(query)
    },
    addParamsToLocation(params) {
      this.$store.dispatch('product/getProducts' , params)
      history.pushState(
        {},
        null,
        this.$route.path +
          '?' +
          Object.keys(params)
            .map(key => {
              return (
                encodeURIComponent(key) + '=' + encodeURIComponent(params[key])
              )
            })
            .join('&')
      )
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