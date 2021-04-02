<template>
<v-dialog
        transition="dialog-bottom-transition"
        max-width="600"
         v-model="deleteAddressModal.active"
      >
          <v-card>
            <v-toolbar
              color="danger"
              dark
            >{{$t('are_you_sure_delete_address')}}</v-toolbar>
            <v-card-text>
             
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn
                text
                @click="close"
              >
              <v-icon>mdi-close</v-icon>
              {{$t('close')}}</v-btn>
              <v-btn
                text
                @click="remove"
                class="danger"
                
              >
              <v-icon>mdi-trash-can-outline</v-icon>
              
              {{$t('sure')}}</v-btn>
            </v-card-actions>
          </v-card>
      </v-dialog>
</template>

<script>
export default {
    computed : {
        deleteAddressModal: {
            get: function() {
				      return this.$store.getters['ui/deleteAddressModal']
            },
            set: function(newValue) {
              this.$store.commit('ui/deleteAddressModal' , newValue)
            }
        },
        
    },
    data () {
      return {
        sound: true,
        points : 300,
        widgets: false,
      }
    },
    methods:{
        close(){
            console.log('asd')
            this.$store.commit('ui/deleteAddressModal' , false)
        },
        remove(){
           this.$store.dispatch('user/deleteAddress' , this.deleteAddressModal.id)
        },
        save(){
            console.log('save')
        }
    }
  }
</script>