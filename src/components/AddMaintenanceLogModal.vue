<script setup lang="ts">
import { ref } from 'vue';
import useMaintenanceLogStore from '../stores/maintenanceLogStore';
import MaintenanceLog from '../interfaces/MaintenanceLog';

const maintenanceLogStore = useMaintenanceLogStore();
const maintenanceLog = ref<Partial<MaintenanceLog>>({
  type: '',
  date: '',
  mileage: 0,
  notes: '',
});

const vehicleId = ref<string | null>(null);

const resetForm = () => {
  maintenanceLog.value = {
    type: '',
    date: '',
    mileage: 0,
    notes: '',
  };
};

const saveMaintenanceLog = async () => {
  if (vehicleId.value) {
    await maintenanceLogStore.addMaintenanceLog(
      { ...maintenanceLog.value, vehicleId: vehicleId.value } as MaintenanceLog,
      maintenanceLogStore.user?.uid!,
    );
    maintenanceLogStore.fetchMaintenanceLogs(vehicleId.value);
    resetForm();
    const modalElement = document.getElementById('addMaintenanceLogModal');
    if (modalElement) {
      const modalInstance = bootstrap.Modal.getInstance(modalElement);
      modalInstance?.hide();
    }
  }
};
</script>

<template>
  <div
    class="modal fade"
    id="addMaintenanceLogModal"
    tabindex="-1"
    aria-labelledby="addMaintenanceLogModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="addMaintenanceLogModalLabel">
            Add Maintenance Log
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <form>
            <div class="mb-3">
              <label for="type" class="form-label">Type of Maintenance</label>
              <input
                type="text"
                class="form-control"
                id="type"
                v-model="maintenanceLog.type"
                required
              />
            </div>
            <div class="mb-3">
              <label for="date" class="form-label">Date</label>
              <input
                type="date"
                class="form-control"
                id="date"
                v-model="maintenanceLog.date"
                required
              />
            </div>
            <div class="mb-3">
              <label for="mileage" class="form-label">Vehicle Mileage</label>
              <input
                type="number"
                class="form-control"
                id="mileage"
                v-model="maintenanceLog.mileage"
              />
            </div>
            <div class="mb-3">
              <label for="notes" class="form-label">Notes</label>
              <textarea
                class="form-control"
                id="notes"
                v-model="maintenanceLog.notes"
              ></textarea>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
          <button
            type="button"
            class="btn btn-primary"
            @click="saveMaintenanceLog"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
