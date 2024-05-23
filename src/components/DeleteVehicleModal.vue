<script setup lang="ts">
import { useRouter } from 'vue-router';
import Modal from './Modal.vue';
import useVehicleStore from '../stores/vehicleStore';

const props = defineProps<{
  vehicleId: string;
}>();

const router = useRouter();
const vehicleStore = useVehicleStore();

const deleteVehicle = async () => {
  await vehicleStore.deleteVehicle(props.vehicleId);
  router.push('/');
};
</script>

<template>
  <Modal
    :title="'Delete Vehicle'"
    :openBtnText="'Delete Vehicle'"
    :openBtnStyle="'btn btn-danger'"
    :actionBtnText="'Delete'"
    :actionBtnStyle="'btn btn-danger'"
    :submitFunc="deleteVehicle"
  >
    Are you sure you want to delete this vehicle?
  </Modal>
</template>
