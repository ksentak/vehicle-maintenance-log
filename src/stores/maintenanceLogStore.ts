import { defineStore } from 'pinia';
import { ref } from 'vue';
import {
  createMaintenanceLog,
  editMaintenanceLog,
  getMaintenanceLogs,
  removeMaintenanceLog,
} from '../services/maintenanceLogService';
import useUserStore from './userStore';
import MaintenanceLog from '../interfaces/MaintenanceLog';

const useMaintenanceLogStore = defineStore('maintenanceLogStore', () => {
  const maintenanceLogs = ref<{ [vehicleId: string]: MaintenanceLog[] }>({});

  const userStore = useUserStore();

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
            newLog,
            ...maintenanceLogs.value[vehicleId],
          ];
        }
      } catch (err) {
        console.error('Error adding maintenance log: ', err);
      }
    } else {
      console.error('User is not authenticated.');
    }
  };

  const updateMaintenanceLog = async (log: MaintenanceLog) => {
    const { vehicleId } = log;
    if (userStore.user) {
      try {
        await editMaintenanceLog(userStore.user.uid, vehicleId, log);
        const index = maintenanceLogs.value[vehicleId].findIndex(
          (l) => l.id === log.id,
        );
        if (index !== -1) {
          maintenanceLogs.value[vehicleId][index] = log;
          maintenanceLogs.value[vehicleId].sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
          );
        }
      } catch (err) {
        console.error('Error updating maintenance log: ', err);
      }
    } else {
      console.error('User is not authenticated.');
    }
  };

  const deleteMaintenanceLog = async (log: MaintenanceLog) => {
    const { vehicleId, id } = log;
    if (userStore.user) {
      try {
        await removeMaintenanceLog(userStore.user.uid, vehicleId, id);
        maintenanceLogs.value[vehicleId] = maintenanceLogs.value[
          vehicleId
        ].filter((item) => item.id !== id);
      } catch (err) {
        console.error('Error deleting maintenance log: ', err);
      }
    } else {
      console.error('User is not authenticated.');
    }
  };

  return {
    maintenanceLogs,
    fetchMaintenanceLogs,
    addMaintenanceLog,
    updateMaintenanceLog,
    deleteMaintenanceLog,
  };
});

export default useMaintenanceLogStore;
