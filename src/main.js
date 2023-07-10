import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import {createPinia} from "pinia";
import router from "./router/index.js";
import auth from "./plugins/auth.js";
import VueAxios from "vue-axios";
import axios from "./plugins/axios.js";



const app = createApp(App)
    .use(createPinia())
    .use(router)
    .use(VueAxios, axios)
    .use(auth)
    .mount('#app')

