export default interface MaintenanceLog {
  id: string;
  vehicleId: string;
  type: string;
  date: string;
  mileage: number;
  notes?: string;
}
