import axios from "axios";
import router from "../router"
import {useErrorStore} from "../store/useError.js";

axios.defaults.baseURL = "http://example.test/"
axios.defaults.headers.common["Authorization"] = localStorage.getItem('token')
axios.defaults.withCredentials = true

axios.interceptors.response.use(
    function (config){

        // Do something before request is sent
        useErrorStore().$reset()
        return config
    },

    function (error){
        return Promise.reject(error)
    }
)


// Add a response interceptor
axios.interceptors.response.use(
    function (response){
        return response
    },
    function (error){
        switch (error.response.status){
            case 401:
                localStorage.removeItem("token")
                window.location.reload()
                break
            case 403:
            case 404:
                router.push({
                    name: "error",
                    props:{
                        error: {
                            message: error.response.data.message,
                            status: error.status
                        }
                    }
                })
                break;
            case 422:
                useErrorStore().$state = error.response.data
                break;
            default:
                console.log(error.response.data)
        }
        return Promise.reject(error)
    }
)

export default axios