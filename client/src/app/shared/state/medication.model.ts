export interface Medication {
  id: number;
  name: string;
  sideEffects: string;
  dosage: string;
}

export interface MedicationPlan {
  medication: Medication;
  dailyDosage: number;
  period: Date;
}
