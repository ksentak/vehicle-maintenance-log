<script setup lang="ts">
import { ref } from 'vue';
import useMaintenanceLogStore from '../stores/maintenanceLogStore';
import MaintenanceLog from '../interfaces/MaintenanceLog';

const props = defineProps<{ vehicleId: string }>();
const maintenanceLog = ref({
  type: '',
  date: '',
  mileage: 0,
  notes: '',
});

const maintenanceLogStore = useMaintenanceLogStore();

const resetForm = () => {
  maintenanceLog.value = {
    type: '',
    date: '',
    mileage: 0,
    notes: '',
  };
};

const formatMaintenanceLog = (): Omit<MaintenanceLog, 'id'> => {
  return { ...maintenanceLog.value, vehicleId: props.vehicleId };
};

const saveMaintenanceLog = async () => {
  const formattedLog = formatMaintenanceLog();
  maintenanceLogStore.addMaintenanceLog(formattedLog);
  resetForm();

  const modalElement = document.getElementById('addMaintenanceLogModal');
  if (modalElement) {
    const modalInstance = bootstrap.Modal.getInstance(modalElement);
    modalInstance?.hide();
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
