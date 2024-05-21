import {
  doc,
  setDoc,
  collection,
  getDocs,
  deleteDoc,
} from 'firebase/firestore';
import { db } from '../db/firebase';
import MaintenanceLog from '../interfaces/MaintenanceLog';

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
    maintenanceLogs.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );
  } catch (err) {
    console.error('Error retrieving maintenance logs: ', err);
  }
  return maintenanceLogs;
};

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

const editMaintenanceLog = async (
  userId: string,
  vehicleId: string,
  maintenanceLog: MaintenanceLog,
): Promise<void> => {
  try {
    const maintenanceLogDocRef = doc(
      db,
      'users',
      userId,
      'vehicles',
      vehicleId,
      'maintenanceLogs',
      maintenanceLog.id,
    );
    await setDoc(maintenanceLogDocRef, maintenanceLog, { merge: true });
  } catch (err) {
    console.error('Error editing maintenance log: ', err);
  }
};

const removeMaintenanceLog = async (
  userId: string,
  vehicleId: string,
  logId: string,
): Promise<void> => {
  try {
    const maintenanceLogDocRef = doc(
      db,
      'users',
      userId,
      'vehicles',
      vehicleId,
      'maintenanceLogs',
      logId,
    );
    await deleteDoc(maintenanceLogDocRef);
  } catch (err) {
    console.error('Error removing maintenance log: ', err);
  }
};

export {
  getMaintenanceLogs,
  createMaintenanceLog,
  editMaintenanceLog,
  removeMaintenanceLog,
};
