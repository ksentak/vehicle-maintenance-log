<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import useUserStore from '../stores/userStore';
import authService from '../services/authService';

const userStore = useUserStore();
const router = useRouter();

const username = computed(() => userStore.userDetails?.username || '');

// Function to handle sign out
const signOut = async () => {
  try {
    await authService.signOut();
    router.push('/auth');
  } catch (error) {
    console.error('Error signing out', error);
  }
};

const returnHome = async () => {
  router.push('/');
};
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
    <div class="container-fluid">
      <a class="navbar-brand" @click.prevent="returnHome"
        >Vehicle Maintenance Log 🚗
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {{ username }}
            </a>
            <ul
              class="dropdown-menu dropdown-menu-end"
              aria-labelledby="navbarDropdown"
            >
              <li>
                <a class="dropdown-item" href="#" @click.prevent="signOut"
                  >Sign Out</a
                >
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.navbar-brand:hover {
  cursor: pointer;
}
</style>
