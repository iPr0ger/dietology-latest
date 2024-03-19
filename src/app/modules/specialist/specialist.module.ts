import {NgModule} from "@angular/core";
import {SpecialistMainComponent} from "./specialist-main.component";
import {SpecialistRoutingModule} from "./specialist-routing.module";
import {LayoutModule} from "../../pages/layout.module";
import {DoctorLkComponent} from "./lk/doctor-lk.component";
import {NgIf} from "@angular/common";

@NgModule({
  declarations: [
    DoctorLkComponent,
    SpecialistMainComponent
  ],
  imports: [
    SpecialistRoutingModule,
    LayoutModule,
    NgIf
  ],
  exports: []
})
export class SpecialistModule {}
