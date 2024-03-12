import {Injectable} from "@angular/core";
import {BaseAppConfig} from "../configs/base-app.config";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {HeadersHelperService} from "../helpers/headers-helper.service";

@Injectable({providedIn: 'root'})
export class VideoService {
  videosApiUrl: string = BaseAppConfig.apiUrl +'video/api/video-chat/';

  constructor(
    private http: HttpClient,
    private headersHelper: HeadersHelperService
  ) {}

  getVideoByUserLoginId(loginId: string) : Observable<any> {
    return this.http.get<any>(this.videosApiUrl + loginId + '/');
  }
}
