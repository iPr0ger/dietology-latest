import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component, Input,
  OnChanges,
  OnInit,
  SimpleChanges
} from "@angular/core";
import {AppointmentValue, DateTimeType} from "../../main-page.component";
import {NgClass, NgIf} from "@angular/common";


@Component({
  standalone: true,
  selector: 'date-time-component',
  templateUrl: './date-time.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgClass,
    NgIf
  ]
})
export class DateTimeComponent implements OnInit, OnChanges {

  @Input() appointmentValues!: AppointmentValue[];
  times: AppointmentValue[] = [];

  // попробовать отправку/подписку событий
  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    this.times = [];
    this.appointmentValues.forEach(data => {
      if (data.type === DateTimeType.TIME) {
        this.times.push(data)
      }
    })
  }

  ngOnInit() {
    this.times = [];
    this.appointmentValues.forEach(data => {
      if (data.type === DateTimeType.TIME) {
        this.times.push(data)
      }
    })
  }

  selectTime(appointment: AppointmentValue) {
    this.times = []
    this.appointmentValues.forEach(data => {
      if (data.type === DateTimeType.TIME) {
        data.isSelected = false;
        this.times.push(data)
      }
    })
    appointment.isSelected =! appointment.isSelected;
  }
}
