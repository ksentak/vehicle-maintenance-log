import { defineStore } from 'pinia';
import { ref } from 'vue';
import { createVehicle, getVehicles } from '../services/vehicleService';
import useUserStore from './userStore';
import Vehicle from '../interfaces/Vehicle';

const useVehicleStore = defineStore('vehicleStore', () => {
  const vehicles = ref<Vehicle[]>([]);
  const userStore = useUserStore();

  const addVehicle = async (vehicle: Omit<Vehicle, 'id'>) => {
    if (userStore.user) {
      try {
        const newVehicle = await createVehicle(vehicle, userStore.user.uid);
        if (newVehicle) {
          vehicles.value = [...vehicles.value, newVehicle];
        }
      } catch (err) {
        console.error('Error adding vehicle: ', err);
      }
    } else {
      console.error('User is not authenticated.');
    }
  };

  const fetchVehicles = async () => {
    if (userStore.user) {
      try {
        vehicles.value = await getVehicles(userStore.user.uid);
      } catch (err) {
        console.error('Error retrieving vehicles: ', err);
      }
    } else {
      console.error('User is not authenticated.');
    }
  };

  return { vehicles, fetchVehicles, addVehicle };
});

export default useVehicleStore;
