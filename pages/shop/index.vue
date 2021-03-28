<template>
<div class="shop">
  <v-row justify="center" align="center">
   <v-col cols="12 p-0">
     <layouts-breadcrumbs/>
   </v-col>
    <v-col cols="12" class="mt-4 filters">
     <div class="sort d-flex items-center">
       <span class="mr-2">sorting:</span>
       <v-select
          :items="items"
          label="Solo field"
          dense
          hide-details
          solo
        ></v-select>
     </div>
    </v-col>
  </v-row>
</div>
</template>

<script>

export default {
  mounted(){
    console.log(this.$route.name)
  },
  data(){
    return{
      items: ['Foo', 'Bar', 'Fizz', 'Buzz'],
      }
    },
}
</script>
