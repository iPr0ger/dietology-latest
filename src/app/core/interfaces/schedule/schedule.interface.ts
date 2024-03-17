export interface AppointmentsResponseInterface {
  id: string;
  doctor: string;
  date: string;
  time: string;
  patient: string;
}

export interface AppointmentsRequestInterface {
  doctor: string;
  date: string;
  time: string;
  patient: string;
}


export interface DoctorWorkingHoursResponseInterface {
  id: string;
  date: string;
  start_time: string;
  end_time: string;
  doctor: string;
}

export interface DoctorWorkingHoursRequestInterface {
  date: string;
  start_time: string;
  end_time: string;
  doctor: string;
}




