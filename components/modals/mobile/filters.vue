<template>
  <div class="text-center">
    <v-bottom-sheet v-model="mobileFiltersModal">
      <v-list>
        <v-list-item>
          <v-flex>
            <v-chip
              v-if="filters.group.name !== null"
              class="ma-2"
              close
              @click:close="filters.group = null"
            >
              {{filters.group.name}}
            </v-chip>
            <v-chip
              v-if="filters.price.length > 0"
              class="ma-2"
              close
              @click:close="filters.price = null"
            >
               {{ $n(price[0], 'currency' , 'en') }} - {{ $n(price[1], 'currency' , 'en') }} 
            </v-chip>
          </v-flex>
        </v-list-item>
        <v-subheader>{{$t('categories')}}</v-subheader>
        <v-list-item
          v-for="group in groups"
          :key="group.id"
          @click.prevent="setGroup(group)"
          link
        >
          <v-list-item-title v-text="group.GroupName" v-if="$i18n.locale === 'ar'"></v-list-item-title>
          <v-list-item-title v-text="group.GroupNameEn" v-else></v-list-item-title>
        </v-list-item>
        <v-subheader>{{$t('price')}}</v-subheader>
        <v-list-item>
          <v-row>
            <v-col cols="12">
              <v-flex>
                <v-chip
                  class="ma-2"
                  color="primary"
                >
                 {{$t('from')}} {{ $n(price[0], 'currency' , 'en') }} 
                </v-chip>
                <v-chip
                  class="ma-2"
                  color="primary"
                >
                  {{$t('to')}} {{ $n(price[1], 'currency' , 'en') }}
                </v-chip>

              </v-flex>
            </v-col>
            <v-col cols="12">
              <v-range-slider
                v-model="price"
                @change="setPrice"
                dense
                hint="Im a hint"
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
    </v-bottom-sheet>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
// import addParamsToLocation from '@/utilities/helpers.js'
  export default {
    computed : {
        mobileFiltersModal: {
            get: function() {
				return this.$store.getters['ui/mobileFiltersModal']
            },
            set: function(newValue) {
                this.$store.commit('ui/mobileFiltersModal' , newValue)
            }
        },
        ...mapGetters({
          groups: 'group/groups',
          loading: 'group/loading',
          filters: 'product/filters',
        }),
    },
    data: () => ({
      price: [0, 500],
      chip1:true,
    }),
    methods:{
      apply(){
        const params = {}
        this.filters.group !== null ? params.group = this.filters.group.id : ''
        this.filters.price !== null ? params.priceFrom = this.filters.price[0] : ''
        this.filters.price !== null ? params.priceTo = this.filters.price[1] : ''
        this.addParamsToLocation(params)
        this.mobileFiltersModal  = false
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
        window.scrollTo({ top:0, behavior: 'smooth'});
        },
      setGroup(group){
        const name = this.$i18n.locale == 'ar' ? group.GroupName : group.GroupNameEn
        const groupFilter = {
          id : group.id,
          name
        }
        this.$store.commit('product/filtersGroup' , groupFilter)
      },
      setFilters(arr){
        let filters = {
          price : [],
          group: {
            id : null,
            name : null,
          },
        }
        arr.group ? filters.group.id = arr.group : ''
        arr.priceFrom ? filters.price[0] = arr.priceFrom : ''
        arr.priceFrom ? this.price[0] = arr.priceFrom : ''
        arr.priceTo ? filters.price[1] = arr.priceTo : ''
        arr.priceTo ? this.price[1] = arr.priceTo : ''
        this.$store.commit('product/filters' , filters)
      },
      setPrice(){
        this.$store.commit('product/filtersPrice' , this.price)
      }
    },
    
    created(){
      console.log(this.$route.query)
      const query = this.$route.query
      this.setFilters(query)
      this.$store.dispatch('group/get').then(() => {
        if(query.group){
          const selected = this.groups.filter(group => {
            return group.id == query.group ? group : ''
          })
          // console.log('selected')
          // console.log(selected)
          this.filters.group.name = this.$i18n.locale == 'ar' ?  selected[0].GroupName : selected[0].GroupNameEn
        }
      })
    }
  }
</script>