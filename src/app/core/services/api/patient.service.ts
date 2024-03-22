import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {BaseAppConfig} from "../../configs/base-app.config";
import {Observable} from "rxjs";
import {
  PatientPhysicalDataRequestInterface,
  PatientPhysicalDataResponseInterface,
  PatientUserProfileRequestInterface,
  PatientUserProfileResponseInterface
} from "../../interfaces/patient/patient.interface";

@Injectable({providedIn: 'root'})
export class PatientService {
  patientUrl: string = BaseAppConfig.apiUrl + 'patient/';

  constructor(
    private http: HttpClient
  ) {}

  getPatientProfile(patientId: string) : Observable<PatientUserProfileResponseInterface[]> {
    return this.http.get<PatientUserProfileResponseInterface[]>(this.patientUrl + 'user-profile/' + patientId + '/');
  }

  createPatientProfile(patient: PatientUserProfileRequestInterface) : Observable<PatientUserProfileResponseInterface> {
    return this.http.post<PatientUserProfileResponseInterface>(this.patientUrl + 'user-profile/', patient);
  }

  updatePatientProfile(patientId: string, patient: PatientUserProfileRequestInterface) : Observable<PatientUserProfileResponseInterface> {
    return this.http.put<PatientUserProfileResponseInterface>(this.patientUrl + 'user-profile/' + patientId + '/', patient);
  }

  getPatientPhysicalData(patientId: string) : Observable<PatientPhysicalDataResponseInterface> {
    return this.http.get<PatientPhysicalDataResponseInterface>(this.patientUrl + 'physical-data/' + patientId + '/');
  }

  createPatientPhysicalData(patient: PatientPhysicalDataRequestInterface) : Observable<PatientPhysicalDataResponseInterface>{
    return this.http.post<PatientPhysicalDataResponseInterface>(this.patientUrl + 'physical-data/', patient);
  }
}
