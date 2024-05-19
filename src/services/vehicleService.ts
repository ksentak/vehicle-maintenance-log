import { doc, setDoc } from 'firebase/firestore';
import { db } from '../db/firebase';

interface Vehicle {
  make: string;
  model: string;
  year: number;
  vin?: string;
  mileage?: number;
}

const addVehicle = async (vehicle: Vehicle, userId: string) => {
  try {
    const { make, model, year, vin, mileage } = vehicle;
    const vehicleDocRef = doc(
      db,
      'users',
      userId,
      'vehicles',
      `${make}-${model}-${year}`,
    );
    await setDoc(vehicleDocRef, vehicle);
  } catch (err) {
    console.error('Error adding vehicle: ', err);
  }
};
export { addVehicle };
