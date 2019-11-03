import {Caretaker, Patient, User} from "./user.model";
import {Medication} from "./medication.model";

export interface State {
  user: User,
  patients: Patient[],
  caretakers: Caretaker[],
  viewedUser: User,
  viewedMedication: Medication;
  medications: Medication[];
  error: string;
}

export const initialState: State = {
  user: null,
  patients: [],
  caretakers: [],
  viewedUser: null,
  viewedMedication: null,
  medications: [],
  error: null
};
