import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({providedIn: 'root'})
export class UserSubscriptionsService {
  subscriptionsApiUrl: string = BaseAppConfig.apiUrl +'user-subscriptions/';

  constructor(
    private http: HttpClient,
  ) {}

}
