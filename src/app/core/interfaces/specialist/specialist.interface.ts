import {LocationResponseInterface} from "../dataset/location.interface";
import {UniversityResponseInterface} from "../dataset/university.interface";
import {ChairResponseInterface} from "../dataset/chair.interface";
import {SpecializationResponseInterface} from "../dataset/specialization.interface";
import {UserRequestInterface, UserResponseInterface} from "../account/user.interface";
import {HospitalResponseInterface} from "../dataset/hospital.interface";
import {PositionResponseInterface} from "../dataset/position.interface";

export interface FacultetResponseInterface {
  title: string;
}

export interface SpecialistEducationResponseInterface {
  id: string;
  city: LocationResponseInterface,
  university: UniversityResponseInterface,
  facultet: FacultetResponseInterface,
  chairs: ChairResponseInterface,
  specialization: FacultetResponseInterface,
  speciality: SpecializationResponseInterface,
  level_of_education: string,
  year_of_release: string,
  residency_data: string,
  accreditation_data: string,
  accreditation_details: string,
  internship_details: string,
  training: string,
  doctor: string
}

export interface SpecialistEducationRequestInterface {
  city: LocationResponseInterface,
  university: UniversityResponseInterface,
  facultet: FacultetResponseInterface,
  chairs: ChairResponseInterface,
  specialization: FacultetResponseInterface,
  speciality: SpecializationResponseInterface,
  level_of_education: string,
  year_of_release: string,
  residency_data: string,
  accreditation_data: string,
  accreditation_details: string,
  internship_details: string,
  training: string,
  doctor: string
}


export interface SpecialistProfileResponseInterface {
  id: string;
  doctor: UserResponseInterface;
  photo: string;
  date_of_birth: string;
  gender: string;
  code: string;
  snils: string;
  additional_info: string;
}

export interface SpecialistProfileRequestInterface {
  doctor: UserRequestInterface;
  photo: string;
  date_of_birth: string;
  gender: string;
  code: string;
  snils: string;
  additional_info: string;
}


export interface SpecialistWorkingExperienceResponseInterface {
  id: string;
  city: LocationResponseInterface,
  hospital: HospitalResponseInterface,
  position: PositionResponseInterface,
  brief_information: string,
  internship: string,
  user: string;
}

export interface SpecialistWorkingExperienceRequestInterface {
  city: LocationResponseInterface,
  hospital: HospitalResponseInterface,
  position: PositionResponseInterface,
  brief_information: string,
  internship: string,
  user: string;
}
