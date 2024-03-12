import {AfterViewInit, Component, ElementRef, TemplateRef} from "@angular/core";
import {DatasetsService} from "../../../core/services/datasets.service";
import {AccountService} from "../../../core/services/account.service";
import {PropagationHelperService} from "../../../core/helpers/propagation-helper.service";
import {SpecialistModalComponent} from "./modals/specialist-modal.component";
import {SpecialistProfileResponseInterface} from "../../../core/interfaces/account/specialist-profile.interface";

@Component({
  selector: 'main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent {
  specialists: SpecialistProfileResponseInterface[] = [];


  constructor(
    private datasetsService: DatasetsService,
    private accountService: AccountService
  ) {
    this.accountService.getSpecialistProfiles().subscribe(data => {
      this.specialists = data;
      console.log(this.specialists);
    });
  }
}
