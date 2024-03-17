import {Injectable} from "@angular/core";
import {JsonHelperService} from "../../helpers/json-helper.service";
import {UserResponseInterface} from "../../interfaces/account/user.interface";
import {SessionStorageService} from "./session-storage.service";
import {StorageKeysConfig} from "../../configs/storage-keys.config";
import {PatientUserProfileResponseInterface} from "../../interfaces/patient/patient.interface";
import {SpecialistProfileResponseInterface} from "../../interfaces/specialist/specialist.interface";

@Injectable({providedIn: 'root'})
export class UserStorageService extends SessionStorageService {
  constructor(
    private jsonHelper: JsonHelperService
  ){
    super();
  }

  saveUser(user: UserResponseInterface): void {
    window.sessionStorage.setItem(StorageKeysConfig.storageUserKeyName, JSON.stringify(user));
  }

  getUser(): UserResponseInterface {
    return this.jsonHelper.parseJson<UserResponseInterface>(window.sessionStorage.getItem(StorageKeysConfig.storageUserKeyName));
  }

  removeUser(): void {
    window.sessionStorage.removeItem(StorageKeysConfig.storageUserKeyName);
  }

  saveIsSpecialist(isSpecialist: boolean): void {
    window.sessionStorage.setItem(StorageKeysConfig.storageIsSpecialistKeyName, JSON.stringify(isSpecialist));
  }

  getIsSpecialist(): boolean {
    return this.jsonHelper.parseJson<boolean>(window.sessionStorage.getItem(StorageKeysConfig.storageIsSpecialistKeyName));
  }

  removeIsSpecialist(): void {
    window.sessionStorage.removeItem(StorageKeysConfig.storageIsSpecialistKeyName);
  }

  saveIsClient(isClient: boolean): void {
    window.sessionStorage.setItem(StorageKeysConfig.storageIsClientKeyName, JSON.stringify(isClient));
  }

  getIsClient(): boolean {
    return this.jsonHelper.parseJson<boolean>(window.sessionStorage.getItem(StorageKeysConfig.storageIsClientKeyName));
  }

  removeIsClient(): void {
    window.sessionStorage.removeItem(StorageKeysConfig.storageIsClientKeyName);
  }

  saveClientDetails(clientDetails: PatientUserProfileResponseInterface): void {
    window.sessionStorage.setItem(StorageKeysConfig.storageClientDetailsKeyName, JSON.stringify(clientDetails));
  }

  getClientDetails(): PatientUserProfileResponseInterface {
    return this.jsonHelper.parseJson<PatientUserProfileResponseInterface>(window.sessionStorage.getItem(StorageKeysConfig.storageClientDetailsKeyName));
  }

  removeClientDetails(): void {
    window.sessionStorage.removeItem(StorageKeysConfig.storageClientDetailsKeyName);
  }

  saveSpecialistDetails(specialistDetails: SpecialistProfileResponseInterface): void {
    window.sessionStorage.setItem(StorageKeysConfig.storageSpecialistDetailsKeyName, JSON.stringify(specialistDetails));
  }

  getSpecialistDetails(): SpecialistProfileResponseInterface {
    return this.jsonHelper.parseJson<SpecialistProfileResponseInterface>(window.sessionStorage.getItem(StorageKeysConfig.storageSpecialistDetailsKeyName));
  }

  removeSpecialistDetails(): void {
    window.sessionStorage.removeItem(StorageKeysConfig.storageSpecialistDetailsKeyName);
  }

  isLoggedIn(): boolean {
    return !!(window.sessionStorage.getItem(StorageKeysConfig.storageUserKeyName) && window.sessionStorage.getItem(StorageKeysConfig.storageTokenKeyName));
  }

  logOut(): void {
    this.clear();
  }
}
