import {Injectable} from "@angular/core";
import {BaseAppConfig} from "../configs/base-app.config";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {MessageRequestInterface, MessageResponseInterface} from "../interfaces/message/message.interface";
import {Observable} from "rxjs";
import {HeadersHelperService} from "../helpers/headers-helper.service";

@Injectable({providedIn: 'root'})
export class ChatService {
  chatApiUrl: string = BaseAppConfig.apiUrl + 'message/chat/';

  constructor(
    private http: HttpClient,
    private headersHelper: HeadersHelperService
  ) {}

  sendMessage(message: MessageRequestInterface) : Observable<MessageResponseInterface> {
    return this.http.post<MessageResponseInterface>(this.chatApiUrl, message);
  }
}
