import {createRouter, createWebHistory} from "vue-router";
import Guest from "../components/layouts/Guest.vue";
import Authenticated from "../components/layouts/Authenticated.vue";
import {useAuthStore} from "../store/useAuth.js";


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes:[
        {
            path:'/',
            component: Guest,
            children: [
                // {
                //     path:'/',
                //     name: 'home',
                //     component: () => import('../views/Home.vue'),
                // },
                {
                    path: '/',
                    name: 'login',
                    component: () => import('../views/auth/Login.vue'),
                    meta: {
                        requiresAuth: false
                    }
                },
                {
                    path: '/register',
                    name: 'register',
                    component: () => import('../views/auth/Register.vue'),
                    meta: {
                        requiresAuth: false
                    }
                },
                {
                    path: '/forgot-password',
                    name: 'forgotPassword',
                    component: () => import('../views/auth/ForgotPassword.vue'),
                    meta: {
                        requiresAuth: false
                    }
                },
            ]
        },
        {
            path: '/dashboard',
            component: Authenticated,
            children: [
                {
                    path: '/dashboard',
                    name: 'dashboard',
                    component: () => import('../views/Dashboard.vue'),
                    meta: {
                        requiresAuth: true
                    }
                },
                {
                    path: '/user-update',
                    name: 'userUpdate',
                    component: () => import('../views/UpdateUser.vue'),
                    meta: {
                        requiresAuth: true
                    }
                },
                {
                    path: '/update_password',
                    name: 'updatePassword',
                    component: () => import('../views/UpdatePassword.vue'),
                    meta: {
                        requiresAuth: true
                    }
                }
            ]
        },
        {
            path: "/:pathMatch(.*)*",
            component: () => import("../components/404.vue"),
        },
    ]
});
router.beforeEach((to,from) =>{
    const store = useAuthStore()
    if(to.meta.requiresAuth && !store.loggedIn){
        return { name : 'login'}
    }
    if(to.meta.requiresAuth === false && store.loggedIn){
        return { name : 'dashboard'}
    }
})
export default router