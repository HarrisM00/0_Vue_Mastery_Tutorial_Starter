app.component('product-display', {
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },
    template: 
    /*html*/
    `<div class="product-display">
        <div class="product-container">
          <div class="product-image">
            <img :src="image" :alt="product">
          </div>
          <div class="product-info">
            <h1>{{ title }}</h1>
            <p v-if="inStock">In Stock</p>
            <p v-else>Out of Stock</p>
            <p v-if="inStock">Shipping: {{ shipping }}</p>
            <ul>
              <li v-for="detail in details" :key="detail">{{ detail }}</li>
            </ul>
            <div>
              <span v-for="(variant, index) in variants" :key="variant.id"
                    class="color-circle" 
                    :style="{ backgroundColor: variant.color }" 
                    @mouseover="updateVariant(index)">
              </span>
            </div>
            <button class="button" 
                    :class="{ disabledButton: !inStock }" 
                    :disabled="!inStock" 
                    @click="addToCart">
              Add to Cart
            </button>
          </div>
        </div>
      </div>`,
    data() {
        return {
            product: 'Socks',
            brand: 'Vue Mastery',
            selectedVariant: 0,
            details: ['50% cotton', '30% wool', '20% polyester'],
            variants: [
                { id: 2234, color: 'green', image: './assets/images/socks_green.jpg', quantity: 10 },
                { id: 2235, color: 'blue', image: './assets/images/socks_blue.jpg', quantity: 0 }
            ]
        };
    },
    methods: {
        addToCart() {
            this.$emit('add-to-cart');
        },
        updateVariant(index) {
            this.selectedVariant = index;
        }
    },
    computed: {
        title() {
            return this.brand + ' ' + this.product;
        },
        image() {
            return this.variants[this.selectedVariant].image;
        },
        inStock() {
            return this.variants[this.selectedVariant].quantity > 0;
        },
        shipping() {
            return this.premium ? '$2.99' : '$2.99';
        }
    }
});
