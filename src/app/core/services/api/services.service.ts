import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {BaseAppConfig} from "../../configs/base-app.config";
import {
  ServiceDetailsRequestInterface,
  ServiceDetailsResponseInterface
} from "../../interfaces/services/services.interface";

@Injectable({providedIn: 'root'})
export class ServicesService {
  servicesApiUrl: string = BaseAppConfig.apiUrl +'services/';

  constructor(
    private http: HttpClient
  ) {}

  getServices() : Observable<ServiceDetailsResponseInterface[]> {
    return this.http.get<ServiceDetailsResponseInterface[]>(this.servicesApiUrl +'services-list-create/');
  }

  createService(service: ServiceDetailsRequestInterface) : Observable<ServiceDetailsResponseInterface> {
    return this.http.post<ServiceDetailsResponseInterface>(this.servicesApiUrl +'services-list-create/', service);
  }

  getServiceById(serviceId: string) : Observable<ServiceDetailsResponseInterface> {
    return this.http.get<ServiceDetailsResponseInterface>(this.servicesApiUrl +'services-detail/' + serviceId + '/');
  }

  updateService(serviceId: string, service: ServiceDetailsRequestInterface) : Observable<ServiceDetailsResponseInterface> {
    return this.http.put<ServiceDetailsResponseInterface>(this.servicesApiUrl +'services-detail/' + serviceId + '/', service);
  }

  deleteService(serviceId: string) {
    return this.http.delete(this.servicesApiUrl +'services-detail/' + serviceId + '/');
  }
}
