<script setup lang="ts">
import { ref, onMounted } from 'vue';
import capitalize from 'lodash/capitalize';
import AddVehicleCard from '../components/AddVehicleCard.vue';
import useUserStore from '../stores/userStore';
import { getVehicles } from '../services/vehicleService';
import Vehicle from '../interfaces/Vehicle';

const vehicles = ref<Vehicle[]>([]);
const userStore = useUserStore();

const fetchVehicles = async () => {
  if (userStore.user) {
    try {
      vehicles.value = await getVehicles(userStore.user.uid);
    } catch (err) {
      console.log(err);
    }
  } else {
    console.error('User is not authenticated.');
  }
};

onMounted(fetchVehicles);
</script>

<template>
  <div class="container mt-5">
    <h1 class="text-center">Welcome to Vehicle Maintenance Log</h1>
    <div class="row mt-4">
      <div
        v-for="(vehicle, index) in vehicles"
        :key="index"
        class="col-12 col-md-4 mb-4"
      >
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">
              {{ vehicle.year }} {{ capitalize(vehicle.make) }}
              {{ capitalize(vehicle.model) }}
            </h5>
          </div>
        </div>
      </div>
      <AddVehicleCard />
    </div>
  </div>
</template>

<style scoped></style>
