<template>
  <v-row justify="center" align="center">
    <v-col cols="12" class="p-0 user">
      <v-avatar color="primary mb-2">
        <v-icon dark>
          mdi-account-circle
        </v-icon>
      </v-avatar>
      <div class="pointer" @click.prevent="editAccount">
        <span class="title">{{$auth.user.user.name}}</span>
        <v-icon color="primary" small>
          mdi-pencil
        </v-icon>           
      </div>
    <v-subheader>{{$auth.user.user.email}}</v-subheader>
    </v-col>
    <v-col cols="12">
      <v-list flat>
      <v-list-item-group
        v-model="selectedItem"
        color="primary"
      >
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          @click.prevent="item.action(item.modal)"
        >
          <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="item.text"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
    </v-col>
    <modals-mobile-wishlist/>
    <modals-mobile-points/>
    <modals-mobile-addresses/>
    <modals-mobile-orders/>
    <modals-edit-account/>
  </v-row>
</template>

<script>
export default {
    middleware: 'auth',
    data(){
      const action = this.openModal
     
      return {
        selectedItem: 1,
        items: [
          { action , modal : 'mobileOrdersModal'  , text: 'order_history', icon: 'mdi-calendar-blank' },
          { action , modal : 'mobileWishlistModal'  , text: 'wishlist', icon: 'mdi-heart-outline' },
          { action , modal : 'mobileAddressesModal'  , text: 'shipping_addresses', icon: 'mdi-office-building-marker-outline' },
          { action , modal : 'mobilePointsModal'  , text: 'my_points', icon: 'mdi-gift-outline' },
          { action , modal : 'cart'  , text: 'my_cart', icon: 'mdi-cart-arrow-down' },
          { action , modal : 'logout'  , text: 'logout', icon: 'mdi-logout-variant' },
        ],

      }
    },

    methods:{
      openModal(modal){
        if(modal == 'cart') {
          this.$router.push({name : `shop-cart___${this.$i18n.locale}`})
          return
        } 
        if(modal == 'logout') {
          this.logout()
          return
        }
        this.$store.commit(`ui/${modal}` , true)
      },
      editAccount(){
        this.$store.commit('ui/editAccountModal' , true)
      },
      logout(){
        this.$auth.logout().then(() => {
          const snackbar = {
            active: true,
            text: 'logged out in successfully',
          }
          this.$store.commit('ui/setSnackbar', snackbar)
        })
      }
    }
  }
</script>
<style scoped>
.user{
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--bg-gray-darken);
  flex-direction: column;
}
.title{
  color: var(--primary-color);
}
</style>