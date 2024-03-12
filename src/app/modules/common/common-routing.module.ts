import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {CommonMainComponent} from "./common-main.component";
import {MainPageComponent} from "./main-page/main-page.component";
import {ChatComponent} from "./chat/chat.component";
import {CheckConnectionComponent} from "./check-connection/check-connection.component";
import {OnlineMeetingComponent} from "./online-meeting/online-meeting.component";

const routes: Routes = [
  {
    path: '',
    component: CommonMainComponent,
    children: [
      {
        path: 'main',
        component: MainPageComponent
      },
      {
        path:'chat',
        component: ChatComponent
      },
      {
        path: 'check-connection',
        component: CheckConnectionComponent
      },
      {
        path: 'call',
        component: OnlineMeetingComponent
      },
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommonRoutingModule {}
