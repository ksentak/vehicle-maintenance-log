<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import AddMaintenanceLogModal from '../components/AddMaintenanceLogModal.vue';
import Loader from '../components/Loader.vue';
import useMaintenanceLogStore from '../stores/maintenanceLogStore';
import MaintenanceLog from '../interfaces/MaintenanceLog';

const route = useRoute();
const vehicleId = route.params.vehicleId;
const maintenanceLogStore = useMaintenanceLogStore();
const maintenanceLogs = ref<MaintenanceLog[]>([]);
const isLoading = ref<boolean>(false);

const fetchMaintenanceLogs = async () => {
  isLoading.value = true;
  await maintenanceLogStore.fetchMaintenanceLogs(vehicleId);
  maintenanceLogs.value = maintenanceLogStore.maintenanceLogs[vehicleId] || [];
  isLoading.value = false;
};

onMounted(fetchMaintenanceLogs);
</script>

<template>
  <div class="container mt-5">
    <h1 class="text-center">Maintenance Log</h1>
    <button
      type="button"
      class="btn btn-primary mb-3"
      data-bs-toggle="modal"
      data-bs-target="#addMaintenanceLogModal"
    >
      Add Maintenance Log
    </button>
    <Loader v-if="isLoading" />
    <div v-else>
      <ul>
        <li v-for="log in maintenanceLogs" :key="log.id">
          <strong>{{ log.type }}</strong> on {{ log.date }} at
          {{ log.mileage }} miles<br />
          Notes: {{ log.notes }}
        </li>
      </ul>
    </div>
    <AddMaintenanceLogModal :vehicleId="vehicleId" />
  </div>
</template>
