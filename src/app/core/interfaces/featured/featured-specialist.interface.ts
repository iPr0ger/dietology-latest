import {UserRequestInterface} from "../account/user.interface";

export interface FeaturedSpecialistRequestInterface {
  specialist: UserRequestInterface;
  patient: string;
  description: string;
}


export interface FeaturedSpecialistResponseInterface {
  id: string;
  specialist: UserRequestInterface;
  patient: string;
  description: string;
  created_at: string;
}
