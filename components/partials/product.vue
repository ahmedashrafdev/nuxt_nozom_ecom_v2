<template>
     <v-skeleton-loader
        class="mx-auto"
        @click.prevent="$router.push({name : `shop-id___${$i18n.locale}` , params :{id : 1}})"
        type="card, list-item-two-line"
      ></v-skeleton-loader>
</template>