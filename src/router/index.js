import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        component: () => import('@/view/index.vue'),
        children: [],
    },
    {
        path: '/login',
        component: () => import('@/view/login.vue'),
        children: [],
    },
]

let router = new VueRouter({
    mode: 'hash',
    routes
})

export default router;
