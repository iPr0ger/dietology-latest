import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {SpecialistMainComponent} from "./specialist-main.component";
import {EmptyDoctorLkComponent} from "./lk/empty/empty-doctor-lk.component";
import {CompletedDoctorLkComponent} from "./lk/completed/completed-doctor-lk.component";
import {DoctorMainPageComponent} from "./main/doctor-main-page.component";

const routes: Routes = [
  {
    path: '',
    component: SpecialistMainComponent,
    children: [
      {
        path: 'profile/empty',
        component: EmptyDoctorLkComponent
      },
      {
        path:'profile/completed',
        component: CompletedDoctorLkComponent
      },
      {
        path: 'main',
        component: DoctorMainPageComponent
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SpecialistRoutingModule {}
