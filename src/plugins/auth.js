import { useAuthStore } from '../store/useAuth.js';
import {useTask} from "../store/taskStore.js";

export default {
    install: ({config}) => {
        config.globalProperties.$auth = useAuthStore()
        config.globalProperties.$task = useTask()

        if (useAuthStore().loggedIn){
            useAuthStore().fetchUser()
        }
    }
}
