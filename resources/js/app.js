require('./bootstrap');
window.Vue = require('vue').default;
import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import {routes} from './routes';
import storeData from './store';

Vue.use(VueRouter);
Vue.use(Vuex);
const router = new VueRouter({
    routes,
    mode: 'history'
});

const store = new Vuex.Store(storeData);

Vue.component('main-app-component', require('./components/MainAppComponent.vue').default);
Vue.component('login-component', require('./components/LoginComponent.vue').default);
Vue.component('home-component', require('./components/HomeComponent.vue').default);
Vue.component('dashboard-component', require('./components/DashboardComponent.vue').default);
Vue.component('nav-component', require('./components/NavComponent.vue').default);

const app = new Vue({
    el: '#app',
    router,
    store
});
