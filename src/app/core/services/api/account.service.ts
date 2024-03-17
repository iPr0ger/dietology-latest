import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {BaseAppConfig} from "../../configs/base-app.config";
import {DocumentRequestInterface, DocumentResponseInterface} from "../../interfaces/account/document.interface";
import {
  ResetPasswordEmailRequestInterface, ResetPasswordEmailResponseInterface,
  ResetPasswordRequestInterface,
  ResetPasswordResponseInterface
} from "../../interfaces/account/reset-password.interface";
import {UserRequestInterface, UserResponseInterface} from "../../interfaces/account/user.interface";

@Injectable({providedIn: 'root'})
export class AccountService {
  accountApiUrl: string = BaseAppConfig.apiUrl + 'account/';

  constructor(
    private http: HttpClient,
  ) {}

  getDocumentById(documentId: string): Observable<DocumentResponseInterface> {
    return this.http.get<DocumentResponseInterface>(this.accountApiUrl + 'document/' + documentId + '/');
  }

  updateDocument(documentId: string, document: DocumentRequestInterface): Observable<DocumentResponseInterface> {
    return this.http.put<DocumentResponseInterface>(this.accountApiUrl + 'document/' + documentId + '/', document);
  }

  deleteDocument(documentId: string): Observable<any> {
    return this.http.delete(this.accountApiUrl + 'document/' + documentId + '/');
  }

  getUserDocuments(userId: string): Observable<DocumentResponseInterface[]> {
    return this.http.get<DocumentResponseInterface[]>(this.accountApiUrl + '/documents/' + userId + '/');
  }

  addUserDocument(userId: string, document: DocumentRequestInterface): Observable<DocumentResponseInterface> {
    return this.http.post<DocumentResponseInterface>(this.accountApiUrl + '/documents/' + userId + '/', document);
  }

  resetUserPassword(code: string, request: ResetPasswordRequestInterface): Observable<ResetPasswordResponseInterface> {
    return this.http.post<ResetPasswordResponseInterface>(this.accountApiUrl + '/reset-password/' + code + '/', request);
  }

  resetUserPasswordByEmail(code: string, request: ResetPasswordEmailRequestInterface): Observable<ResetPasswordEmailResponseInterface> {
    return this.http.post<ResetPasswordEmailResponseInterface>(this.accountApiUrl + '/reset-pswd-email/' + code + '/', request);
  }

  getUsers(): Observable<UserResponseInterface[]> {
    return this.http.get<UserResponseInterface[]>(this.accountApiUrl + 'user/');
  }

  addUser(request: UserRequestInterface): Observable<UserResponseInterface> {
    return this.http.post<UserResponseInterface>(this.accountApiUrl + 'user/', request);
  }

  getUserById(userId: string): Observable<UserResponseInterface> {
    return this.http.get<UserResponseInterface>(this.accountApiUrl + 'user/' + userId + '/');
  }

  updateUserById(userId: string, request: UserRequestInterface): Observable<UserResponseInterface> {
    return this.http.put<UserResponseInterface>(this.accountApiUrl + 'user/' + userId + '/', request);
  }

  deleteUserById(userId: string): Observable<any> {
    return this.http.delete(this.accountApiUrl + 'user/' + userId + '/');
  }
}
