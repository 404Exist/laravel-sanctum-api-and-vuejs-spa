<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-12">
                <div class="card">
                    <div class="card-header">Products</div>
                    <div class="card-body">
                        <div class="posts" v-for="(product, index) in products" :key="index">
                            <em v-text="product.created_at"></em><br>
                            <strong v-text="product.name"></strong>
                            <p v-text="product.description"></p>
                            <em v-text="product.price"></em><br><hr><br>
                        </div>
                        <div class="posts" v-for="(product, index) in createdProducts" :key="index">
                            <em v-text="product.created_at"></em><br>
                            <strong v-text="product.name"></strong>
                            <p v-text="product.description"></p>
                            <em v-text="product.price"></em><br>
                        </div>
                    </div>
                </div>
                <div class="card mt-4 mb-4">
                    <div class="card-header">Create Product</div>
                    <div class="card-body">
                        <form @submit.prevent="createProduct">
                           <div class="alert alert-danger" v-if="'message' in createProductErrors">
                               <p>{{ createProductErrors.message }}</p>
                               <ul>
                                   <li v-for="(errors, index) in createProductErrors.errors" :key="index">
                                       <b v-for="(error, index) in errors" :key="index">{{error}}</b>
                                   </li>
                               </ul>
                           </div>
                            <div class="form-group">
                                <label for="name">Product name</label>
                                <input type="text" name="name" id="name" v-model="formData.name"  class="form-control"/>
                            </div>
                            <div class="form-group">
                                <label for="description">Description</label>
                                <textarea name="description" id="description" v-model="formData.description"  class="form-control"> </textarea>
                            </div>
                            <div class="form-group">
                                <label for="price">price</label>
                                <input type="number" name="price" id="price" v-model="formData.price"  class="form-control" />
                            </div>
                            <input type="submit" value="Create" class="btn btn-primary"/>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                formData: {
                    name: '',
                    slug: '',
                    description: '',
                    price: '',
                },
                createdProducts: [],
                products: [],
                createProductErrors : [],
            }
        },
        mounted() {
            if (this.$store.getters.currentUser == null) {
                this.$router.push({path: '/login'});
            }
            this.getProducts();
        },
        methods: {
            createProduct() {
                this.$data.formData.slug = this.$data.formData.name.toLowerCase().replace(' ','-');
                const userToken = JSON.parse(localStorage.getItem('user'));
                axios({
                    method: 'post',
                    url: '/api/product',
                    data: this.$data.formData,
                    headers: {
                        Authorization: 'Bearer ' + userToken.token
                    }
                })

                .then(response => {
                    this.createdProducts.push(response.data);
                    this.$data.formData = {name: '', slug: '', description: '', price: ''};
                    this.createProductErrors=[]
                })
                .catch(error => this.createProductErrors = error.response.data);
            },
            getProducts() {
                axios.get('/api/products')
                .then(response => this.products = response.data)
                .catch(error => console.log(error));
            }
        }
    }
</script>
