import {defineStore} from "pinia";
import axios from "axios";
import router from "../router/indes.js";

export const userAuthStore = defineStore({
    id: 'UserAuthID',

    state: () => ({
        authenticated:false,
        authUser: null,
        authErrors: []
    }),
    getters: {
        user: (state) => state.authUser,
        errors: (state) => state.authErrors,
        authenticate: (state) => state.authenticated

    },

    actions:{
        async getToken (){
          await axios.get('/sanctum/csrf-cookie')
        },
        async getUser(){
            await this.getToken()
            const data = await axios.get('api/user')
            this.authUser = data.data
        },
        async handleLogin(data){
            this.authErrors = []
            await this.getToken()
            try {
                await axios.post('api/login',data)
                await this.router.push('/')
            } catch (e) {
                if (e.response.status === 422){
                    this.authErrors = e.response.data.errors
                }
            }

        },
        async handleRegister(data){
            this.authErrors = []
            await this.getToken()
            try {
                await axios.post('api/register')
                await router.push('/')
            } catch (e) {
                if (e.response.status === 422){
                    this.authErrors = e.response.data.errors
                }
            }
        }

    }

})