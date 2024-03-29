import {Injectable} from "@angular/core";
import {JsonHelperService} from "../../helpers/json-helper.service";
import {StorageKeysConfig} from "../../configs/storage-keys.config";
import {SessionStorageService} from "./session-storage.service";
import {TokenResponseInterface} from "../../interfaces/token/token.interface";

@Injectable({providedIn: 'root'})
export class TokenStorageService extends SessionStorageService {
  constructor(
    private jsonHelper: JsonHelperService
  ){
    super();
  }

  saveToken(token: TokenResponseInterface){
    window.sessionStorage.setItem(StorageKeysConfig.storageTokenKeyName, JSON.stringify(token));
  }

  getToken(): TokenResponseInterface {
    return this.jsonHelper.parseJson<TokenResponseInterface>(window.sessionStorage.getItem(StorageKeysConfig.storageTokenKeyName));
  }

  removeToken(): void {
    window.sessionStorage.removeItem(StorageKeysConfig.storageTokenKeyName);
  }
}
