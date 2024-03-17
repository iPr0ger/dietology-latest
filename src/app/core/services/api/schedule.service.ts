import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {BaseAppConfig} from "../../configs/base-app.config";
import {
  AppointmentsRequestInterface,
  AppointmentsResponseInterface,
  DoctorWorkingHoursRequestInterface,
  DoctorWorkingHoursResponseInterface
} from "../../interfaces/schedule/schedule.interface";
import {Observable} from "rxjs";


@Injectable({providedIn: 'root'})
export class ScheduleService {
  scheduleApiUrl: string = BaseAppConfig.apiUrl +'shedule/';

  constructor(
    private http: HttpClient
  ) {}

  getSchedule() : Observable<AppointmentsResponseInterface[]> {
    return this.http.get<AppointmentsResponseInterface[]>(this.scheduleApiUrl +'appointments/');
  }

  createAppointment(appointment: AppointmentsRequestInterface) : Observable<AppointmentsResponseInterface> {
    return this.http.post<AppointmentsResponseInterface>(this.scheduleApiUrl +'appointments/', appointment);
  }

  getAppointmentById(appointmentId: string) : Observable<AppointmentsResponseInterface> {
    return this.http.get<AppointmentsResponseInterface>(this.scheduleApiUrl +'appointments/' + appointmentId + '/');
  }

  updateAppointment(appointmentId: string, appointment: AppointmentsRequestInterface) : Observable<AppointmentsResponseInterface> {
    return this.http.put<AppointmentsResponseInterface>(this.scheduleApiUrl +'appointments/' + appointmentId + '/', appointment);
  }

  deleteAppointment(appointmentId: string) {
    return this.http.delete(this.scheduleApiUrl +'appointments/' + appointmentId + '/');
  }

  getDoctorWorkingHours(doctor: string) : Observable<DoctorWorkingHoursResponseInterface> {
    return this.http.get<DoctorWorkingHoursResponseInterface>(this.scheduleApiUrl +'doctor-working-hours/' + doctor + '/');
  }

  updateDoctorWorkingHours(doctor: string, doctorWorkingHours: DoctorWorkingHoursRequestInterface) : Observable<DoctorWorkingHoursResponseInterface> {
    return this.http.put<DoctorWorkingHoursResponseInterface>(this.scheduleApiUrl +'doctor-working-hours/' + doctor + '/', doctorWorkingHours);
  }

  deleteDoctorWorkingHours(doctor: string) {
    return this.http.delete(this.scheduleApiUrl +'doctor-working-hours/' + doctor + '/');
  }

  createDoctorWorkingHours(doctorWorkingHours: DoctorWorkingHoursRequestInterface) : Observable<DoctorWorkingHoursResponseInterface>{
    return this.http.post<DoctorWorkingHoursResponseInterface>(this.scheduleApiUrl +'doctor-working-hours/', doctorWorkingHours);
  }

  getDoctorSchedule(doctor: string) : Observable<DoctorWorkingHoursResponseInterface[]> {
    return this.http.get<DoctorWorkingHoursResponseInterface[]>(this.scheduleApiUrl +'doctor/' + doctor);
  }

  getDoctorFreeTimeSlots(doctor: string, date: string) : Observable<DoctorWorkingHoursResponseInterface[]> {
    return this.http.get<DoctorWorkingHoursResponseInterface[]>(this.scheduleApiUrl +'doctor/' + doctor + '/date/' + date + '/free-time/');
  }

  getDoctorRecentDates(doctor: string) : Observable<Record<string, string[]>> {
    return this.http.get<Record<string, string[]>>(this.scheduleApiUrl +'doctors/' + doctor + '/recent-dates-and-times/');
  }
}
