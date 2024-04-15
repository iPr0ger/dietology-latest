import {NgModule} from "@angular/core";
import {FavouriteSpecComponent} from "./favourite/favourite-spec.component";
import {MedcardComponent} from "./medcard/medcard.component";
import {ClientMainComponent} from "./client-main.component";
import {ClientRoutingModule} from "./client-routing.module";
import {LayoutModule} from "../../pages/layout.module";
import {NgClass, NgIf} from "@angular/common";
import {UserLkComponent} from "./lk/user-lk.component";
import {NgApexchartsModule} from "ng-apexcharts";
import {DiaryCardModalComponent} from "./lk/modals/diary-card/diary-card.modal.component";
import {MealCardModalComponent} from "./lk/modals/meal-card/meal-card.modal.component";

@NgModule({
  declarations: [
    ClientMainComponent,
    FavouriteSpecComponent,
    UserLkComponent,
  ],
    imports: [
        ClientRoutingModule,
        LayoutModule,
        NgIf,
        NgClass,
        NgApexchartsModule,
        DiaryCardModalComponent,
        MealCardModalComponent
    ],
  exports: []
})
export class ClientModule {}
