<template>
  <div>
      
      <v-autocomplete
        v-model="model"
        :items="items"
        :loading="isLoading"
        :search-input.sync="search"
        rounded
        flat
        hide-details
        color="white"
        item-text="Description"
        item-value="API"
        placeholder="Start typing to Search"
        prepend-icon="mdi-magnify"
        class="bg-gray"
        return-object
        dense

      ></v-autocomplete>
    <v-expand-transition>
      <v-list
        v-if="model"
        class="red lighten-3"
      >
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
        >
          <v-list-item-content>
            <v-list-item-title v-text="item.ItemName"></v-list-item-title>
            <v-list-item-subtitle v-text="item.ItemNameEn"></v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-expand-transition>
  </div>
</template>

<script>
  export default {
    data: () => ({
      descriptionLimit: 60,
      items: [],
      isLoading: false,
      model: null,
      search: null,
    }),


    watch: {
      search (val) {
    //       this.model = true
    //     // Items have already been loaded
    //     if (this.items.length > 0) return

    //     // Items have already been requested
    //     if (this.isLoading) return

    //     this.isLoading = true

    //     // Lazily load input items
    //     console.log(val)
    // this.$store.dispatch('product/searchProducts' , val)
    //       .then(res => {
    //         const { count, entries } = res
    //         this.count = count
    //         this.isLoading = false
    //         this.items = res.data
    //       })
    //       .catch(err => {
    //         this.isLoading = false
    //         console.log(err)
    //       })
      },
    },
  }
</script>