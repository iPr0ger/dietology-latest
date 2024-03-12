export interface AppointmentRequestInterface {
  doctor: string;
  date: string;
  time: string;
  patient: string;
}

export interface AppointmentResponseInterface {
  id: string;
  doctor: string;
  date: string;
  time: string;
  patient: string;
}
