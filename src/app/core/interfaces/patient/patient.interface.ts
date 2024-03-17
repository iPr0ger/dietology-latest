import {UserRequestInterface, UserResponseInterface} from "../account/user.interface";

export interface PatientPhysicalDataRequestInterface {
  current_weight: number;
  wrist_circumference: number;
  chest_circumference: number;
  waist_circumference: number;
  hip_circumference: number;
  stress_level: string;
  physical_activity_level: string;
  patient: string;
}

export interface PatientPhysicalDataResponseInterface {
  id: string;
  current_weight: number;
  wrist_circumference: number;
  chest_circumference: number;
  waist_circumference: number;
  hip_circumference: number;
  stress_level: string;
  physical_activity_level: string;
  patient: string;
}


export interface PatientUserProfileRequestInterface {
  patient: UserRequestInterface;
  date_of_birth: string;
  gender: string;
  code: string;
  additional_info: string;
}


export interface PatientUserProfileResponseInterface {
  id: string;
  patient: UserResponseInterface;
  photo: string | null;
  date_of_birth: string;
  gender: string;
  code: string;
  additional_info: string;
}
