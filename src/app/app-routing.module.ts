import { LoginLayoutComponent } from './pages/admin/layouts/login-layout/login-layout.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SiteLayoutComponent } from './pages/layouts/site-layout/site-layout.component';

const routes: Routes = [
  {
    path: '',
    component: SiteLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./pages/site/site.module').then((m) => m.SiteModule),
      },
    ],
  },

  {
    path: 'admin',
    component: LoginLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./pages/admin/admin.module').then((m) => m.AdminModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
