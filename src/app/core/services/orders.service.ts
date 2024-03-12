import {Injectable} from "@angular/core";
import {BaseAppConfig} from "../configs/base-app.config";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {
  OrderDetailsRequestInterface,
  OrderDetailsResponseInterface
} from "../interfaces/orders/order-details.interface";
import {HeadersHelperService} from "../helpers/headers-helper.service";

@Injectable({providedIn: 'root'})
export class OrdersService {
  ordersApiUrl: string = BaseAppConfig.apiUrl + 'orders/';

  constructor(
    private http: HttpClient,
    private headersHelper: HeadersHelperService
  ) {}

  getOrderById(orderId: string) : Observable<OrderDetailsResponseInterface> {
    return this.http.get<OrderDetailsResponseInterface>(this.ordersApiUrl + 'order-details/' + orderId + '/');
  }

  updateOrder(orderId: string, order: OrderDetailsRequestInterface) : Observable<OrderDetailsResponseInterface> {
    return this.http.put<OrderDetailsResponseInterface>(this.ordersApiUrl + 'order-details/' + orderId + '/', order);
  }

  deleteOrder(orderId: string){
    return this.http.delete(this.ordersApiUrl + 'order-details/' + orderId + '/');
  }

  getOrders() : Observable<OrderDetailsResponseInterface[]> {
    return this.http.get<OrderDetailsResponseInterface[]>(this.ordersApiUrl + 'orders-list-create/');
  }

  createOrder(order: OrderDetailsRequestInterface) : Observable<OrderDetailsResponseInterface> {
    return this.http.post<OrderDetailsResponseInterface>(this.ordersApiUrl + 'orders-list-create/', order);
  }
}
