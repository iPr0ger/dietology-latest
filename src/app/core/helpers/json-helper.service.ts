import {Injectable} from "@angular/core";

@Injectable({providedIn: 'root'})
export class JsonHelperService {
  constructor() {}

  parseJson<T>(json: string | null): T | any {
    if (!json) {
      return null;
    }
    try {
      const jsonValue: T = JSON.parse(json);
      return jsonValue;
    } catch {
      return null;
    }
  }
}
