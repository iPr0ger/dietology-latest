import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {BaseAppConfig} from "../../configs/base-app.config";
import {
  SpecialistEducationResponseInterface,
  SpecialistProfileRequestInterface,
  SpecialistProfileResponseInterface, SpecialistWorkingExperienceResponseInterface
} from "../../interfaces/specialist/specialist.interface";
import {Observable} from "rxjs";

@Injectable({providedIn: 'root'})
export class SpecialistService {
  specialistApiUrl: string = BaseAppConfig.apiUrl +'specialist/';

  constructor(
    private http: HttpClient
  ) {
  }

  getSpecialistProfiles() : Observable<SpecialistProfileResponseInterface[]> {
    return this.http.get<SpecialistProfileResponseInterface[]>(this.specialistApiUrl +'specialist-profile/');
  }

  createSpecialistProfile(specialistProfileRequestInterface: SpecialistProfileRequestInterface) : Observable<SpecialistProfileResponseInterface> {
    return this.http.post<SpecialistProfileResponseInterface>(this.specialistApiUrl +'specialist-profile/', specialistProfileRequestInterface);
  }

  getSpecialistProfileById(id: string) : Observable<SpecialistProfileResponseInterface[]> {
    return this.http.get<SpecialistProfileResponseInterface[]>(this.specialistApiUrl +'specialist-profile/' + id);
  }

  updateSpecialistProfile(id: string, specialistProfileRequestInterface: SpecialistProfileRequestInterface) : Observable<SpecialistProfileResponseInterface> {
    return this.http.put<SpecialistProfileResponseInterface>(this.specialistApiUrl +'specialist-profile/' + id, specialistProfileRequestInterface);
  }

  deleteSpecialistProfile(id: string) {
    return this.http.delete(this.specialistApiUrl +'specialist-profile/' + id);
  }


  getSpecialistWorkingExperience(doctorId: string) : Observable<SpecialistWorkingExperienceResponseInterface[]>{
    return this.http.get<SpecialistWorkingExperienceResponseInterface[]>(this.specialistApiUrl +'work-experiamce/' + doctorId + '/');
  }

  getSpecialistEducations(doctorId: string) : Observable<SpecialistEducationResponseInterface[]>{
    return this.http.get<SpecialistEducationResponseInterface[]>(this.specialistApiUrl +'educations/' + doctorId + '/');
  }
}
