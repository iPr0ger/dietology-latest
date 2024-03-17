import {Injectable} from "@angular/core";
import {BaseAppConfig} from "../../configs/base-app.config";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {
  SendCodeEmailRequestInterface,
  SendCodeEmailResponseInterface, SendEmailMessageRequestInterface,
  SendEmailMessageResponseInterface, VerifyEmailRequestInterface, VerifyEmailResponseInterface
} from "../../interfaces/email/email.interface";

@Injectable({providedIn: 'root'})
export class EmailService {
  emailApiUrl: string = BaseAppConfig.apiUrl + 'mail/';

  constructor(
    private http: HttpClient,
  ) {}

  confirmEmail(token: string): Observable<any> {
    return this.http.get<any>(this.emailApiUrl + 'confirm-email/' + token);
  }

  sendEmailCode(request: SendCodeEmailRequestInterface): Observable<SendCodeEmailResponseInterface> {
    return this.http.post<SendCodeEmailResponseInterface>(this.emailApiUrl +'send-code-email/', request);
  }

  sendEmailMessage(request: SendEmailMessageRequestInterface): Observable<SendEmailMessageResponseInterface>{
    return this.http.post<SendEmailMessageResponseInterface>(this.emailApiUrl +'send-message-email/', request);
  }

  verifyEmail(request: VerifyEmailRequestInterface): Observable<VerifyEmailResponseInterface> {
    return this.http.post<VerifyEmailResponseInterface>(this.emailApiUrl +'verify-email/', request);
  }
}
