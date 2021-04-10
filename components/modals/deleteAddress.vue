<template>
  <v-dialog
        transition="dialog-bottom-transition"
        max-width="600"
         v-model="deleteAddressModal.active"
      >
          <v-card>
            <v-toolbar
              color="danger"
              v-if="!restricted"
              dark
            >
            {{$t('are_you_sure_delete_address')}}
          </v-toolbar>
          <v-toolbar
            color="danger"
            v-else
            dark
          >
            {{$t('delete_restricted')}}
          </v-toolbar>
            <v-card-text  v-if="restricted">
             {{$t('cant_delete_address')}}
            </v-card-text>
            <v-card-text v-else></v-card-text>
            <v-card-actions v-if="!restricted" class="justify-end">
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
        restricted: false,
        points : 300,
        widgets: false,
      }
    },
    methods:{
        close(){
      this.restricted = false
            this.$store.commit('ui/deleteAddressModal' , {active : false , id : null})
        },
        remove(){
           this.$store.dispatch('user/deleteAddress' , this.deleteAddressModal.id)
           .catch(e => {
              this.restricted = true
           })
        },
        save(){
            console.log('save')
        }
    },
  }
</script>