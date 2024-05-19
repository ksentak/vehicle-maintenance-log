<script setup lang="ts">
import Card from './Card.vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const addVehicle = () => {
  router.push('/add-vehicle');
};
</script>

<template>
  <Card @click="addVehicle">
    <div class="d-flex align-items-center justify-content-center">
      <i class="bi bi-plus-lg me-2 plus-icon"></i>
      <p class="mb-0 card-text">Add Vehicle</p>
    </div>
    <i class="bi bi-car-front-fill text-primary car-icon mt-2"></i>
  </Card>
</template>

<style scoped>
.card-text {
  font-weight: 500;
  font-size: 1.5rem;
}

.plus-icon {
  font-size: 2rem;
  font-weight: 500;
}

.car-icon {
  font-size: 5rem;
}
</style>
