import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {BaseAppConfig} from "../../configs/base-app.config";
import {DatasetResponseInterface} from "../../interfaces/dataset/dataset-response.interface";
import {ChairResponseInterface} from "../../interfaces/dataset/chair.interface";
import {HospitalResponseInterface} from "../../interfaces/dataset/hospital.interface";
import {LocationResponseInterface} from "../../interfaces/dataset/location.interface";
import {PositionResponseInterface} from "../../interfaces/dataset/position.interface";
import {SpecializationResponseInterface} from "../../interfaces/dataset/specialization.interface";
import {UniversityResponseInterface} from "../../interfaces/dataset/university.interface";

@Injectable({providedIn: 'root'})
export class DatasetsService {
  datasetsApiUrl: string = BaseAppConfig.apiUrl + 'dataset/';

  constructor(
    private http: HttpClient,
  ) {}

  getChairs() : Observable<DatasetResponseInterface<ChairResponseInterface>> {
    return this.http.get<DatasetResponseInterface<ChairResponseInterface>>(this.datasetsApiUrl + 'chairs/');
  }

  getChairById(chairId: string) : Observable<ChairResponseInterface> {
    return this.http.get<ChairResponseInterface>(this.datasetsApiUrl + 'chairs/' + chairId + '/');
  }

  getHospitals() : Observable<DatasetResponseInterface<HospitalResponseInterface>> {
    return this.http.get<DatasetResponseInterface<HospitalResponseInterface>>(this.datasetsApiUrl + 'hospital/');
  }

  getHospitalById(hospitalId: string) : Observable<HospitalResponseInterface> {
    return this.http.get<HospitalResponseInterface>(this.datasetsApiUrl + 'hospital/' + hospitalId + '/');
  }

  getLocations() : Observable<DatasetResponseInterface<LocationResponseInterface>> {
    return this.http.get<DatasetResponseInterface<LocationResponseInterface>>(this.datasetsApiUrl + 'location/');
  }

  getLocationById(locationId: string) : Observable<LocationResponseInterface> {
    return this.http.get<LocationResponseInterface>(this.datasetsApiUrl + 'location/' + locationId + '/');
  }

  getPositions() : Observable<DatasetResponseInterface<PositionResponseInterface>> {
    return this.http.get<DatasetResponseInterface<PositionResponseInterface>>(this.datasetsApiUrl + 'position/');
  }

  getPositionById(positionId: string) : Observable<PositionResponseInterface> {
    return this.http.get<PositionResponseInterface>(this.datasetsApiUrl + 'position/' + positionId + '/');
  }

  getSpecializations() : Observable<DatasetResponseInterface<SpecializationResponseInterface>> {
    return this.http.get<DatasetResponseInterface<SpecializationResponseInterface>>(this.datasetsApiUrl +'specialization/');
  }

  getSpecializationById(specializationId: string) : Observable<SpecializationResponseInterface> {
    return this.http.get<SpecializationResponseInterface>(this.datasetsApiUrl +'specialization/' + specializationId + '/');
  }

  getUniversities() : Observable<DatasetResponseInterface<UniversityResponseInterface>> {
    return this.http.get<DatasetResponseInterface<UniversityResponseInterface>>(this.datasetsApiUrl + 'university/');
  }

  getUniversityById(universityId: string) : Observable<UniversityResponseInterface> {
    return this.http.get<UniversityResponseInterface>(this.datasetsApiUrl + 'university/' + universityId + '/');
  }
}
