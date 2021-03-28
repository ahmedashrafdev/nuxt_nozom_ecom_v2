<template>
<div class="shop">
  <v-row justify="center" align="center">
   <v-col cols="12 p-0">
     <layouts-breadcrumbs/>
   </v-col>
    <v-col cols="12" class="filters">
     <div class="sort d-flex">
       <span>sorting</span>
       <v-select
          :items="items"
          label="Solo field"
          dense
          solo
        ></v-select>
       <span>sorting</span>
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
