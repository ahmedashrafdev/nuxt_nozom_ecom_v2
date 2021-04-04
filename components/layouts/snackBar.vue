<template>
  <div class="text-center ma-2">
    <v-snackbar
      v-model="snackbar.active"
      :timeout="3000"
    >
      {{ $t(snackbar.text) }}

      <template v-slot:action="{ attrs }">
        <v-btn
          text
          v-bind="attrs"
          @click="close()"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import { mapGetters , mapMutations } from 'vuex';

export default {
    computed: {
      ...mapGetters({
          snackbar: 'ui/snackbar',
      })
    },
    methods:{
      close(){
        this.$store.dispatch('ui/setSnackbar' , {active: false,text: ''})
      }
    }
}
</script>