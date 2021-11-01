<template>
    <div class="container">
        <!-- Login Form -->
        <div class="row mt-4"  v-if="!user.token.length">
            <div class="col-6 offset-3">
                <form action="#" @submit.prevent="hanleLogin">
                    <h3>Sign in</h3>
                    <div class="form-group">
                        <input type="email" name="email" class="form-control" v-model="formData.email" placeholder="Email Address" />
                    </div>
                    <div class="form-group">
                        <input type="password" name="password" class="form-control" v-model="formData.password" placeholder="Password" />
                    </div>
                    <div class="form-group">
                        <input type="submit" class="btn btn-primary" value="Sign In" />
                    </div>
                </form>
            </div>
        </div>
        <!-- secrets list -->
        <div class="row mt-4">
            <div class="col-6 offset-3">
                <h3>My token</h3>
                <div class="secret" v-if="user.token.length">
                    <strong v-text="user.token"></strong>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                user: {
                    name: '',
                    email: '',
                    token: '',
                },
                formData: {
                    email: '',
                    password: ''
                }
            };
        },
        methods: {
            hanleLogin() {
                axios.post('/api/login', this.formData).then(response => {
                    this.user.name = response.data.user.name;
                    this.user.email = response.data.user.email;
                    this.user.token = response.data.token;
                });
            },

        }
    }
</script>
