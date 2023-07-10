<script setup>
import {useAuthStore} from "../../store/useAuth.js";
import {useRouter} from "vue-router";
import {ref} from "vue";
import axios from "axios";
import {useErrorStore} from "../../store/useError.js";

const loading = ref(false)
const router = useRouter()
const error = useErrorStore()
const auth = useAuthStore()
const form = ref({});
const onSubmit = () => {
  loading.value = !loading.value;
  axios.post("api/register", form.value)
      .then(() => auth.login(form.value).then(() => router.push({ name: "login" })))
      .catch(() => (loading.value = !loading.value));
};

</script>

<template>
  <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-lg">
      <img class="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
      <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Sign up to create a account</h2>
    </div>

    <div class="mt-6 sm:mx-auto sm:w-full sm:max-w-lg bg-white p-5 shadow rounded-lg">
      <form class="space-y-6" v-on:submit.prevent="onSubmit">
        <div>
          <label for="name" class="block text-sm font-medium leading-6 text-gray-900">Name</label>
          <div class="mt-2">
            <input id="name" name="name" v-model="form.name" type="text" placeholder="Name" autocomplete="email" class="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            <div v-if="error.errors.name">
              <span class="text-red-700 text-sm">{{ error.errors.name.toString() }}</span>
            </div>
          </div>
        </div>
        <div>
          <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
          <div class="mt-2">
            <input id="email" name="email" v-model="form.email" type="email" placeholder="Email" autocomplete="email" class="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            <div v-if="error.errors.email">
              <span class="text-red-700 text-sm">{{ error.errors.email.toString() }}</span>
            </div>
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
          </div>
          <div class="mt-2">
            <input id="password" v-model="form.password" name="password" type="password" placeholder="Password" autocomplete="current-password" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2" />
            <div v-if="error.errors.password">
              <span class="text-red-700 text-sm">{{ error.errors.password.toString() }}</span>
            </div>
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label for="password_confirmation" class="block text-sm font-medium leading-6 text-gray-900">Password Confirmation</label>
          </div>
          <div class="mt-2">
            <input id="password_confirmation" v-model="form.password_confirmation" name="password_confirmation" type="password" placeholder="Password Confirmation" autocomplete="current-password" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2" />

          </div>
        </div>

        <div>
          <button type="submit" :disabled="loading" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            <span v-if="loading">Loading...</span>
            <span v-else>SIGN UP</span>
          </button>
        </div>
      </form>

      <p class="mt-6 text-center text-sm text-gray-500">
        Have an account yet?
        {{ ' ' }}
        <router-link to="/" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Login</router-link>
      </p>
    </div>
  </div>
</template>

<style scoped>

</style>