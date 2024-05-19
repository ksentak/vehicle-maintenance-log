// src/stores/vehicleStore.ts
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { getVehicles } from '../services/vehicleService';
import useUserStore from './userStore';
import Vehicle from '../interfaces/Vehicle';

const useVehicleStore = defineStore('vehicleStore', () => {
  const vehicles = ref<Vehicle[]>([]);
  const userStore = useUserStore();

  const fetchVehicles = async () => {
    if (userStore.user) {
      try {
        vehicles.value = await getVehicles(userStore.user.uid);
      } catch (err) {
        console.error('Error retrieving vehicles: ', err);
      }
    } else {
      console.error('User is not authenticated');
    }
  };

  return { vehicles, fetchVehicles };
});

export default useVehicleStore;
