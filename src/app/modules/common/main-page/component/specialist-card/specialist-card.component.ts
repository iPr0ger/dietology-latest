import {AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges} from "@angular/core";
import {AppointmentValue, SpecialistMainPageDetailsInterface} from "../../main-page.component";
import {DateTimeComponent} from "../date-component/date-time.component";
import {SpecialistModalComponent} from "../../modals/specialist-modal.component";
import {NgClass} from "@angular/common";
import {ComponentService} from "../../../../../core/services/component.service";
import {AllDatesComponent} from "../../modals/all-dates/all-dates.component";


@Component({
  standalone: true,
  selector: 'specialist-card-component',
  templateUrl: './specialist-card.component.html',
  imports: [
    DateTimeComponent,
    SpecialistModalComponent,
    NgClass,
    AllDatesComponent
  ]
})
export class SpecialistCardComponent implements OnInit, AfterViewInit {

  @Input() specialist!: SpecialistMainPageDetailsInterface;
  times: AppointmentValue[] = [];

  constructor(
    private componentService: ComponentService
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
    let node = document.createElement('script');
    node.src = "./assets/js/review-scroll.js";//Change to your js file
    node.type = 'text/javascript';
    node.async = true;
    document.getElementsByTagName('body')[0].appendChild(node);

    let node1 = document.createElement('script');
    node1.src = "./assets/js/js-swap.js";//Change to your js file
    node1.type = 'text/javascript';
    node1.async = false;
    document.getElementsByTagName('body')[0].appendChild(node1);
  }
}
