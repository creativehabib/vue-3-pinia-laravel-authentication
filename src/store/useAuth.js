import { defineStore } from "pinia";
import axios from "axios";
import {useToast} from "vue-toast-notification";
import router from "../router";
const $toast = useToast();

export const useAuthStore = defineStore("auth", {
    state: () => {
        return{
            loggedIn: !!localStorage.getItem("token"),
            token: localStorage.getItem('token') || 0,
            user: {},
            users: [],
            errors: []
        }
    },

    getters: {
        allUsers(){
            return this.users
        },
    },

    actions: {

        setToken: function(token){
            this.token = token
            localStorage.setItem('token',token)
        },
        removeToken: function(){
            this.token = 0
            localStorage.removeItem('token')
        },

        async getUsers(){
            this.users = (await axios.get('api/users')).data
        },
        async login(credentials) {
            try {
                await axios.get("sanctum/csrf-cookie");
                const response = (await axios.post("api/login", credentials)).data;
                if (response) {
                    let token = axios.defaults.headers.common["Authorization"] = `Bearer ${response.token}`
                    this.setToken(token)
                    await this.fetchUser();
                }
                $toast.success('Successfully logged in!')
                await router.push('dashboard')
            } catch (e) {
                if (e.response.status === 422){
                    this.errors = e.response.data.errors
                    $toast.error('Please fill in all fields')
                }
            }
        },
        async register (credentials){
            try {
                await axios.get("sanctum/csrf-cookie");
                let response = (await axios.post('/api/register', credentials)).data
                $toast.success('Successfully register your account please login!')
                await router.push('login')
            } catch (e) {
                //show errors
                if (e.response.status === 422){
                    this.errors = e.response.data.errors
                    $toast.error('Please fill in all fields')
                }
            }
        },

        async logout() {
            const response = (await axios.post('api/logout')).data
            if (response){
                this.removeToken()
                this.$reset()
            }
            $toast.success('Successfully logged out!')
        },

        async fetchUser() {
            this.user = (await axios.get("api/user")).data;
            this.loggedIn = true;
        },
    },
});