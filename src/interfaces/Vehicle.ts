export default interface Vehicle {
  id?: string;
  make: string;
  model: string;
  year: number | null;
  vin?: string;
  mileage?: number | null;
}
