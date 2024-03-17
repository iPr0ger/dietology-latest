import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {BaseAppConfig} from "../../configs/base-app.config";

@Injectable({providedIn: 'root'})
export class UserSubscriptionsService {
  subscriptionsApiUrl: string = BaseAppConfig.apiUrl +'user-subscriptions/';

  constructor(
    private http: HttpClient,
  ) {}

}
