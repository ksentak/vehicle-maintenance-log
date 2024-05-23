<script setup lang="ts">
import { ref } from 'vue';
import Modal from './Modal.vue';
import MaintenanceLogForm from './MaintenanceLogForm.vue';
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
    <MaintenanceLogForm :isEditing="isEditing" :logData="maintenanceLog" />
  </Modal>
  <Modal
    v-else
    :title="'Add Maintenance Log'"
    :openBtnText="'Add Log'"
    :actionBtnText="'Save'"
    :submitFunc="addMaintenanceLog"
  >
    <MaintenanceLogForm :isEditing="false" :logData="maintenanceLog" />
  </Modal>
</template>
