import {Injectable} from "@angular/core";

@Injectable({providedIn: 'root'})
export class BaseAppConfig {
  static apiUrl: string = 'https://api.nutrisha.live/';

  static systemUserName: string = 'front';
  static systemUserPassword: string = 'dietportal';
}
