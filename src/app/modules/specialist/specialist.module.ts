import {NgModule} from "@angular/core";
import {CompletedDoctorLkComponent} from "./lk/completed/completed-doctor-lk.component";
import {EmptyDoctorLkComponent} from "./lk/empty/empty-doctor-lk.component";
import {SpecialistMainComponent} from "./specialist-main.component";
import {SpecialistRoutingModule} from "./specialist-routing.module";
import {LayoutModule} from "../../pages/layout.module";

@NgModule({
  declarations: [
    CompletedDoctorLkComponent,
    EmptyDoctorLkComponent,
    SpecialistMainComponent
  ],
  imports: [
    SpecialistRoutingModule,
    LayoutModule
  ],
  exports: []
})
export class SpecialistModule {}
