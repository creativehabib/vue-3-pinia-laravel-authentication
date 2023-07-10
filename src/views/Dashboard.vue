<script setup>
import {useAuthStore} from "../store/useAuth.js";
import Header from "../components/pages/Header.vue";
import TaskList from "../components/pages/TaskList.vue";
import TaskFilter from "../components/pages/TaskFilter.vue";
import AddTask from "../components/pages/AddTask.vue";
import {useTask} from "../store/taskStore.js"
const task = useTask()
const store = useAuthStore()
store.getUsers()
useTask().getTasks()
</script>

<template>
  <Header/>
  <div v-if="task.isLoading" class="bg-white rounded-lg p-5 border shadow-2xl">
    Loading ...
  </div>
  <div v-else class="bg-white rounded-lg p-5 border shadow-2xl">
    <AddTask/>
    <TaskList/>
    <TaskFilter/>
  </div>
</template>

<style scoped>

</style>