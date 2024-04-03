import {AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges} from "@angular/core";
import {AppointmentValue, SpecialistMainPageDetailsInterface} from "../../main-page.component";
import {DateTimeComponent} from "../date-component/date-time.component";
import {SpecialistModalComponent} from "../../modals/specialist-modal.component";
import {NgClass} from "@angular/common";
import {ComponentService} from "../../../../../core/services/component.service";
import {AllDatesComponent} from "../../modals/all-dates/all-dates.component";
import {LoadScriptHelperService} from "../../../../../core/helpers/load-script-helper.service";
import {ServiceModalComponent} from "../../modals/service/service-modal.component";


@Component({
  standalone: true,
  selector: 'specialist-card-component',
  templateUrl: './specialist-card.component.html',
  imports: [
    DateTimeComponent,
    SpecialistModalComponent,
    NgClass,
    AllDatesComponent,
    ServiceModalComponent
  ]
})
export class SpecialistCardComponent implements OnInit, AfterViewInit {

  @Input() specialist!: SpecialistMainPageDetailsInterface;
  times: AppointmentValue[] = [];

  constructor(
    private componentService: ComponentService,
    private loadScriptHelperService: LoadScriptHelperService
  ) {
  }

  ngOnInit(): void {
    if (this.specialist.appointment.length > 0 && this.specialist.appointment[0].times) {
      this.times = this.specialist.appointment[0].times!;
    }
  }

  selectDate(appointment: AppointmentValue) {
    this.specialist.appointment.forEach(data => {
      data.isSelected = false;
    });
    appointment.isSelected =!appointment.isSelected;
    this.times = appointment.times!;
  }

  ngAfterViewInit() {
    // this.loadScriptHelperService.loadJsScript("assets/js/main-js.js");
  }
}
