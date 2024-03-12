import {Injectable} from "@angular/core";

@Injectable({providedIn: 'root'})
export class JwtHelperService {
  constructor() {
  }

  isTokenExpired(token: string): boolean {
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    return expiry * 1000 > Date.now();
  }
}
