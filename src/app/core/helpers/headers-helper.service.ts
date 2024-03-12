import {Injectable} from "@angular/core";
import {HttpHeaders} from "@angular/common/http";
import {BaseAppConfig} from "../configs/base-app.config";
import {TokenStorageService} from "../services/storage/token-storage.service";

@Injectable({providedIn: 'root'})
export class HeadersHelperService {
  constructor(
    private tokenStorageService: TokenStorageService
  ) {
  }

  propagateBasicAuthHeaders(headers: Headers = new Headers(),
                            username: string = BaseAppConfig.systemUserName,
                            password: string = BaseAppConfig.systemUserPassword) : Headers {
    if (headers.get('Content-Type') === null) {
      this.generateBaseHeaders(headers);
    }
    headers.append('Authorization', 'Basic ' + btoa(username + ':' + password));
    return headers;
  }

  propagateBearerAuthHeaders(headers: Headers = new Headers(), token: string) : Headers {
    if (headers.get('Content-Type') === null) {
      this.generateBaseHeaders(headers);
    }
    headers.append('Authorization', 'Bearer '+ this.tokenStorageService.getToken());
    return headers;
  }

  generateBaseHeaders(headers: Headers = new Headers()) {
    headers.append('Content-Type', 'application/json');
  }
}
