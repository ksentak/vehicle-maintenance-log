<script setup lang="ts">
import { ref } from 'vue';
import Modal from './Modal.vue';
import useMaintenanceLogStore from '../stores/maintenanceLogStore';
import MaintenanceLog from '../interfaces/MaintenanceLog';

const props = defineProps<{
  vehicleId: string;
  isEditing: boolean;
  logData?: MaintenanceLog;
  btnStyle?: string;
}>();

const maintenanceLog = ref<any>({
  type: '',
  date: '',
  mileage: 0,
  notes: '',
});

const maintenanceLogStore = useMaintenanceLogStore();

if (props.isEditing && props.logData) {
  maintenanceLog.value = { ...props.logData };
}

const addMaintenanceLog = async () => {
  const formattedLog = { ...maintenanceLog.value, vehicleId: props.vehicleId };
  await maintenanceLogStore.addMaintenanceLog(formattedLog);
};

const updateMaintenanceLog = async () => {
  await maintenanceLogStore.updateMaintenanceLog(maintenanceLog.value);
};
</script>

<!-- Must refactor at a later date -->
<template>
  <Modal
    v-if="isEditing"
    :title="'Edit Maintenance Log'"
    :openBtnText="'Edit Log'"
    :openBtnStyle="btnStyle"
    :actionBtnText="'Update'"
    :submitFunc="updateMaintenanceLog"
  >
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
  </Modal>

  <Modal
    v-else
    :title="'Add Maintenance Log'"
    :openBtnText="'Add Log'"
    :actionBtnText="'Save'"
    :submitFunc="addMaintenanceLog"
  >
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
  </Modal>
</template>
