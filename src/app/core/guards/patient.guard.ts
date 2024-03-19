import {inject} from "@angular/core";
import {CanActivateFn, Router} from "@angular/router";
import {UserStorageService} from "../services/storage/user-storage.service";

export const patientGuard: CanActivateFn = (route, state) => {
  const userStorageService = inject(UserStorageService);
  const router = inject(Router);
  if (!userStorageService.getIsClient()){
    router.navigate(['']);
    return false;
  }
  return true;
};
