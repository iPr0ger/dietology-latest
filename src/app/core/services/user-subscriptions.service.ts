import {Injectable} from "@angular/core";
import {BaseAppConfig} from "../configs/base-app.config";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {
  UserSubscriptionRequestInterface,
  UserSubscriptionResponseInterface
} from "../interfaces/subscriptions/user-subscription.interface";
import {Observable} from "rxjs";
import {HeadersHelperService} from "../helpers/headers-helper.service";

@Injectable({providedIn: 'root'})
export class UserSubscriptionsService {
  subscriptionsApiUrl: string = BaseAppConfig.apiUrl +'user-subscriptions/';

  constructor(
    private http: HttpClient,
    private headersHelper: HeadersHelperService
  ) {}

  createUserSubscription(userSubscription: UserSubscriptionRequestInterface) : Observable<UserSubscriptionResponseInterface> {
    return this.http.post<UserSubscriptionResponseInterface>(this.subscriptionsApiUrl + 'user-subscriptions/', userSubscription);
  }

  getUserSubscriptionById(userSubscriptionId: string) : Observable<UserSubscriptionResponseInterface> {
    return this.http.get<UserSubscriptionResponseInterface>(this.subscriptionsApiUrl + 'user-subscriptions/' + userSubscriptionId + '/');
  }

  updateUserSubscription(userSubscriptionId: string, userSubscription: UserSubscriptionRequestInterface) : Observable<UserSubscriptionResponseInterface> {
    return this.http.put<UserSubscriptionResponseInterface>(this.subscriptionsApiUrl + 'user-subscriptions/' + userSubscriptionId + '/', userSubscription);
  }

  deleteUserSubscription(userSubscriptionId: string) {
    return this.http.delete(this.subscriptionsApiUrl + 'user-subscriptions/' + userSubscriptionId + '/');
  }
}
