import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'common',
    loadChildren: () => import('./modules/common/common.module').then((m) => m.CommonModule),
  },
  {
    path: 'client',
    loadChildren: () => import('./modules/client/client.module').then((m) => m.ClientModule),
  },
  {
    path: 'specialist',
    loadChildren: () => import('./modules/specialist/specialist.module').then((m) => m.SpecialistModule),
  },
  {
    path: '',
    redirectTo: '/common/main',
    pathMatch: 'full',
  }
]


@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
