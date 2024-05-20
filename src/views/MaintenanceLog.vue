<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import isString from 'lodash/isString';
import get from 'lodash/get';
import AddMaintenanceLogModal from '../components/AddMaintenanceLogModal.vue';
import MaintenanceLogCard from '../components/MaintenanceLogCard.vue';
import BackBtn from '../components/BackBtn.vue';
import Loader from '../components/Loader.vue';
import useMaintenanceLogStore from '../stores/maintenanceLogStore';
import MaintenanceLog from '../interfaces/MaintenanceLog';

const route = useRoute();
const vehicleId = isString(route.params.vehicleId)
  ? route.params.vehicleId
  : route.params.vehicleId[0];
const maintenanceLogStore = useMaintenanceLogStore();
const maintenanceLogs = ref<MaintenanceLog[]>([]);
const isLoading = ref<boolean>(false);

// Refactor
const fetchMaintenanceLogs = async () => {
  isLoading.value = true;
  const logs = get(maintenanceLogStore.maintenanceLogs, vehicleId, []);

  if (!logs.length) {
    await maintenanceLogStore.fetchMaintenanceLogs(vehicleId);
  }

  maintenanceLogs.value = maintenanceLogStore.maintenanceLogs[vehicleId];
  isLoading.value = false;
};

onMounted(fetchMaintenanceLogs);
</script>

<template>
  <div class="container mt-5">
    <h1 class="text-center">Maintenance Log</h1>
    <div class="d-flex justify-content-between mb-3">
      <BackBtn />
      <button
        type="button"
        class="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#addMaintenanceLogModal"
      >
        Add Maintenance Log
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
    <AddMaintenanceLogModal :vehicleId="vehicleId" />
  </div>
</template>
