<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import useUserStore from '../stores/userStore';
import { addVehicle } from '../services/vehicleService';

const make = ref('');
const model = ref('');
const year = ref<number | null>(null);
const vin = ref('');
const mileage = ref<number | null>(null);
const router = useRouter();
const userStore = useUserStore();

const handleSubmit = async () => {
  if (userStore.user) {
    const vehicle = {
      make: make.value,
      model: model.value,
      year: year.value,
      vin: vin.value,
      mileage: mileage.value,
    };

    try {
      await addVehicle(vehicle, userStore.user.uid);
      router.push('/');
    } catch (err) {
      console.error(err);
    }
  } else {
    console.error('User is not authenticated');
  }
};
</script>

<template>
  <div class="container mt-2">
    <form @submit.prevent="handleSubmit">
      <div class="mb-3">
        <label for="make" class="form-label">Make</label>
        <input
          type="text"
          class="form-control"
          id="make"
          v-model="make"
          required
        />
      </div>
      <div class="mb-3">
        <label for="model" class="form-label">Model</label>
        <input
          type="text"
          class="form-control"
          id="model"
          v-model="model"
          required
        />
      </div>
      <div class="mb-3">
        <label for="year" class="form-label">Year</label>
        <input
          type="number"
          class="form-control"
          id="year"
          v-model="year"
          required
        />
      </div>
      <div class="mb-3">
        <label for="vin" class="form-label">VIN</label>
        <input type="text" class="form-control" id="vin" v-model="vin" />
      </div>
      <div class="mb-3">
        <label for="mileage" class="form-label">Mileage</label>
        <input
          type="number"
          class="form-control"
          id="mileage"
          v-model="mileage"
        />
      </div>
      <button type="submit" class="btn btn-primary mt-2">Add Vehicle</button>
    </form>
  </div>
</template>
