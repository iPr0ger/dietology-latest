import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {BaseAppConfig} from "../../configs/base-app.config";

@Injectable({providedIn: 'root'})
export class AccountService {
  accountApiUrl: string = BaseAppConfig.apiUrl + 'account/';

  constructor(
    private http: HttpClient,
  ) {}

  confirmEmail(token: string) {
    return this.http.get(this.accountApiUrl + 'confirm-email/' + token);
  }


}
