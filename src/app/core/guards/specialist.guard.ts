import {inject} from "@angular/core";
import {CanActivateFn, Router} from "@angular/router";
import {UserStorageService} from "../services/storage/user-storage.service";

export const specialistGuard: CanActivateFn = (route, state) => {
  const userStorageService = inject(UserStorageService);
  const router = inject(Router);
  if (!userStorageService.getIsSpecialist()){
    router.navigate(['/common/main']);
    return false;
  }
  return true;
};
