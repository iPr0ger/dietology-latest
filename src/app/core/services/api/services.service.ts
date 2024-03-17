import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({providedIn: 'root'})
export class ServicesService {
  servicesApiUrl: string = BaseAppConfig.apiUrl +'services/';

  constructor(
    private http: HttpClient
  ) {}

}
