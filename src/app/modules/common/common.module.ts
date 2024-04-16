import {NgModule} from "@angular/core";
import {ChatComponent} from "./chat/chat.component";
import {CommonMainComponent} from "./common-main.component";
import {CheckConnectionComponent} from "./check-connection/check-connection.component";
import {MainPageComponent} from "./main-page/main-page.component";
import {SpecialistModalComponent} from "./main-page/modals/specialist-modal.component";
import {CallSettingsModalComponent} from "./online-meeting/modals/call-settings.modal.component";
import {OnlineMeetingComponent} from "./online-meeting/online-meeting.component";
import {LayoutModule} from "../../pages/layout.module";
import {CommonRoutingModule} from "./common-routing.module";
import {AsyncPipe, KeyValuePipe, NgClass, NgIf, NgStyle} from "@angular/common";
import {MatIcon} from "@angular/material/icon";
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import {DateTimeComponent} from "./main-page/component/date-component/date-time.component";
import {SpecialistCardComponent} from "./main-page/component/specialist-card/specialist-card.component";
import {AllDatesComponent} from "./main-page/modals/all-dates/all-dates.component";
import {QuestionaireModalComponent} from "./main-page/modals/questionaire/questionaire-modal.component";
import {ServiceModalComponent} from "./main-page/modals/service/service-modal.component";
import {ChatModalComponent} from "./main-page/modals/chat/chat-modal.component";

@NgModule({
  declarations: [
    CommonMainComponent,
    ChatComponent,
    CheckConnectionComponent,
    MainPageComponent,
    CallSettingsModalComponent,
    OnlineMeetingComponent
  ],
  imports: [
    CommonRoutingModule,
    LayoutModule,
    NgClass,
    MatIcon,
    NgIf,
    NgStyle,
    AsyncPipe,
    MatGridList,
    MatGridTile,
    KeyValuePipe,
    DateTimeComponent,
    SpecialistModalComponent,
    SpecialistCardComponent,
    AllDatesComponent,
    QuestionaireModalComponent,
    ServiceModalComponent,
    ChatModalComponent
  ],
  exports: [
    CallSettingsModalComponent
  ]
})
export class CommonModule {}
