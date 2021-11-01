<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-8">
                <div class="card">
                    <div class="card-header"> Login </div>
                    <div class="card-body">
                        <form @submit.prevent="login">
                            <div class="alert alert-danger" v-if="authError">
                                {{ authError }}
                            </div>
                            <div class="form-group">
                                <label for="email">Email</label>
                                <input type="email" name="email" id="email" v-model="formData.email" required class="form-control"/>
                            </div>
                            <div class="form-group">
                                <label for="password">Password</label>
                                <input type="password" name="password" id="password" v-model="formData.password" required class="form-control"/>
                            </div>
                            <input type="submit" value="Login" class="btn btn-primary"/>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { login } from '../auth';
    export default {
        data() {
            return {
                formData: {
                    email: '',
                    password: '',
                },
            }
        },
        methods: {
            login() {
                this.$store.dispatch('login');
                login(this.$data.formData).then(response => {
                    this.$store.commit('loginSuccess', response);
                    this.$router.push({path: '/dashboard'});
                }).catch(error => {
                    this.$store.commit('loginFaild', 'Invaild Credentials');
                });

            }
        },
        computed: {
            authError() {
                return this.$store.getters.authError;
            },
            registeredUser() {
                return this.$store.getters.registeredUser;
            },

        }
    }
</script>

<style scoped>
    .error {
        text-align: center;
        color: red;
    }
</style>
