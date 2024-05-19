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
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Vehicle Maintenance Log</a>
      <div class="collapse navbar-collapse justify-content-end">
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
