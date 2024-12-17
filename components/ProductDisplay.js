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
        
        <!-- Review Section -->
        <div class="review-section">
          <h2>Reviews</h2>
          <form @submit.prevent="submitReview">
            <label for="name">Name:</label>
            <input id="name" v-model="review.name" required>

            <label for="review">Review:</label>
            <textarea id="review" v-model="review.text" required></textarea>

            <label for="rating">Rating:</label>
            <select id="rating" v-model.number="review.rating" required>
              <option disabled value="">Select a rating</option>
              <option v-for="n in 5" :key="n" :value="n">{{ n }}</option>
            </select>

            <button type="submit" class="button">Submit Review</button>
          </form>
          
          <ul v-if="reviews.length" class="review-list">
            <li v-for="(review, index) in reviews" :key="index">
              <p><strong>{{ review.name }}</strong> rated it {{ review.rating }} stars</p>
              <p>"{{ review.text }}"</p>
            </li>
          </ul>
          <p v-else>No reviews yet. Be the first to review!</p>
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
            ],
            reviews: [], // Stores all reviews
            review: {    // Stores the current review being filled
                name: '',
                text: '',
                rating: null
            }
        };
    },
    methods: {
        addToCart() {
            this.$emit('add-to-cart');
        },
        updateVariant(index) {
            this.selectedVariant = index;
        },
        submitReview() {
            if (this.review.name && this.review.text && this.review.rating) {
                this.reviews.push({ ...this.review });
                // Clear the review form
                this.review.name = '';
                this.review.text = '';
                this.review.rating = null;
            }
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
            return this.premium ? 'Free' : '$2.99';
        }
    }
});
