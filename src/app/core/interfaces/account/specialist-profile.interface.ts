import {MinimalUserResponseInterface, UserResponseInterface} from "./user.interface";

export interface SpecialistProfileResponseInterface {
  id: string | null;
  photo: string | null;
  date_of_birth: string | null;
  gender: string | null;
  code: string | null;
  snils: string | null;
  additional_info: string | null;
  doctor: MinimalUserResponseInterface | null;
}

export interface SpecialistProfileRequestInterface {
  date_of_birth: string;
  gender: string;
  code: string;
  snils: string;
  additional_info: string;
  user: string;
}
