import { doc, setDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '../db/firebase';
import MaintenanceLog from '../interfaces/MaintenanceLog';

const addMaintenanceLog = async (
  maintenanceLog: MaintenanceLog,
  userId: string,
) => {
  try {
    const { vehicleId, ...logData } = maintenanceLog;
    const maintenanceLogsCollection = collection(
      db,
      'users',
      userId,
      'vehicles',
      vehicleId,
      'maintenanceLogs',
    );
    const maintenanceLogDocRef = doc(maintenanceLogsCollection);
    await setDoc(maintenanceLogDocRef, logData);
  } catch (err) {
    console.error('Error adding maintenance log: ', err);
  }
};

const getMaintenanceLogs = async (
  userId: string,
  vehicleId: string,
): Promise<MaintenanceLog[]> => {
  const maintenanceLogs: MaintenanceLog[] = [];
  try {
    const maintenanceLogsCollection = collection(
      db,
      'users',
      userId,
      'vehicles',
      vehicleId,
      'maintenanceLogs',
    );
    const maintenanceLogsSnapshot = await getDocs(maintenanceLogsCollection);
    maintenanceLogsSnapshot.forEach((doc) => {
      maintenanceLogs.push({
        id: doc.id,
        vehicleId,
        ...doc.data(),
      } as MaintenanceLog);
    });
  } catch (err) {
    console.error('Error retrieving maintenance logs: ', err);
  }
  return maintenanceLogs;
};

export { addMaintenanceLog, getMaintenanceLogs };
