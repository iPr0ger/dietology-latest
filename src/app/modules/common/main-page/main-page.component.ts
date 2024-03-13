import {AfterViewInit, Component, ElementRef, TemplateRef} from "@angular/core";
import {DatasetsService} from "../../../core/services/datasets.service";
import {AccountService} from "../../../core/services/account.service";
import {SpecialistProfileResponseInterface} from "../../../core/interfaces/account/specialist-profile.interface";
import {ScheduleService} from "../../../core/services/schedule.service";

export enum DateTimeType {
  DATE = "date",
  TIME = "time"
}

export interface AppointmentValue {
  isSelected: boolean;
  type: DateTimeType;
  value: string;
  times: AppointmentValue[] | null;
}

export interface SpecialistMainPageDetailsInterface {
  specialistProfile: SpecialistProfileResponseInterface;
  appointment: AppointmentValue[];
  selectedAppointmentIndex: number;
}

@Component({
  selector: 'main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent {
  specialists: SpecialistMainPageDetailsInterface[] = [];

  constructor(
    private accountService: AccountService,
    private scheduleService: ScheduleService,
  ) {
    this.specialists = [];
    this.accountService.getSpecialistProfiles().subscribe(data => {
      data.forEach(specialist => {
          this.scheduleService.getDoctorRecentDates(specialist.doctor?.id!).subscribe(data => {
          let appointments: AppointmentValue[] = [];
          for (const [key, value] of Object.entries(data)) {
            appointments.push({
              isSelected: key === Object.keys(data)[0],
              type: DateTimeType.DATE,
              value: key,
              times: value.map((time, index) => ({
                isSelected: index == 0,
                type: DateTimeType.TIME,
                value: time,
                times: []
              }))
            });
          }
          this.specialists.push({
            specialistProfile: specialist,
            appointment: appointments,
            selectedAppointmentIndex: 0
          })
        })
      })
    });
  }


}
