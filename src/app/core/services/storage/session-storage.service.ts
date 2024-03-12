import {Injectable} from "@angular/core";
import {JsonHelperService} from "../../helpers/json-helper.service";

@Injectable({providedIn: 'root'})
export class SessionStorageService {
  clear(): void{
    window.sessionStorage.clear();
  }

  getItem(key: string): string | null {
    return window.sessionStorage.getItem(key);
  }

  setItem(key: string, value: string): void {
    window.sessionStorage.setItem(key, value);
  }
}
