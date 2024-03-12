import {Injectable} from "@angular/core";
import {BaseAppConfig} from "../configs/base-app.config";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {
  PurchaseDetailsRequestInterface,
  PurchaseDetailsResponseInterface
} from "../interfaces/purchases/purchase-details.interface";
import {HeadersHelperService} from "../helpers/headers-helper.service";

@Injectable({providedIn: 'root'})
export class PurchasesService{
  purchasesApiUrl: string = BaseAppConfig.apiUrl + 'purchaces/';

  constructor(
    private http: HttpClient,
    private headersHelper: HeadersHelperService
  ) {}

  getPurchaseById(purchaseId: string) : Observable<PurchaseDetailsResponseInterface> {
    return this.http.get<PurchaseDetailsResponseInterface>(this.purchasesApiUrl + 'puechaces-detail/' + purchaseId + '/');
  }

  updatePurchase(purchaseId: string, purchase: PurchaseDetailsRequestInterface) : Observable<PurchaseDetailsResponseInterface> {
    return this.http.put<PurchaseDetailsResponseInterface>(this.purchasesApiUrl + 'puechaces-detail/' + purchaseId + '/', purchase);
  }

  deletePurchase(purchaseId: string){
    return this.http.delete(this.purchasesApiUrl + 'puechaces-detail/' + purchaseId + '/');
  }

  getPurchases() : Observable<PurchaseDetailsResponseInterface[]> {
    return this.http.get<PurchaseDetailsResponseInterface[]>(this.purchasesApiUrl + 'puechaces-list-create/');
  }

  createPurchase(purchase: PurchaseDetailsRequestInterface) : Observable<PurchaseDetailsResponseInterface> {
    return this.http.post<PurchaseDetailsResponseInterface>(this.purchasesApiUrl + 'puechaces-list-create/', purchase);
  }
}
