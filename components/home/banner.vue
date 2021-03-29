<template>
<div>
    <v-skeleton-loader
      width="100%"
      height="150px"
      type="image"
      v-if="loading"
    >
    </v-skeleton-loader>
    <v-img :src="img" v-else></v-img>
</div>
</template>
<script>
export default {
  props:['img' , 'loading']
}
</script>