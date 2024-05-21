<script setup lang="ts">
import { ref, watch } from 'vue';
import range from 'lodash/range';
import Modal from './Modal.vue';
import useVehicleStore from '../stores/vehicleStore';
import Vehicle from '../interfaces/Vehicle';

const props = defineProps<{
  vehicleData: Vehicle;
}>();

const vehicle = ref<any>({
  make: '',
  model: '',
  year: 0,
  vin: '',
});

const vehicleStore = useVehicleStore();

watch(
  () => props.vehicleData,
  (newVal) => {
    if (newVal) {
      vehicle.value = { ...newVal };
    }
  },
  { immediate: true },
);

const currentYear = new Date().getFullYear();
const years = range(currentYear, currentYear - 21, -1);

const updateVehicle = async () => {
  await vehicleStore.updateVehicle(vehicle.value);
};
</script>

<template>
  <Modal
    :title="'Edit Vehicle'"
    :openBtnText="'Edit Vehicle'"
    :openBtnStyle="'btn btn-info'"
    :actionBtnText="'Update Vehicle'"
    :submitFunc="updateVehicle"
  >
    <form>
      <div class="mb-2">
        <label for="year" class="form-label">Year</label>
        <select class="form-select" id="year" v-model="vehicle.year" required>
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
          v-model="vehicle.make"
          required
        />
      </div>
      <div class="mb-2">
        <label for="model" class="form-label">Model</label>
        <input
          type="text"
          class="form-control"
          id="model"
          v-model="vehicle.model"
          required
        />
      </div>
      <div class="mb-2">
        <label for="vin" class="form-label">VIN</label>
        <input
          type="text"
          class="form-control"
          id="vin"
          v-model="vehicle.vin"
        />
      </div>
    </form>
  </Modal>
</template>
