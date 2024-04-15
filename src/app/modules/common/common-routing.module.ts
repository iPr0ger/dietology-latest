import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {CommonMainComponent} from "./common-main.component";
import {MainPageComponent} from "./main-page/main-page.component";
import {ChatComponent} from "./chat/chat.component";
import {CheckConnectionComponent} from "./check-connection/check-connection.component";
import {OnlineMeetingComponent} from "./online-meeting/online-meeting.component";
import {authGuard} from "../../core/guards/auth.guard";
import {DoctorLkComponent} from "../specialist/lk/doctor-lk.component";
import {MedcardComponent} from "../client/medcard/medcard.component";
import {specialistGuard} from "../../core/guards/specialist.guard";

const routes: Routes = [
  {
    path: '',
    component: CommonMainComponent,
    children: [
      {
        path: '',
        component: MainPageComponent
      },
      {
        path:'chat',
        component: ChatComponent,
        canActivate: [authGuard]
      },
      {
        path: 'check-connection',
        component: CheckConnectionComponent,
        canActivate: [authGuard]
      },
      {
        path: 'call',
        component: OnlineMeetingComponent,
        canActivate: [authGuard]
      },
      {
        path: 'spec-profile',
        component: DoctorLkComponent,
        canActivate: [authGuard]
      },
      {
        path:'patient-card',
        component: MedcardComponent,
        canActivate: [authGuard, specialistGuard]
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommonRoutingModule {}
