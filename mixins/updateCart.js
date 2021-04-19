
import {mapGetters} from 'vuex'
export default {
    data () {
      return {
        inCart : [],
        inWishlist: [],
        qty : 1,
        qtys : [],
      }
    },
    computed : {
      ...mapGetters({
        activeCart: 'cart/activeCart',
        activeWishlist: 'wishlist/activeWishlist',
      }),
  },
    methods:{
      getProduct(payload){
      this.$store.dispatch('product/getProduct' , payload)
      .then(res => {
        const color = res.initialColor
        history.pushState(
            {},
            null,
            this.$route.path +
            `?color=${color}`
        )
      })
      },
      addToCart(){
        if(this.$auth.loggedIn){
          if(this.product.hasOptions){
            if(this.$route.name == `shop-id___${this.$i18n.locale}`){
              if(this.$route.query.color && this.$route.query.size){
                let payload = {product: this.product.id , qty :this.qty , color :this.$route.query.color , size : this.$route.query.size }
                this.$store.dispatch('cart/create', payload)
                .then(() => {
                  this.inCart.push(this.product.id)
                  this.product.InCart = true
                })
              } else{ 
                const snackbar = {
                  active : true,
                  text: 'please_select_option'
                }
                this.$store.commit('ui/setSnackbar' , snackbar)
              }
            } else {
              let payload = {
                id : this.product.id,
                filters :{}
              }
              this.getProduct(payload)
              
              this.$store.commit('ui/addToCartModal' , true)
              
            }
          } else {
            let payload = {product: this.product.id , qty :this.qty}
            this.$store.dispatch('cart/create', payload)
            .then(() => {
              this.inCart.push(this.product.id)
              this.product.InCart = true
            })
          }
        } else {
          const snackbar = {
              active : true,
              text: 'logged in successfully'
          }
          this.$store.commit('ui/setSnackbar' , snackbar)
          localStorage.setItem('product' , this.product.id )
          localStorage.setItem('qty' , this.qty )
  
          this.$router.push('/login')
        }
      },
      addToWishlist() {
          if(this.$auth.loggedIn){
            this.$store.dispatch('wishlist/create', {product: this.product.id})
            .then(res => {
              console.log(res.data)
              if(res.data == 'deleted'){
                let index = this.inWishlist.indexOf(this.product.id);
                if (index !== -1) {
                  this.inWishlist.splice(index, 1);
                }
                // this.inWishlist.remove(this.product.id)
              }else {
                this.inWishlist.push(this.product.id)
              }
            })
          } else {
             const snackbar = {
              active : true,
              text: 'logged in successfully'
          }
          this.$store.commit('ui/setSnackbar' , snackbar)
          localStorage.setItem('productW' , this.product.id )
          localStorage.setItem('qtyW' , this.qty )
          this.$router.push('/login')
          }
      },
      updateQty() {
        const payload = {
          id : this.product.id,
          qty : this.qty
        }
        this.$store.dispatch('cart/update' , payload)
      },
      decrease(){
        const index = this.qtys.indexOf(this.qty)
        if(index !== 0){
          this.qty = this.qtys[index-1]
          this.updateQty()
        }
      },
      increase(){
        const index = this.qtys.indexOf(this.qty)
        if(index !== this.qtys.length -1)
        this.qty = this.qtys[index + 1]
        this.updateQty()
      },
    },
    created(){
      const qtys = [1,2,3,4,5,6,7,8,9,10] 
      const weights = [
        .25 , .5 , .75 , 1,
        1.25 , 1.5 , 1.75 ,2,
        2.25 , 2.5 , 2.75 , 3,
        3.25 ,3.5 , 3.75 , 4,
        4.25 , 4.5 , 4.75 , 5,
        5.25 , 5.5 , 5.75 , 6,
        6.25 , 6.5 , 6.75 , 7,
        7.25 , 7.5 , 7.75 , 8,
        8.25 , 8.5 , 8.75 , 9,
        9.25 , 9.5 , 9.75 , 10,
        10.25 , 10.5 , 10.75 , 11,
        11.25 , 11.5 , 11.75 , 12,
        12.25 , 12.5 , 12.75 , 13,
        13.25 , 13.5 , 13.75 , 14,
        14.25 , 14.5 , 14.75 , 15,
        15.25 , 15.5 , 15.75 , 16,
        16.25 , 16.5 , 16.75 , 17,
        17.25 , 17.5 , 17.75 , 18,
        18.25 , 18.5 , 18.75 , 19,
        19.25 , 19.5 , 19.75 , 20,
    ]
      if(this.$route.name == `shop-id___${this.$i18n.locale}`){
        this.$store.dispatch('product/getProduct' , this.$route.params.id)
        .then(() => {
          console.log('asd')
          this.qtys = this.product.ByWeight === 1 ? weights : qtys
          this.qty = this.product.cartQty ? this.product.cartQty : 1
        })
      } else {
        console.log('asdasd')
        this.qtys = this.product.ByWeight === 1? weights : qtys
        this.qty = this.product.cartQty ? this.product.cartQty : 1
      }
    },
  }