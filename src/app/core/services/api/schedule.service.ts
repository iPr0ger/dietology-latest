import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";


@Injectable({providedIn: 'root'})
export class ScheduleService {
  scheduleApiUrl: string = BaseAppConfig.apiUrl +'shedule/';

  constructor(
    private http: HttpClient
  ) {}

}
