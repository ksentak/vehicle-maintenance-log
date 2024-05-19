<script setup lang="ts">
import { ref, onMounted } from 'vue';
import capitalize from 'lodash/capitalize';
import Card from '../components/Card.vue';
import AddVehicleCard from '../components/AddVehicleCard.vue';
import useVehicleStore from '../stores/vehicleStore';
import Vehicle from '../interfaces/Vehicle';

const vehicleStore = useVehicleStore();
const vehicles = ref<Vehicle[]>([]);

const formatCardTitle = (vehicle: Vehicle) => {
  const { make, model, year } = vehicle;

  const cardTitle = `${year} ${capitalize(make)} ${capitalize(model)}`;
  return cardTitle;
};

onMounted(async () => {
  if (vehicleStore.vehicles.length === 0) {
    await vehicleStore.fetchVehicles();
  }
  vehicles.value = vehicleStore.vehicles;
});
</script>

<template>
  <div class="container mt-5">
    <h1 class="text-center">Welcome to Vehicle Maintenance Log</h1>
    <div class="row content-row mt-4">
      <div
        v-for="(vehicle, index) in vehicles"
        :key="index"
        class="col-12 col-md-4 mb-4"
      >
        <Card :title="formatCardTitle(vehicle)" />
      </div>
      <AddVehicleCard />
    </div>
  </div>
</template>
