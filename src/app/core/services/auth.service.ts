import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {
  SignInCodeRequestInterface, SignInCodeResponseInterface,
  SignInRequestInterface,
  SignInResponseInterface, TokenResponseInterface
} from "../interfaces/auth/sign-in.interface";
import {Observable} from "rxjs";
import {BaseAppConfig} from "../configs/base-app.config";
import {FlashCallRequestInterface, FlashCallResponseInterface} from "../interfaces/flashcall/flashcall.interface";
import {SignUpRequestInterface, SignUpResponseInterface} from "../interfaces/auth/sign-up.interface";
import {HeadersHelperService} from "../helpers/headers-helper.service";
import {UserStorageService} from "./storage/user-storage.service";
import {JsonHelperService} from "../helpers/json-helper.service";
import {TokenStorageService} from "./storage/token-storage.service";


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
    private headersHelper: HeadersHelperService,
    private userStorageService: UserStorageService,
    private tokenStorageService: TokenStorageService,
  ) {}

  signIn(signInRequest: SignInRequestInterface) : Observable<SignInResponseInterface> {
    return this.http.post<SignInResponseInterface>(this.authApiUrl +'signin/', signInRequest);
  }

  signInWithCode(signInRequest: SignInCodeRequestInterface) : Observable<SignInCodeResponseInterface> {
    return this.http.post<SignInCodeResponseInterface>(this.authApiUrl +'signin-code/', signInRequest);
  }

  signInWithPhoneAndCode(phone: string, code: string) {
    return this.http.get(this.authApiUrl +'signin/' + phone + '/' + code);
  }

  flashCallInitAuth(request: FlashCallRequestInterface) : Observable<FlashCallResponseInterface> {
    return this.http.post<FlashCallResponseInterface>(this.flashCallApiUrl, request);
  }

  signUp(signUpRequest: SignUpRequestInterface) : Observable<SignUpResponseInterface> {
    return this.http.post<SignUpResponseInterface>(this.signUpApiUrl +'signup/', signUpRequest);
  }

  login(signInRequest: SignInRequestInterface) : Observable<TokenResponseInterface> {
    return this.http.post<TokenResponseInterface>(this.tokenApiUrl, signInRequest, httpOptions);
  }

  refreshToken(): Observable<TokenResponseInterface> {
    return this.http.post<TokenResponseInterface>(this.tokenApiUrl +'refresh/', {'refresh': this.tokenStorageService.getToken().refresh});
  }
}
