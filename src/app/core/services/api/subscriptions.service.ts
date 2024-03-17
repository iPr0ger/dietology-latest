import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {BaseAppConfig} from "../../configs/base-app.config";
import {
  SubscriptionRequestInterface,
  SubscriptionResponseInterface
} from "../../interfaces/subscriptions/subscription.interface";

@Injectable({providedIn: 'root'})
export class SubscriptionsService {
  subscriptionsApiUrl: string = BaseAppConfig.apiUrl +'subscriptions/';

  constructor(
    private http: HttpClient,
  ) {}

  getSubscriptions() : Observable<SubscriptionResponseInterface[]> {
    return this.http.get<SubscriptionResponseInterface[]>(this.subscriptionsApiUrl +'subscriptions/');
  }

  createSubscription(subscription: SubscriptionRequestInterface) : Observable<SubscriptionResponseInterface> {
    return this.http.post<SubscriptionResponseInterface>(this.subscriptionsApiUrl +'subscriptions/', subscription);
  }

  getSubscriptionById(subscriptionId: string) : Observable<SubscriptionResponseInterface> {
    return this.http.get<SubscriptionResponseInterface>(this.subscriptionsApiUrl +'subscriptions/' + subscriptionId + '/');
  }

  updateSubscription(subscriptionId: string, subscription: SubscriptionRequestInterface) : Observable<SubscriptionResponseInterface> {
    return this.http.put<SubscriptionResponseInterface>(this.subscriptionsApiUrl +'subscriptions/' + subscriptionId + '/', subscription);
  }

  deleteSubscription(subscriptionId: string) {
    return this.http.delete(this.subscriptionsApiUrl +'subscriptions/' + subscriptionId + '/');
  }
}
