<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import capitalize from 'lodash/capitalize';
import Card from '../components/Card.vue';
import AddVehicleCard from '../components/AddVehicleCard.vue';
import Loader from '../components/Loader.vue';
import useVehicleStore from '../stores/vehicleStore';
import Vehicle from '../interfaces/Vehicle';

const vehicleStore = useVehicleStore();
const vehicles = ref<Vehicle[]>([]);
const isLoading = ref<boolean>(false);

const router = useRouter();

const formatCardTitle = (vehicle: Vehicle) => {
  const { make, model, year } = vehicle;

  const cardTitle = `${year} ${capitalize(make)} ${capitalize(model)}`;
  return cardTitle;
};

const openMaintenanceLogPage = (vehicleId: string) => {
  router.push(`/maintenance-log/${vehicleId}`);
};

onMounted(async () => {
  isLoading.value = true;
  if (!vehicleStore.vehicles.length) {
    await vehicleStore.fetchVehicles();
  }
  vehicles.value = vehicleStore.vehicles;
  isLoading.value = false;
});
</script>

<template>
  <div class="container mt-5">
    <h1 class="text-center">Welcome to Vehicle Maintenance Log</h1>
    <Loader v-if="isLoading" />
    <div v-else class="row content-row mt-4">
      <div
        v-for="(vehicle, index) in vehicles"
        :key="index"
        class="col-12 col-md-4 mb-4"
      >
        <Card
          @click="openMaintenanceLogPage(vehicle.id)"
          :title="formatCardTitle(vehicle)"
        />
      </div>
      <AddVehicleCard />
    </div>
  </div>
</template>
