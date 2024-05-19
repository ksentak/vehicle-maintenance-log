<script setup lang="ts">
import Card from './Card.vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const addVehicle = () => {
  router.push('/add-vehicle');
};
</script>

<template>
  <div class="col-12 col-md-4 mb-4">
    <Card @click="addVehicle" :title="'+ Add Vehicle'" />
  </div>
</template>
