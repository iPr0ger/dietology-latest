import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {SpecialistMainComponent} from "./specialist-main.component";
import {EmptyDoctorLkComponent} from "./lk/empty/empty-doctor-lk.component";
import {CompletedDoctorLkComponent} from "./lk/completed/completed-doctor-lk.component";
import {DoctorMainPageComponent} from "./main/doctor-main-page.component";
import {authGuard} from "../../core/guards/auth.guard";
import {specialistGuard} from "../../core/guards/specialist.guard";

const routes: Routes = [
  {
    path: '',
    component: SpecialistMainComponent,
    children: [
      {
        path: 'profile/empty',
        component: EmptyDoctorLkComponent,
        canActivate: [authGuard, specialistGuard]
      },
      {
        path:'profile/completed',
        component: CompletedDoctorLkComponent,
        canActivate: [authGuard, specialistGuard]
      },
      {
        path: 'main',
        component: DoctorMainPageComponent,
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
