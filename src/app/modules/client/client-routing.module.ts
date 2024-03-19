import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {ClientMainComponent} from "./client-main.component";
import {FavouriteSpecComponent} from "./favourite/favourite-spec.component";
import {CompletedUserLkComponent} from "./lk/completed/completed-user-lk.component";
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
        path: 'profile',
        component: CompletedUserLkComponent,
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
