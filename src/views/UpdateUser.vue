<script setup>
import {useAuthStore} from "../store/useAuth.js";
import axios from "axios";
import {useErrorStore} from "../store/useError.js";
import router from "../router/index.js";
import {useToast} from "vue-toast-notification";
const auth = useAuthStore()
const error = useErrorStore()
const $toast = useToast();
const updateProfile = () => {
  axios.post("api/usersUpdate", {
    name: auth.user.name,
    email: auth.user.email,
    password: auth.user.password,
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
      <form class="space-y-6" v-on:submit.prevent="updateProfile">
        <div>
          <label for="name" class="block text-sm font-medium leading-6 text-gray-900">Name</label>
          <div class="mt-2">
            <input id="name" v-model="auth.user.name" type="text" placeholder="Name" autocomplete="name" class="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            <div v-if="error.errors.name">
              <span class="text-red-700 text-sm">{{ error.errors.name.toString() }}</span>
            </div>
          </div>
        </div>
        <div>
          <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
          <div class="mt-2">
            <input id="email" v-model="auth.user.email" type="email" placeholder="Email" autocomplete="email" class="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            <div v-if="error.errors.email">
              <span class="text-red-700 text-sm">{{ error.errors.email.toString() }}</span>
            </div>
          </div>
        </div>
        <div>
          <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
          <div class="mt-2">
            <input id="password" v-model="auth.user.password" type="password" placeholder="Password" autocomplete="password" class="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            <div v-if="error.errors.password">
              <span class="text-red-700 text-sm">{{ error.errors.password.toString() }}</span>
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