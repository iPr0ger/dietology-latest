import {Injectable} from "@angular/core";
import {BaseAppConfig} from "../configs/base-app.config";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {AppointmentRequestInterface, AppointmentResponseInterface} from "../interfaces/schedule/appointment.interface";
import {
  DoctorWorkingHoursRequestInterface,
  DoctorWorkingHoursResponseInterface
} from "../interfaces/schedule/doctor-working-hours.interface";
import {HeadersHelperService} from "../helpers/headers-helper.service";

@Injectable({providedIn: 'root'})
export class ScheduleService {
  scheduleApiUrl: string = BaseAppConfig.apiUrl +'shedule/';

  constructor(
    private http: HttpClient,
    private headersHelper: HeadersHelperService
  ) {}

  getSchedule() : Observable<AppointmentResponseInterface[]> {
    return this.http.get<AppointmentResponseInterface[]>(this.scheduleApiUrl +'appointments/');
  }

  createAppointment(appointment: AppointmentRequestInterface) : Observable<AppointmentResponseInterface> {
    return this.http.post<AppointmentResponseInterface>(this.scheduleApiUrl +'appointments/', appointment);
  }

  getAppointmentById(appointmentId: string) : Observable<AppointmentResponseInterface> {
    return this.http.get<AppointmentResponseInterface>(this.scheduleApiUrl +'appointments/' + appointmentId + '/');
  }

  updateAppointment(appointmentId: string, appointment: AppointmentRequestInterface) : Observable<AppointmentResponseInterface> {
    return this.http.put<AppointmentResponseInterface>(this.scheduleApiUrl +'appointments/' + appointmentId + '/', appointment);
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
