import { doc, setDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '../db/firebase';
import MaintenanceLog from '../interfaces/MaintenanceLog';

const createMaintenanceLog = async (
  userId: string,
  vehicleId: string,
  maintenanceLog: Omit<MaintenanceLog, 'id'>,
): Promise<MaintenanceLog | undefined> => {
  try {
    const maintenanceLogsCollection = collection(
      db,
      'users',
      userId,
      'vehicles',
      vehicleId,
      'maintenanceLogs',
    );
    const maintenanceLogDocRef = doc(maintenanceLogsCollection);
    await setDoc(maintenanceLogDocRef, maintenanceLog);
    return { ...maintenanceLog, id: maintenanceLogDocRef.id };
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

export { createMaintenanceLog, getMaintenanceLogs };
