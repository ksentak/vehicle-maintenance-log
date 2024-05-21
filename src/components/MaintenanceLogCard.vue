<script setup lang="ts">
import MaintenanceLog from '../interfaces/MaintenanceLog';
import MaintenanceLogModal from './MaintenanceLogModal.vue';
import DeleteMaintenanceLogModal from './DeleteMaintenanceLogModal.vue';

defineProps<{
  log: MaintenanceLog;
  vehicleId: string;
}>();
</script>

<template>
  <div class="card mb-3">
    <div class="card-body d-flex flex-column justify-content-between">
      <div>
        <h4 class="card-title">{{ log.date }}</h4>
        <h5 class="text-capitalize">{{ log.type }}</h5>
        <h6 class="card-subtitle mb-2 text-muted">
          at {{ log.mileage }} miles
        </h6>
        <p class="card-text mt-3">Notes: {{ log.notes }}</p>
      </div>
      <div class="mt-auto d-flex justify-content-end align-items-center">
        <MaintenanceLogModal
          :vehicleId="vehicleId"
          :isEditing="true"
          :btnStyle="'btn btn-primary btn-sm me-2'"
          :logData="log"
        />
        <DeleteMaintenanceLogModal :logData="log" />
        <!-- <button class="btn btn-danger btn-sm">Delete</button> -->
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
