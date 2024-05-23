<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import range from 'lodash/range';
import lowercase from 'lodash/lowercase';
import useVehicleStore from '../stores/vehicleStore';
import Vehicle from '../interfaces/Vehicle';

const make = ref('');
const model = ref('');
const year = ref<number | null>(null);
const vin = ref('');

const router = useRouter();
const vehicleStore = useVehicleStore();

const currentYear = new Date().getFullYear();
const years = range(currentYear, currentYear - 26, -1);

const handleSubmit = async () => {
  const vehicle: Omit<Vehicle, 'id'> = {
    year: year.value,
    make: lowercase(make.value),
    model: lowercase(model.value),
    vin: lowercase(vin.value),
  };

  try {
    await vehicleStore.addVehicle(vehicle);
    router.push('/');
  } catch (err) {
    console.error(err);
  }
};
</script>

<template>
  <div class="container mt-2 mb-4">
    <form @submit.prevent="handleSubmit">
      <div class="mb-2">
        <label for="year" class="form-label">Year</label>
        <select class="form-select" id="year" v-model="year" required>
          <option value="" disabled>Select Year</option>
          <option v-for="y in years" :key="y" :value="y">{{ y }}</option>
        </select>
      </div>
      <div class="mb-2">
        <label for="make" class="form-label">Make</label>
        <input
          type="text"
          class="form-control"
          id="make"
          v-model="make"
          required
        />
      </div>
      <div class="mb-2">
        <label for="model" class="form-label">Model</label>
        <input
          type="text"
          class="form-control"
          id="model"
          v-model="model"
          required
        />
      </div>
      <div class="mb-2">
        <label for="vin" class="form-label">VIN</label>
        <input type="text" class="form-control" id="vin" v-model="vin" />
      </div>
      <button type="submit" class="btn btn-primary mt-2">Add Vehicle</button>
    </form>
  </div>
</template>

<style scoped>
.container {
  max-width: 762px;
}
</style>
