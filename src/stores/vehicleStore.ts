import { defineStore } from 'pinia';
import { ref } from 'vue';
import {
  getVehicles,
  createVehicle,
  editVehicle,
  removeVehicle,
} from '../services/vehicleService';
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
      console.error('User is not authenticated.');
    }
  };

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

  const updateVehicle = async (vehicle: Vehicle) => {
    if (userStore.user) {
      try {
        await editVehicle(userStore.user.uid, vehicle);
        const index = vehicles.value.findIndex((v) => v.id === vehicle.id);
        if (index !== -1) {
          vehicles.value[index] = vehicle;
        }
      } catch (err) {
        console.error('Error updating vehicle: ', err);
      }
    } else {
      console.error('User is not authenticated.');
    }
  };

  const deleteVehicle = async (vehicleId: string) => {
    if (userStore.user) {
      try {
        await removeVehicle(userStore.user.uid, vehicleId);
        vehicles.value = vehicles.value.filter(
          (vehicle) => vehicle.id !== vehicleId,
        );
      } catch (err) {
        console.error('Error deleting vehicle.');
      }
    } else {
      console.error('User is not authenticated.');
    }
  };

  return { vehicles, fetchVehicles, addVehicle, updateVehicle, deleteVehicle };
});

export default useVehicleStore;
