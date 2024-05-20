<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const goBack = () => {
  router.push('/');
};
</script>

<template>
  <button class="btn btn-secondary" @click="goBack">← Go Back</button>
</template>
