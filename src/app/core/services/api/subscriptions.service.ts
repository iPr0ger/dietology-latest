import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {BaseAppConfig} from "../../configs/base-app.config";

@Injectable({providedIn: 'root'})
export class SubscriptionsService {
  subscriptionsApiUrl: string = BaseAppConfig.apiUrl +'subscriptions/';

  constructor(
    private http: HttpClient,
  ) {}

}
