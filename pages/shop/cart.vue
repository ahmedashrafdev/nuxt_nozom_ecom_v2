<template>
  <v-row justify="center" align="center">
    <v-col cols="12">
      <v-stepper alt-labels v-model="e1">
        <v-stepper-header>
          <v-stepper-step
            :complete="e1 > 3"
            step="1"
          >
            {{ $t('cart')}}
          </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step
            :complete="e1 > 2"
            step="2"
          >
            {{ $t('shipping')}}
          </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step step="3"  :complete="e1 > 3">
            {{ $t('payment')}}
          </v-stepper-step>
          <v-divider></v-divider>

          <v-stepper-step step="4">
            {{ $t('done')}}
          </v-stepper-step>
        </v-stepper-header>

        <v-stepper-items>
          <v-stepper-content step="1">
            <shop-cart @clicked="clicked"/>
          </v-stepper-content>

          <v-stepper-content step="2">
            <shop-shipping/>
          </v-stepper-content>

          <v-stepper-content step="3">
            <shop-payment/>
          </v-stepper-content>
          <v-stepper-content step="4">
            <h1>done</h1>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-col>
  </v-row>
</template>

<script>

export default {
  data () {
    return {
      e1:1,
    }
  },
  methods:{
    clicked(){
      console.log('clic ')
      this.el = 2
      console.log(this.el)
    }
  },
  mounted(){
    console.log(this.$route.name)
  }
}
</script>
