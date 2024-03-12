import {RouterModule, Routes} from "@angular/router";
import {AuthMainComponent} from "./auth-main.component";
import {AuthComponent} from "./auth/auth.component";
import {ForgotPasswordComponent} from "./forgot-password/forgot-password.component";
import {RegistrationComponent} from "./registration/registration.component";
import {NgModule} from "@angular/core";

const routes: Routes = [
  {
    path: '',
    component: AuthMainComponent,
    children: [
      {
        path: 'login',
        component: AuthComponent
      },
      {
        path:'register',
        component: RegistrationComponent
      },
      {
        path: 'forgot-password',
        component: ForgotPasswordComponent
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
