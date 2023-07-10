<script setup>
import {useTask} from "../../store/taskStore.js";
import Task from "./Task.vue";
import {storeToRefs} from "pinia";

const store = useTask()
const { filteredTasks } = storeToRefs(store)

</script>

<template>
  <div v-for="task in filteredTasks" :key="task.id" class="border-gray-200 border-t py-2 flex">
    <Task :task="task"/>
  </div>
</template>

<style scoped>

</style>