import {NgModule} from "@angular/core";
import {FavouriteSpecComponent} from "./favourite/favourite-spec.component";
import {CompletedUserLkComponent} from "./lk/completed/completed-user-lk.component";
import {EmptyUserLkComponent} from "./lk/empty/empty-user-lk.component";
import {MedcardComponent} from "./medcard/medcard.component";
import {ClientMainComponent} from "./client-main.component";
import {ClientRoutingModule} from "./client-routing.module";
import {LayoutModule} from "../../pages/layout.module";
import {NgIf} from "@angular/common";

@NgModule({
  declarations: [
    ClientMainComponent,
    FavouriteSpecComponent,
    CompletedUserLkComponent,
    EmptyUserLkComponent,
    MedcardComponent
  ],
  imports: [
      ClientRoutingModule,
      LayoutModule,
      NgIf
  ],
  exports: []
})
export class ClientModule {}
