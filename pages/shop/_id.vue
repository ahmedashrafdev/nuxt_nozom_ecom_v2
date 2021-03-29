<template>
<div class="shop">
  <v-row justify="center" align="center">
   <v-col cols="12 p-0">
     <layouts-breadcrumbs/>
   </v-col>
    <v-col cols="12">
      <v-row>
        <v-col cols="12">
          <v-skeleton-loader
            width="100%"
            type="image"
          >
          </v-skeleton-loader>
        </v-col>
        <v-col cols="12">
          <h2 class="product-title larger mb-2">name</h2>
         
          <p class="p">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis, quibusdam quos? Minima iure repellendus quia dignissimos perspiciatis similique consequatur optio reiciendis, repudiandae aperiam iste aspernatur, dicta asperiores corrupti distinctio soluta?
          </p>
          <div class="price  text-h4">
            <span class="text-primary">{{ $n(100, 'currency' , 'en') }}</span>
            <del>{{ $n(120, 'currency' , 'en') }}</del>
          </div>
          <div class="qty">
            <div class="d-flex atc items-center py-2">
              <v-icon @click.prevent="qty++" small>mdi-plus</v-icon>
              <v-text-field class="atc-input"  v-model="qty"/>
              <v-icon @click.prevent="qty--" small>mdi-minus</v-icon>
            </div>
          </div>
          <div class="btns d-flex">
            <v-btn text  class="border  p-4 rounded-xl">
              <v-icon>mdi-cart-arrow-down</v-icon>
              {{$t('add_to_cart')}}
            </v-btn>
             <v-btn
              class="mx-2 p-4  border"
              fab
              text
              light
              small
            >
              <v-icon light>
                mdi-heart
              </v-icon>
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
  <modals-mobile-filters/>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  mounted(){
    console.log(this.$route.name)
  },
  computed: {
    ...mapGetters({
      products: 'shop/products'
    })

  },
  data(){
    return {
      page: 1,
      qty : 1,
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