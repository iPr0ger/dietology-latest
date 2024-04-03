import {NgModule} from "@angular/core";
import {SpecialistMainComponent} from "./specialist-main.component";
import {SpecialistRoutingModule} from "./specialist-routing.module";
import {LayoutModule} from "../../pages/layout.module";
import {DoctorLkComponent} from "./lk/doctor-lk.component";
import {NgClass, NgIf} from "@angular/common";
import {CallWithPatientModalComponent} from "./lk/modals/call-with-patient/call-with-patient-modal.component";

@NgModule({
  declarations: [
    DoctorLkComponent,
    SpecialistMainComponent
  ],
  imports: [
    SpecialistRoutingModule,
    LayoutModule,
    NgIf,
    CallWithPatientModalComponent,
    NgClass
  ],
  exports: []
})
export class SpecialistModule {}
