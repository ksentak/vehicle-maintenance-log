import {
  doc,
  setDoc,
  collection,
  getDocs,
  deleteDoc,
} from 'firebase/firestore';
import { db } from '../db/firebase';
import Vehicle from '../interfaces/Vehicle';

const getVehicles = async (userId: string): Promise<Vehicle[]> => {
  const vehicles: Vehicle[] = [];
  try {
    const vehiclesCollection = collection(db, 'users', userId, 'vehicles');
    const vehiclesSnapshot = await getDocs(vehiclesCollection);
    vehiclesSnapshot.forEach((doc) => {
      vehicles.push({ id: doc.id, ...doc.data() } as Vehicle);
    });
  } catch (err) {
    console.error('Error retrieving vehicles: ', err);
  }
  return vehicles;
};

const createVehicle = async (
  vehicle: Omit<Vehicle, 'id'>,
  userId: string,
): Promise<Vehicle | undefined> => {
  try {
    const vehiclesCollection = collection(db, 'users', userId, 'vehicles');
    const vehicleDocRef = doc(vehiclesCollection);
    await setDoc(vehicleDocRef, vehicle);
    return { ...vehicle, id: vehicleDocRef.id };
  } catch (err) {
    console.error('Error adding vehicle: ', err);
  }
};

const editVehicle = async (userId: string, vehicle: Vehicle): Promise<void> => {
  try {
    const vehicleDocRef = doc(db, 'users', userId, 'vehicles', vehicle.id);
    await setDoc(vehicleDocRef, vehicle, { merge: true });
  } catch (err) {
    console.error('Error editing vehicle: ', err);
  }
};

const removeVehicle = async (
  userId: string,
  vehicleId: string,
): Promise<void> => {
  try {
    const vehicleDocRef = doc(db, 'users', userId, 'vehicles', vehicleId);
    await deleteDoc(vehicleDocRef);
  } catch (err) {
    console.error('Error removing vehicle: ', err);
  }
};

export { getVehicles, createVehicle, editVehicle, removeVehicle };
