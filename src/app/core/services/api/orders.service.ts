import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {BaseAppConfig} from "../../configs/base-app.config";
import {OrdersRequestInterface, OrdersResponseInterface} from "../../interfaces/orders/orders.interface";


@Injectable({providedIn: 'root'})
export class OrdersService {
  ordersApiUrl: string = BaseAppConfig.apiUrl + 'orders/';

  constructor(
    private http: HttpClient
  ) {}

  getOrderById(orderId: string): Observable<OrdersResponseInterface> {
    return this.http.get<OrdersResponseInterface>(this.ordersApiUrl + 'orders-details/' + orderId + '/');
  }

  updateOrderById(orderId: string, order: OrdersRequestInterface): Observable<OrdersResponseInterface> {
    return this.http.put<OrdersResponseInterface>(this.ordersApiUrl + 'orders-details/' + orderId + '/', order);
  }

  deleteOrderById(orderId: string): Observable<any> {
    return this.http.delete(this.ordersApiUrl + 'orders-details/' + orderId + '/');
  }

  getOrders(): Observable<OrdersResponseInterface[]> {
    return this.http.get<OrdersResponseInterface[]>(this.ordersApiUrl + 'orders-list-create/');
  }

  addOrders(order: OrdersRequestInterface): Observable<OrdersResponseInterface> {
    return this.http.post<OrdersResponseInterface>(this.ordersApiUrl + 'orders-list-create/', order);
  }
}
