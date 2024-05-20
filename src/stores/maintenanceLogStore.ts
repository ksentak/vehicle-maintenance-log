import { defineStore } from 'pinia';
import { ref } from 'vue';
import {
  createMaintenanceLog,
  getMaintenanceLogs,
} from '../services/maintenanceLogService';
import useUserStore from './userStore';
import MaintenanceLog from '../interfaces/MaintenanceLog';

const useMaintenanceLogStore = defineStore('maintenanceLogStore', () => {
  const maintenanceLogs = ref<{ [vehicleId: string]: MaintenanceLog[] }>({});

  const userStore = useUserStore();

  const addMaintenanceLog = async (log: Omit<MaintenanceLog, 'id'>) => {
    const { vehicleId } = log;
    if (userStore.user) {
      try {
        const newLog = await createMaintenanceLog(
          userStore.user.uid,
          vehicleId,
          log,
        );
        if (newLog) {
          maintenanceLogs.value[vehicleId] = [
            ...maintenanceLogs.value[vehicleId],
            newLog,
          ];
        }
      } catch (err) {
        console.error('Error adding vehicle: ', err);
      }
    } else {
      console.error('User is not authenticated.');
    }
  };

  const fetchMaintenanceLogs = async (vehicleId: string) => {
    if (userStore.user) {
      if (!maintenanceLogs.value[vehicleId]) {
        try {
          maintenanceLogs.value[vehicleId] = await getMaintenanceLogs(
            userStore.user.uid,
            vehicleId,
          );
        } catch (err) {
          console.error('Error retrieving maintenance logs: ', err);
        }
      }
    } else {
      console.error('User is not authenticated.');
    }
  };

  return { maintenanceLogs, fetchMaintenanceLogs, addMaintenanceLog };
});

export default useMaintenanceLogStore;
