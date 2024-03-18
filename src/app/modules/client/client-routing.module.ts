import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {ClientMainComponent} from "./client-main.component";
import {FavouriteSpecComponent} from "./favourite/favourite-spec.component";
import {EmptyUserLkComponent} from "./lk/empty/empty-user-lk.component";
import {CompletedUserLkComponent} from "./lk/completed/completed-user-lk.component";
import {UserMainPageComponent} from "./main/user-main-page.component";
import {MedcardComponent} from "./medcard/medcard.component";
import {authGuard} from "../../core/guards/auth.guard";
import {patientGuard} from "../../core/guards/patient.guard";

const routes: Routes = [
  {
    path: '',
    component: ClientMainComponent,
    children: [
      {
        path: 'favourites',
        component: FavouriteSpecComponent,
        canActivate: [authGuard, patientGuard]
      },
      {
        path:'profile/empty',
        component: EmptyUserLkComponent,
        canActivate: [authGuard, patientGuard]
      },
      {
        path: 'profile/completed',
        component: CompletedUserLkComponent,
        canActivate: [authGuard, patientGuard]
      },
      {
        path: 'main',
        component: UserMainPageComponent,
        canActivate: [authGuard, patientGuard]
      },
      {
        path: 'medcard',
        component: MedcardComponent,
        canActivate: [authGuard, patientGuard]
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule {}
