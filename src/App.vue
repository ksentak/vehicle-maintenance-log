<script setup lang="ts">
import { computed } from 'vue';
import { RouterView, useRoute } from 'vue-router';
import Navbar from './components/Navbar.vue';

// Get the current route
const route = useRoute();

// Computed property to determine whether to show the NavBar
const showNavBar = computed(() => route.path !== '/auth');
</script>

<template>
  <Navbar v-if="showNavBar" />
  <div class="container mt-4">
    <router-view />
  </div>
</template>
