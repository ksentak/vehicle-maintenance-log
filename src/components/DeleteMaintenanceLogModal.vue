<script setup lang="ts">
import Modal from './Modal.vue';
import useMaintenanceLogStore from '../stores/maintenanceLogStore';
import MaintenanceLog from '../interfaces/MaintenanceLog';

const props = defineProps<{
  logData: MaintenanceLog;
}>();

const maintenanceLogStore = useMaintenanceLogStore();

const deleteMaintenanceLog = () => {
  maintenanceLogStore.deleteMaintenanceLog(props.logData);
};
</script>

<template>
  <Modal
    :title="'Delete Maintenance Log'"
    :openBtnText="'Delete'"
    :openBtnStyle="'btn btn-danger btn-sm'"
    :actionBtnText="'Delete'"
    :actionBtnStyle="'btn btn-danger'"
    :submitFunc="deleteMaintenanceLog"
  >
    Are you sure you want to delete this log?
  </Modal>
</template>
