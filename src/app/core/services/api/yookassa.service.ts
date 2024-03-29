import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {BaseAppConfig} from "../../configs/base-app.config";
import {
  CreatePaymentRequestInterface,
  CreatePaymentResponseInterface, PayoutRequestInterface, RefundRequestInterface
} from "../../interfaces/yookassa/payment.interface";

@Injectable({providedIn: 'root'})
export class YookassaService {
  yookassaApiUrl: string = BaseAppConfig.apiUrl +'yookassa/';

  constructor(
    private http: HttpClient,
  ) {}

  createPayment(payment: CreatePaymentRequestInterface) : Observable<CreatePaymentResponseInterface> {
    return this.http.post<CreatePaymentResponseInterface>(this.yookassaApiUrl + 'create_payment/', payment);
  }

  getPayments() {
    return this.http.get<any>(this.yookassaApiUrl + 'payments/');
  }

  getPaymentById(paymentId: string) {
    return this.http.get<any>(this.yookassaApiUrl + 'payments/' + paymentId + '/');
  }

  cancelPayment(paymentId: string) {
    return this.http.post<any>(this.yookassaApiUrl + 'payments/' + paymentId + '/cancel/', {});
  }

  capturePayment(paymentId: string) {
    return this.http.post<any>(this.yookassaApiUrl + 'payments/' + paymentId + '/capture/', {});
  }

  payoutPayment(payoutRequest: PayoutRequestInterface) : Observable<PayoutRequestInterface> {
    return this.http.post<PayoutRequestInterface>(this.yookassaApiUrl + 'payout/', payoutRequest);
  }

  getPayoutById(payoutId: string) {
    return this.http.get<any>(this.yookassaApiUrl + 'payouts/' + payoutId + '/');
  }

  createRefund(refundRequest: RefundRequestInterface) : Observable<RefundRequestInterface> {
    return this.http.post<RefundRequestInterface>(this.yookassaApiUrl +'refunds/', refundRequest);
  }

  getRefundById(refundId: string) {
    return this.http.get<any>(this.yookassaApiUrl +'refunds/' + refundId + '/');
  }
}
