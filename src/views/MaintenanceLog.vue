<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import isString from 'lodash/isString';
import find from 'lodash/find';
import MaintenanceLogModal from '../components/MaintenanceLogModal.vue';
import MaintenanceLogCard from '../components/MaintenanceLogCard.vue';
import BackBtn from '../components/BackBtn.vue';
import Loader from '../components/Loader.vue';
import useMaintenanceLogStore from '../stores/maintenanceLogStore';
import useVehicleStore from '../stores/vehicleStore';
import MaintenanceLog from '../interfaces/MaintenanceLog';
import Vehicle from '../interfaces/Vehicle';

const maintenanceLogs = ref<MaintenanceLog[]>([]);
const vehicleInfo = ref<Vehicle>({
  id: '',
  make: '',
  model: '',
  year: 0,
  vin: '',
});
const isLoading = ref<boolean>(false);

const route = useRoute();
const vehicleStore = useVehicleStore();

const maintenanceLogStore = useMaintenanceLogStore();

const vehicleId = isString(route.params.vehicleId)
  ? route.params.vehicleId
  : route.params.vehicleId[0];

const fetchMaintenanceLogs = async () => {
  const logs = maintenanceLogStore.maintenanceLogs;

  if (!logs.length) {
    await maintenanceLogStore.fetchMaintenanceLogs(vehicleId);
  }

  maintenanceLogs.value = maintenanceLogStore.maintenanceLogs[vehicleId];
};

const getVehicleInfo = () => {
  const foundVehicle = find(vehicleStore.vehicles, (vehicle: Vehicle) => {
    return vehicle.id === vehicleId;
  });

  if (foundVehicle) {
    vehicleInfo.value = foundVehicle;
  }
};

onMounted(async () => {
  isLoading.value = true;
  getVehicleInfo();
  await fetchMaintenanceLogs();
  isLoading.value = false;
});
</script>

<template>
  <div class="container mt-5">
    <h1 class="text-center text-capitalize">
      {{ vehicleInfo.year }} {{ vehicleInfo.make }}
      {{ vehicleInfo.model }} Maintenance Logs
    </h1>
    <div class="d-flex justify-content-between mb-3">
      <BackBtn />
      <button
        type="button"
        class="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#addMaintenanceLogModal"
      >
        Add Log
      </button>
    </div>
    <Loader v-if="isLoading" />
    <div v-else class="mt-4">
      <MaintenanceLogCard
        v-for="log in maintenanceLogs"
        :key="log.id"
        :log="log"
      />
    </div>
    <MaintenanceLogModal :vehicleId="vehicleId" />
  </div>
</template>
