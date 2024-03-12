import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {ClientMainComponent} from "./client-main.component";
import {FavouriteSpecComponent} from "./favourite/favourite-spec.component";
import {EmptyUserLkComponent} from "./lk/empty/empty-user-lk.component";
import {CompletedUserLkComponent} from "./lk/completed/completed-user-lk.component";
import {UserMainPageComponent} from "./main/user-main-page.component";
import {MedcardComponent} from "./medcard/medcard.component";

const routes: Routes = [
  {
    path: '',
    component: ClientMainComponent,
    children: [
      {
        path: 'favourites',
        component: FavouriteSpecComponent
      },
      {
        path:'profile/empty',
        component: EmptyUserLkComponent
      },
      {
        path: 'profile/completed',
        component: CompletedUserLkComponent
      },
      {
        path: 'main',
        component: UserMainPageComponent
      },
      {
        path: 'medcard',
        component: MedcardComponent
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule {}
