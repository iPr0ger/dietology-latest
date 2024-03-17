import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {BaseAppConfig} from "../../configs/base-app.config";
import {Observable} from "rxjs";
import {
  TokenRefreshRequestInterface,
  TokenResponseInterface,
  TokenVerifyRequestInterface
} from "../../interfaces/token/token.interface";
import {
  SignInCodeRequestInterface, SignInCodeResponseInterface,
  SignInRequestInterface,
  SignInResponseInterface
} from "../../interfaces/auth/auth.interface";
import {FlashCallRequestInterface, FlashCallResponseInterface} from "../../interfaces/flashcall/flashcall.interface";
import {
  SignUpByPhoneRequestInterface, SignUpByPhoneResponseInterface,
  SignUpRequestInterface,
  SignUpResponseInterface
} from "../../interfaces/registration/registration.interface";

@Injectable({providedIn: 'root'})
export class AuthService {
  authApiUrl: string = BaseAppConfig.apiUrl + 'auth/';
  flashCallApiUrl: string = BaseAppConfig.apiUrl + 'flashcall/init_auth/';
  signUpApiUrl: string = BaseAppConfig.apiUrl +'register/';
  tokenApiUrl: string = BaseAppConfig.apiUrl + 'api/token/';

  constructor(
    private http: HttpClient,
  ) {}

  getTokenByUsername(request: SignInRequestInterface): Observable<TokenResponseInterface> {
    return this.http.post<TokenResponseInterface>(this.tokenApiUrl, request);
  }

  refreshToken(refresh: TokenRefreshRequestInterface): Observable<TokenResponseInterface> {
    return this.http.post<TokenResponseInterface>(this.tokenApiUrl +'refresh/', refresh);
  }

  verifyToken(request: TokenVerifyRequestInterface): Observable<TokenResponseInterface> {
    return this.http.post<TokenResponseInterface>(this.tokenApiUrl +'verify/', request);
  }

  signIn(request: SignInRequestInterface): Observable<SignInResponseInterface> {
    return this.http.post<SignInResponseInterface>(this.authApiUrl + 'signin/', request);
  }

  signInWithCode(request: SignInCodeRequestInterface): Observable<SignInCodeResponseInterface> {
    return this.http.post<SignInCodeResponseInterface>(this.authApiUrl +'signin/code', request);
  }

  signInWithPhoneAndConde(phone: string, code: string): Observable<any> {
    return this.http.get<any>(this.authApiUrl +'signin/' + phone + '/' + code + '/');
  }

  flashCall(phone: FlashCallRequestInterface): Observable<FlashCallResponseInterface> {
    return this.http.post<FlashCallResponseInterface>(this.flashCallApiUrl, phone);
  }

  signUp(request: SignUpRequestInterface): Observable<SignUpResponseInterface> {
    return this.http.post<SignUpResponseInterface>(this.signUpApiUrl + 'signup/', request);
  }

  signUpWithPhone(phone: SignUpByPhoneRequestInterface): Observable<SignUpByPhoneResponseInterface> {
    return this.http.post<SignUpByPhoneResponseInterface>(this.signUpApiUrl +'signup/code', phone);
  }
}
