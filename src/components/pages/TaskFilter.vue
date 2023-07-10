<script setup>
import {useTask} from "../../store/taskStore.js";
import {storeToRefs} from "pinia";

const {sortable, countAllTask, countDoneTask, countNotDoneTask} = storeToRefs(useTask())
</script>

<template>
  <div class="flex justify-end mt-5 text-gray-500">
    <div class="flex space-x-3">
      <label class="inline-flex items-center cursor-pointer">
        <input v-model="sortable" type="radio" value="all" name="sortable" class="h-4 w-4 text-blue-500">
        <span class="ml-2 text-sm">All ({{ countAllTask }})</span>
      </label>
      <label class="inline-flex items-center cursor-pointer">
        <input v-model="sortable" type="radio" value="completed" name="sortable" class="h-4 w-4 text-blue-500">
        <span class="ml-2 text-sm">Completed ({{ countDoneTask }})</span>
      </label>
      <label class="inline-flex items-center cursor-pointer">
        <input v-model="sortable" type="radio" value="pending" name="sortable" class="h-4 w-4 text-blue-500">
        <span class="ml-2 text-sm">Pending ({{ countNotDoneTask }})</span>
      </label>
    </div>
  </div>
</template>

<style scoped>

</style>