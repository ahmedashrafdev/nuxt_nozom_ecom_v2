<template>
  <v-row justify="center">
    <v-dialog
      v-model="mobileFiltersModal"
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
          <v-toolbar-title calss="text-white">{{$t('filters')}}</v-toolbar-title>
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
        <v-list>
          <v-subheader>{{$t('categories')}}</v-subheader>
          <v-list-group
            :value="true"
            prepend-icon="mdi-fruit-grapes-outline"
          >
            <template v-slot:activator>
              <v-list-item-title>categories</v-list-item-title>
            </template>
              <v-list-item
                v-for="([title, icon], i) in admins"
                :key="i"
                link
              >
                <v-list-item-icon>
                  <v-icon v-text="icon"></v-icon>
                </v-list-item-icon>
                <v-list-item-title v-text="title"></v-list-item-title>

              </v-list-item>
            
          </v-list-group>
          <v-subheader>{{$t('price')}}</v-subheader>
              <v-list-item>
                <v-range-slider
                  v-model="price"
                  dense
                  hint="Im a hint"
                  max="500"
                  min="0"
                ></v-range-slider>
              </v-list-item>
            
        </v-list>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
    computed : {
        mobileFiltersModal: {
            get: function() {
				return this.$store.getters['ui/mobileFiltersModal']
            },
            set: function(newValue) {
                this.$store.commit('ui/mobileFiltersModal' , newValue)
            }
        },
    },
    data () {
      return {
        sound: true,
        price: [0, 500],
        widgets: false,
        admins: [
        ['Management', 'mdi-account-multiple-outline'],
        ['Settings', 'mdi-cog-outline'],
        ],
        cruds: [
          ['Create', 'mdi-plus-outline'],
          ['Read', 'mdi-file-outline'],
          ['Update', 'mdi-update'],
          ['Delete', 'mdi-delete'],
        ],
      }
    },
    methods:{
        close(){
            console.log('asd')
            this.$store.commit('ui/mobileFiltersModal' , false)
        },
        save(){
            console.log('save')
        }
    }
  }
</script>