const app = Vue.createApp({
    data() {
        return {
            product: 'Socks',
            image: './assets/images/socks_green.jpg',
          inStock: true,
          details: ['50% cotton', '30% wool', '20% polyester']
            ,
            variants: [
                { id: 2234, color: 'green', image: './assets/images/socks_green.jpg'},
                { id: 2235, color: 'blue', image: './assets/images/socks_blue.jpg'},
            ]
            ,selectedVariant: 0,
        }
    }
      ,  methods: {
            addToCart() {
                this.cart += 1
            },
            updatedVariant(indedx) {
                this.selectedVariant = index
                console.log(index)
            }
        }
        ,computed: {
            title() {
                return this.brand + ' ' + this.product
            }
          ,  image() {
                return this.variants[this.selectedVariant].image
            }
            ,  inStock() {
                return this.variants[this.selectedVariant].quantity
            }
        }
})
