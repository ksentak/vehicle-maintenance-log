<script setup lang="ts">
import Modal from './Modal.vue';
import useMaintenanceLogStore from '../stores/maintenanceLogStore';
import MaintenanceLog from '../interfaces/MaintenanceLog';

const props = defineProps<{
  logData: MaintenanceLog;
}>();

const maintenanceLogStore = useMaintenanceLogStore();

const deleteMaintenanceLog = async () => {
  await maintenanceLogStore.deleteMaintenanceLog(props.logData);
};
</script>

<template>
  <Modal
    :title="'Delete Maintenance Log'"
    :openBtnText="'Delete'"
    :openBtnStyle="'btn btn-danger btn-sm me-2'"
    :actionBtnText="'Delete'"
    :actionBtnStyle="'btn btn-danger'"
    :submitFunc="deleteMaintenanceLog"
  >
    Are you sure you want to delete this log?
  </Modal>
</template>
