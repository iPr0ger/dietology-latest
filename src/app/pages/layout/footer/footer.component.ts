import {Component} from "@angular/core";
import {UserStorageService} from "../../../core/services/storage/user-storage.service";
import {StorageKeysConfig} from "../../../core/configs/storage-keys.config";

@Component({
  selector: 'footer-component',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  isSpecialist: boolean = false;

  constructor(
    private userStorageService: UserStorageService,
  ) {
    this.isSpecialist = this.userStorageService.getIsSpecialist();
  }
}
