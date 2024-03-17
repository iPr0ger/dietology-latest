import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {AppointmentValue} from "../../modules/common/main-page/main-page.component";

@Injectable({providedIn: 'root'})
export class ComponentService {

  private dateTimeSubject = new Subject<AppointmentValue[]>();

  constructor() {
  }

  sendDateTimeSubject(value: AppointmentValue[]) {
    this.dateTimeSubject.next(value);
  }

  getDateTimeSubject(): Observable<AppointmentValue[]> {
    return this.dateTimeSubject.asObservable();
  }
}
