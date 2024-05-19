import { doc, setDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '../db/firebase';
import Vehicle from '../interfaces/Vehicle';

const addVehicle = async (vehicle: Vehicle, userId: string) => {
  try {
    const vehiclesCollection = collection(db, 'users', userId, 'vehicles');
    const vehicleDocRef = doc(vehiclesCollection);
    await setDoc(vehicleDocRef, vehicle);
  } catch (err) {
    console.error('Error adding vehicle: ', err);
  }
};

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

export { addVehicle, getVehicles };
