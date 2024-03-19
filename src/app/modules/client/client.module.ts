import {NgModule} from "@angular/core";
import {FavouriteSpecComponent} from "./favourite/favourite-spec.component";
import {MedcardComponent} from "./medcard/medcard.component";
import {ClientMainComponent} from "./client-main.component";
import {ClientRoutingModule} from "./client-routing.module";
import {LayoutModule} from "../../pages/layout.module";
import {NgIf} from "@angular/common";
import {UserLkComponent} from "./lk/user-lk.component";

@NgModule({
  declarations: [
    ClientMainComponent,
    FavouriteSpecComponent,
    UserLkComponent,
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
