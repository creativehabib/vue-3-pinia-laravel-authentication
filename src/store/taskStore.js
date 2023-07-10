import {defineStore} from "pinia";
import axios from "axios";
import {useToast} from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
const $toast = useToast();

export const useTask = defineStore('task',{
    state: () => {
        return {
            tasks: [],
            sortable: 'all',
            isLoading: false,
            errors: []
        }
    },
    getters: {
        filteredTasks(){
            return this.sortable === 'completed' ? this.doneTask : this.sortable === 'pending' ? this.notDoneTasks : this.allTasks
        },
        allTasks(){
            return this.tasks
        },
        doneTask(){
            return this.tasks.filter(task => task.done)
        },
        notDoneTasks(){
            return this.tasks.filter(task => !task.done)
        },
        countAllTask(){
            return this.tasks.length
        },
        countDoneTask(){
            return this.tasks.filter(task => task.done).length
        },
        countNotDoneTask(){
            return this.tasks.filter(task => !task.done).length
        }
    },
    actions: {
        clearErrors(){
            this.errors = []
        },
        async getTasks(){
            try {
                this.isLoading = true
                //await axios.get('/sanctum/csrf-cookie')
                let response = await axios.get('/api/tasks')
                this.tasks = response.data
                this.isLoading = false
            } catch (e){

            }
        },

        async addTask(task){
            try {
                let response = await axios.post('/api/tasks',task)
                this.tasks.push(response.data)
                $toast.success('Successfully Added')
            } catch (e) {
                //show errors
                if (e.response.status === 422){
                    this.errors = e.response.data.errors
                    $toast.error('Please fill in all fields')
                }
            }
        },

        async handleToggle(id){

            try {
                await axios.put(`api/tasks/${id}`)
                const task = this.tasks.find(task => task.id === id)
                task.done = !task.done
                $toast.success('Successfully updated')
            } catch (e) {
                // show errors
            }

        },
        async deleteTask(id){
            try {
                await axios.delete(`/api/tasks/${id}`)
                this.tasks = this.tasks.filter(task => task.id !== id)
                $toast.success('Successfully task deleted')
            } catch (e) {
                // show errors
            }
        }
    }
})