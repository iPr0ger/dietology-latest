import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {SpecialistMainComponent} from "./specialist-main.component";
import {CompletedDoctorLkComponent} from "./lk/completed/completed-doctor-lk.component";
import {authGuard} from "../../core/guards/auth.guard";
import {specialistGuard} from "../../core/guards/specialist.guard";

const routes: Routes = [
  {
    path: '',
    component: SpecialistMainComponent,
    children: [
      {
        path:'profile',
        component: CompletedDoctorLkComponent,
        canActivate: [authGuard, specialistGuard]
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SpecialistRoutingModule {}
