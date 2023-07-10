<script setup>
import {useTask} from "../../store/taskStore.js";
import {ref} from "vue";

const store = useTask()
const task = ref('')
const addTask = () => {
  let newTask = {
    name: task.value,
    done: false
  }
  store.addTask(newTask)
  task.value = ''
}
const handleChange = (e) =>{
  if(e.data){
    store.clearErrors()
  }
}
</script>

<template>
  <form class="mb-4 flex space-x-4" @submit.prevent="addTask">
    <div class="w-full">
      <input v-model="task" @input="handleChange" type="text" name="task" placeholder="Add task" class="w-full h-9 border rounded bg-gray-100 border-gray-200 outline-gray-300 py-1 px-2">
      <div v-if="store.errors.name">
        <p class="text-sm text-red-700">{{$task.errors.name[0]}}</p>
      </div>
    </div>
    <div>
      <button type="submit" class="bg-indigo-600 text-white border-0 py-1 px-4 rounded text-lg">Add</button>
    </div>
  </form>
</template>

<style scoped>

</style>