import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {BaseAppConfig} from "../../configs/base-app.config";
import {
  UserSubscriptionRequestInterface,
  UserSubscriptionResponseInterface
} from "../../interfaces/subscriptions/subscription.interface";

@Injectable({providedIn: 'root'})
export class UserSubscriptionsService {
  subscriptionsApiUrl: string = BaseAppConfig.apiUrl +'user-subscriptions/';

  constructor(
    private http: HttpClient,
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
