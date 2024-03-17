import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BaseAppConfig} from "../../configs/base-app.config";


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({providedIn: 'root'})
export class AuthService {
  authApiUrl: string = BaseAppConfig.apiUrl + 'auth/';
  flashCallApiUrl: string = BaseAppConfig.apiUrl + 'flashcall/init_auth';
  signUpApiUrl: string = BaseAppConfig.apiUrl +'register/';
  tokenApiUrl: string = BaseAppConfig.apiUrl + 'api/token/';

  constructor(
    private http: HttpClient,
  ) {}


}
