import {MedicationPlan} from "./medication.model";

export interface User {
  address: string;
  birthDate: string;
  birthName: string;
  firstName: string;
  id: number;
  lastName: string;
  male: boolean;
  role: "DOCTOR" | "CARETAKER" | "PATIENT";
  username: string;
  password?: string;
}

export interface Patient extends User {
  role: "PATIENT"
  medicalRecord: string
  medicationPlans: MedicationPlan[]
}

export interface Caretaker extends User {
  role: "CARETAKER";
  patients: Patient[];
}

export interface Doctor extends User {
  role: "DOCTOR"
}
