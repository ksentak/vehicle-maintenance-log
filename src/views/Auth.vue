<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import authService from '../services/authService';
import userService from '../services/userService';
import useUserStore from '../stores/userStore';

const isSignIn = ref(true);
const email = ref('');
const password = ref('');
const firstName = ref('');
const lastName = ref('');
const username = ref('');
const router = useRouter();
const userStore = useUserStore();

const toggleForm = () => {
  isSignIn.value = !isSignIn.value;
};

const signIn = async () => {
  try {
    await authService.signIn(email.value, password.value);
    await userStore.fetchUserDetails(userStore.user?.uid);
    router.push('/');
  } catch (error) {
    console.error('Error signing in', error);
    alert('Error signing in');
  }
};

const signUp = async () => {
  try {
    const user = await authService.signUp(email.value, password.value);
    await userService.addUserDetails(user.uid, {
      firstName: firstName.value,
      lastName: lastName.value,
      username: username.value,
      email: email.value,
    });
    await userStore.fetchUserDetails(user.uid);
    router.push('/');
  } catch (error) {
    console.error('Error signing up', error);
    alert('Error signing up');
  }
};
</script>

<template>
  <div class="container mt-5">
    <h1 class="text-center">Vehicle Maintenance Log</h1>
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title text-center" v-if="isSignIn">Sign In</h5>
            <h5 class="card-title text-center" v-else>Sign Up</h5>

            <form @submit.prevent="isSignIn ? signIn() : signUp()">
              <div v-if="!isSignIn">
                <div class="mb-3">
                  <label for="firstName" class="form-label">First Name</label>
                  <input
                    type="text"
                    class="form-control"
                    id="firstName"
                    v-model="firstName"
                    required
                  />
                </div>
                <div class="mb-3">
                  <label for="lastName" class="form-label">Last Name</label>
                  <input
                    type="text"
                    class="form-control"
                    id="lastName"
                    v-model="lastName"
                    required
                  />
                </div>
                <div class="mb-3">
                  <label for="username" class="form-label">Username</label>
                  <input
                    type="text"
                    class="form-control"
                    id="username"
                    v-model="username"
                    required
                  />
                </div>
              </div>
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
                {{ isSignIn ? 'Sign In' : 'Sign Up' }}
              </button>
            </form>
            <div class="text-center mt-3">
              <a href="#" @click="toggleForm">
                {{
                  isSignIn
                    ? 'New user? Sign up here'
                    : 'Already have an account? Sign in here'
                }}
              </a>
            </div>
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
