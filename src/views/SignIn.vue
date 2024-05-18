<script setup lang="ts">
import { ref } from 'vue';

const email = ref('');
const password = ref('');

const signIn = () => {
  console.log('Email:', email.value);
  console.log('Password:', password.value);
};
</script>

<template>
  <div class="container mt-5">
    <h1 class="text-center">Vehicle Maintenance Log</h1>
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title text-center">Sign In</h5>
            <form @submit.prevent="signIn">
              <div class="mb-3">
                <label for="email" class="form-label">Email address</label>
                <input
                  type="email"
                  class="form-control"
                  id="email"
                  v-model="email"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input
                  type="password"
                  class="form-control"
                  id="password"
                  v-model="password"
                  required
                />
              </div>
              <button type="submit" class="btn btn-primary w-100">
                Sign In
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  margin-top: 50px;
}
</style>
