import { SupplierCreateComponent } from './pages/supplier-create/supplier-create.component';
import { SupplierListComponent } from './pages/supplier-list/supplier-list.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { ClientCreateComponent } from './pages/client-create/client-create.component';
import { ClientListComponent } from './pages/client-list/client-list.component';
import { UsersComponent } from './pages/users/users.component';
import { HomeComponent } from './pages/home/home.component';
import { DefaultLayoutComponent } from './pages/layouts/default-layout/default-layout.component';
import { LoginComponent } from './pages/login/login.component';
import { LoginLayoutComponent } from './pages/layouts/login-layout/login-layout.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { UserListComponent } from './pages/user-list/user-list.component';
import { UserCreateComponent } from './pages/user-create/user-create.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginLayoutComponent,
    children: [
      {
        path: '',
        component: LoginComponent,
      },
    ],
  },

  {
    path: 'reset-password?token=:token?',
    component: LoginLayoutComponent,
    children: [
      {
        path: '',
        component: ResetPasswordComponent,
      },
    ],
  },
  {
    path: 'home',
    component: DefaultLayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
    ],
  },
  {
    path: 'user-create',
    component: DefaultLayoutComponent,
    children: [
      {
        path: '',
        component: UserCreateComponent,
      },
    ],
  },
  {
    path: 'user-list',
    component: DefaultLayoutComponent,
    children: [
      {
        path: '',
        component: UserListComponent,
      },
    ],
  },
  {
    path: 'client-list',
    component: DefaultLayoutComponent,
    children: [
      {
        path: '',
        component: ClientListComponent,
      },
    ],
  },
  {
    path: 'client-edit',
    component: DefaultLayoutComponent,
    children: [
      {
        path: '',
        component: ClientCreateComponent,
      },
    ],
  },
  {
    path: 'client-create',
    component: DefaultLayoutComponent,
    children: [
      {
        path: '',
        component: ClientCreateComponent,
      },
    ],
  },
  //Products
  {
    path: 'product-list',
    component: DefaultLayoutComponent,
    children: [
      {
        path: '',
        component: ProductListComponent,
      },
    ],
  },

  //Products
  {
    path: 'supplier-list',
    component: DefaultLayoutComponent,
    children: [
      {
        path: '',
        component: SupplierListComponent,
      },
    ],
  },
  {
    path: 'supplier-create',
    component: DefaultLayoutComponent,
    children: [
      {
        path: '',
        component: SupplierCreateComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
