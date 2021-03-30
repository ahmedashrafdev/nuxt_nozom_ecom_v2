<template>
  <v-app dark>
    <v-app-bar
      fixed
      app
    >
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-btn
        icon
        @click.prevent="$router.push({name : `shop-cart___${$i18n.locale}`})"
      >
        <v-icon>mdi-cart-arrow-down</v-icon>
      </v-btn>
      <v-btn
        icon
      >
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <v-btn
        icon
        v-if="$i18n.locale == 'en'"
        @click.prevent="switchLanguage"
      >
        <v-icon>mdi-abjad-arabic</v-icon>
      </v-btn>
      <v-btn
        icon
        v-else
        @click.prevent="switchLanguage"
      >
        <v-icon large>mdi-alpha-e</v-icon>
      </v-btn>
    </v-app-bar>
    <layouts-app-nav/>
    <v-main>
        <nuxt />
    </v-main>
    <layouts-app-footer/>
    <v-bottom-navigation v-model="value" fixed>
      <v-btn v-for="(item , index) in bottomNavs" :key="index" :value="item.value" @click.prevent="goTo(item.to)"> 
        <span>{{$t(item.title)}}</span>
        <v-icon>{{item.icon}}</v-icon>
      </v-btn>
    </v-bottom-navigation>

    <modals-mobile-categories/>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      title: 'Home',
      bottomNavs: [
        {
          title : 'home',
          value : 'index',
          to : 'index',
          icon : 'mdi-home-outline',
        },
        {
          title : 'categories',
          to : 'categories',
          value : 'categories',
          icon : 'mdi-book-multiple-outline',
        },
        {
          title : 'store',
          to : 'shop',
          value : 'shop',
          icon : 'mdi-store-outline',
        },
        {
          title : 'account',
          to : 'account',
          value : 'account',
          icon : 'mdi-account-outline',
        },
      ],
      value : '',
    }
  },
  methods:{
    goTo(to){
      if(to == 'categories'){
				this.$store.commit('ui/mobileCategoriesModal', true)

        console.log('categories')
        return 
      }
      // console.log(to)
      this.$router.push({name : `${to}___${this.$i18n.locale}`})
    },
    switchLanguage(){
      const locale = this.$i18n.locale === 'en' ? 'ar' : 'en'
      console.log('asd')
      this.$router.push({name : `index___${locale}`})
    }
  }
}
</script>
