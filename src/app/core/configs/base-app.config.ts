import {Injectable} from "@angular/core";

@Injectable({providedIn: 'root'})
export class BaseAppConfig {
  static apiUrl: string = 'https://api.nutrisha.live/';

  static wsEndpoint = 'ws://api-ws.nutrisha.live/';

  static systemUserName: string = 'front';
  static systemUserPassword: string = 'dietportal';

  static testClientUsername: string = 'user121@example.com';
  static testClientEmail: string = 'user121@example.com';
  static testClientPassword: string = '12345';
}
