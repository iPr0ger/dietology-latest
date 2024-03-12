import {Injectable} from "@angular/core";
import {BaseAppConfig} from "../configs/base-app.config";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {
  ResetPasswordEmailRequestInterface, ResetPasswordEmailResponseInterface,
  ResetPasswordRequestInterface,
  ResetPasswordResponseInterface
} from "../interfaces/account/reset-password.interface";
import {Observable} from "rxjs";
import {SendCodeRequestInterface, SendCodeResponseInterface} from "../interfaces/account/send-code.interface";
import {SendMessageRequestInterface, SendMessageResponseInterface} from "../interfaces/account/send-message.interface";
import {
  SpecialistProfileRequestInterface,
  SpecialistProfileResponseInterface
} from "../interfaces/account/specialist-profile.interface";
import {UserProfileRequestInterface, UserProfileResponseInterface} from "../interfaces/account/user-profile.interface";
import {UserRequestInterface, UserResponseInterface} from "../interfaces/account/user.interface";
import {VerifyEmailRequestInterface, VerifyEmailResponseInterface} from "../interfaces/account/verify-email.interface";
import {HeadersHelperService} from "../helpers/headers-helper.service";

@Injectable({providedIn: 'root'})
export class AccountService {
  accountApiUrl: string = BaseAppConfig.apiUrl + 'account/';

  constructor(
    private http: HttpClient,
    private headersHelper: HeadersHelperService
  ) {}

  confirmEmail(token: string) {
    return this.http.get(this.accountApiUrl + 'confirm-email/' + token);
  }

  resetPasswordByPhone(resetPasswordRequestInterface: ResetPasswordRequestInterface, code: string)
    : Observable<ResetPasswordResponseInterface> {
    return this.http.post<ResetPasswordResponseInterface>(this.accountApiUrl +'reset-password/' + code, resetPasswordRequestInterface);
  }

  resetPasswordByEmail(resetPasswordEmailRequestInterface: ResetPasswordEmailRequestInterface, code: string){
    return this.http.post<ResetPasswordEmailResponseInterface>(this.accountApiUrl +'reset-pswd-email/' + code, resetPasswordEmailRequestInterface);
  }

  sendCodeByEmail(email: SendCodeRequestInterface) : Observable<SendCodeResponseInterface> {
    return this.http.post<SendCodeResponseInterface>(this.accountApiUrl +'send-code-email/', email);
  }

  sendMessageByEmail(message: SendMessageRequestInterface) : Observable<SendMessageResponseInterface> {
    return this.http.post<SendMessageResponseInterface>(this.accountApiUrl +'send-message-email/', message);
  }

  getSpecialistProfiles() : Observable<SpecialistProfileResponseInterface[]> {
    return this.http.get<SpecialistProfileResponseInterface[]>(this.accountApiUrl +'specialist-profile/');
  }

  createSpecialistProfile(specialistProfileRequestInterface: SpecialistProfileRequestInterface) : Observable<SpecialistProfileResponseInterface> {
    return this.http.post<SpecialistProfileResponseInterface>(this.accountApiUrl +'specialist-profile/', specialistProfileRequestInterface);
  }

  getSpecialistProfileById(id: string) : Observable<SpecialistProfileResponseInterface> {
    return this.http.get<SpecialistProfileResponseInterface>(this.accountApiUrl +'specialist-profile/' + id);
  }

  updateSpecialistProfile(id: string, specialistProfileRequestInterface: SpecialistProfileRequestInterface) : Observable<SpecialistProfileResponseInterface> {
    return this.http.put<SpecialistProfileResponseInterface>(this.accountApiUrl +'specialist-profile/' + id, specialistProfileRequestInterface);
  }

  deleteSpecialistProfile(id: string) {
    return this.http.delete(this.accountApiUrl +'specialist-profile/' + id);
  }

  getUserProfiles() : Observable<UserProfileResponseInterface[]> {
    return this.http.get<UserProfileResponseInterface[]>(this.accountApiUrl + 'user-profile/');
  }

  createUserProfile(userProfileRequestInterface: UserProfileRequestInterface) : Observable<UserProfileResponseInterface> {
    return this.http.post<UserProfileResponseInterface>(this.accountApiUrl + 'user-profile/', userProfileRequestInterface);
  }

  getUserProfileById(id: string) : Observable<UserProfileResponseInterface> {
    return this.http.get<UserProfileResponseInterface>(this.accountApiUrl + 'user-profile/' + id);
  }

  updateUserProfile(id: string, userProfileRequestInterface: UserProfileRequestInterface) : Observable<UserProfileResponseInterface> {
    return this.http.put<UserProfileResponseInterface>(this.accountApiUrl + 'user-profile/' + id, userProfileRequestInterface);
  }

  deleteUserProfile(id: string) {
    return this.http.delete(this.accountApiUrl + 'user-profile/' + id);
  }

  getUsers() : Observable<UserResponseInterface[]> {
    return this.http.get<UserResponseInterface[]>(this.accountApiUrl + 'user/');
  }

  createUser(userRequestInterface: UserRequestInterface) : Observable<UserResponseInterface> {
    return this.http.post<UserResponseInterface>(this.accountApiUrl + 'user/', userRequestInterface);
  }

  getUserById(id: string) : Observable<UserResponseInterface> {
    return this.http.get<UserResponseInterface>(this.accountApiUrl + 'user/' + id);
  }

  updateUser(id: string, userRequestInterface: UserRequestInterface) : Observable<UserResponseInterface> {
    return this.http.put<UserResponseInterface>(this.accountApiUrl + 'user/' + id, userRequestInterface);
  }

  deleteUser(id: string) {
    return this.http.delete(this.accountApiUrl + 'user/' + id);
  }

  verifyEmail(email: VerifyEmailRequestInterface) : Observable<VerifyEmailResponseInterface> {
    return this.http.post<VerifyEmailResponseInterface>(this.accountApiUrl +'verify-email/', email);
  }
}
