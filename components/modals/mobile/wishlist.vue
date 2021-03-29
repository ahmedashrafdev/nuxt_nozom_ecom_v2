<template>
  <v-row justify="center">
    <v-dialog
      v-model="mobileWishlistModal"
      fullscreen
      hide-overlay
      transition="slide-x-transition"
    >
      <v-card>
        <v-toolbar
          color="primary"
          dark
        >
          <v-btn
            icon
            @click.prevent="close"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title calss="text-white">{{$t('wishlist')}}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn
              dark
              text
              @click="save"
            >
              Save
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-list
          three-line
          subheader
        >
        
        </v-list>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
    computed : {
        mobileWishlistModal: {
            get: function() {
				return this.$store.getters['ui/mobileWishlistModal']
            },
            set: function(newValue) {
                this.$store.commit('ui/mobileWishlistModal' , newValue)
            }
        },
    },
    data () {
      return {
        sound: true,
        widgets: false,
      }
    },
    methods:{
        close(){
            console.log('asd')
            this.$store.commit('ui/mobileWishlistModal' , false)
        },
        save(){
            console.log('save')
        }
    }
  }
</script>