export default {

  methods :{
      paginate(page){
        let query = this.$route.query
        query.page = page
        this.addParamsToLocation(query)
        .then(() => {
          this.$store.dispatch('product/getProducts' , params)
        })
      },
      clearFilter(filter){
        let query = this.$route.query
        if(filter == 'group'){
          this.$store.commit('product/groupFilter' , {id : null,name : null})
          delete query.group
        }
  
        if(filter == 'price'){
            this.$store.commit("product/priceFrom" , null)
            this.$store.commit("product/priceTo" , null)
            delete query.priceFrom
            delete query.priceTo 
            this.price = [0,500]
        }
        this.addParamsToLocation(query)
        .then(() => {
          this.$store.dispatch('product/getProducts' , params)
        })
      },
      getProduct(payload){
          //check if we dont need to perform loading
        payload.loading = payload.loading !== false ? true : false
        this.$store.dispatch('product/getProduct' , payload)
        .then(() => {
          //toggle image of the colors filter applied
          if(payload.filters.color){
            const image = this.product.images.filter(img => {
              return img.color  === payload.filters.color
            })
            if(image[0]){
              this.tabs = this.product.images.indexOf(image[0])
            }
          }
          //check if the product is by weight to set qtys or weights
          this.qtys = this.product.ByWeight == 0 ? 
            this.$store.getters['ui/qtys']
            : 
            this.$store.getters['ui/weights']
          // set the cart qty from the server
          this.qty = this.product.cartQty ? this.product.cartQty : 1
        })
      },
      getProducts(payload) {
        this.$store.dispatch('product/getProducts' , payload)
      },
      filter(type , value){
        let query = this.$route.query
        if(query[type] == value){
          delete query[type]
        } else {
          query[type] = value
        }
        this.addParamsToLocation(query)
        .then(() => {
          let payload = {
            id : this.$route.params.id,
            loading : false,
            filters :query
          }
          this.getProduct(payload)
        })
      },
      addParamsToLocation(params) {
        return new Promise(() => {
          history.pushState(
              {},
              null,
              this.$route.path +
              '?' +
              Object.keys(params)
                  .map(key => {
                  return (
                      encodeURIComponent(key) + '=' + encodeURIComponent(params[key])
                  )
                  })
                  .join('&')
          )
          window.scrollTo({ top:0, behavior: 'smooth'});
        })
      },
      initShop() {
        const payload = {}
        //handle the case if the group filter applied or not
        if(this.$route.query.group){
          let name = ""
          payload.group = this.$route.query.group
          this.$store.dispatch('group/find' , this.$route.query.group)
          .then(res => {
              name = this.$i18n.locale == 'ar' ? res.GroupName : res.GroupNameEn
              const groupFilter = {
                id : this.$route.query.group,
                name
              }
              this.$store.commit('product/groupFilter' , groupFilter)
          })
        } else {
              this.$store.commit('product/groupFilter' , {id : null , name : null})
        }
        //handle the case if the price filter applied
        if(this.$route.query.priceFrom){
          payload.priceFrom = this.$route.query.priceFrom 
          payload.priceTo = this.$route.query.priceTo 
        }
        //handle the pagination
        if(this.$route.query.page){
          payload.page = this.$route.query.page
          this.page = parseInt(this.$route.query.page)
        }
        this.getProducts(payload)
      },
      initSingleProduct() {
        let payload = {
          id : this.$route.params.id,
          filters :{}
        }
        //check if query parameter has color filter and apply it
        this.$route.query.color ? payload.filters.color = this.$route.query.color : ''
        //check if query parameter has size filter and apply it
        payload.filters.size = this.$route.query.size
    
        this.getProduct(payload)
      }
  },
  created(){
    if(this.$route.name == `shop-id___${this.$i18n.locale}`){
      this.initSingleProduct()
    }
    if(this.$route.name == `shop___${this.$i18n.locale}`){
      this.initShop()
    } 
  },
}