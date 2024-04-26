<script setup>
import {useAuthStore} from "../store/useAuth.js";
import axios from "axios";
import {useErrorStore} from "../store/useError.js";
import router from "../router/index.js";
import {useToast} from "vue-toast-notification";
const auth = useAuthStore()
const error = useErrorStore()
const $toast = useToast();
const updatePassword = () => {
  axios.post("api/update_password", {
    old_password: auth.user.old_password,
    new_password: auth.user.new_password,
    password_confirmation: auth.user.password_confirmation
  }).then((res)=>{
    console.log(res)
    router.push({name:'dashboard'})
    $toast.success('User information updated successfully!')

  })
}

</script>

<template>
  <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">

    <div class="mt-6 sm:mx-auto sm:w-full sm:max-w-lg bg-white p-5 shadow rounded-lg">
      <form class="space-y-6" v-on:submit.prevent="updatePassword">
        <div>
          <label for="old_password" class="block text-sm font-medium leading-6 text-gray-900">Old Password</label>
          <div class="mt-2">
            <input id="old_password" v-model="auth.user.old_password" type="password" placeholder="Old Password" autocomplete="old_password" class="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            <div v-if="error.errors.old_password">
              <span class="text-red-700 text-sm">{{ error.errors.old_password.toString() }}</span>
            </div>
          </div>
        </div>
        <div>
          <label for="new_password" class="block text-sm font-medium leading-6 text-gray-900">New Password</label>
          <div class="mt-2">
            <input id="new_password" v-model="auth.user.new_password" type="password" placeholder="New Password" autocomplete="new_password" class="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            <div v-if="error.errors.new_password">
              <span class="text-red-700 text-sm">{{ error.errors.new_password.toString() }}</span>
            </div>
          </div>
        </div>
        <div>
          <label for="password_confirmation" class="block text-sm font-medium leading-6 text-gray-900">Password Confirmation</label>
          <div class="mt-2">
            <input id="password_confirmation" v-model="auth.user.password_confirmation" type="password" placeholder="Password Confirmation" autocomplete="password" class="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
        </div>

        <div>
          <button type="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Update
          </button>
        </div>
      </form>

    </div>
  </div>
</template>

<style scoped>

</style>