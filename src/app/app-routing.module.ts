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
import { ProductCreateComponent } from './pages/product-create/product-create.component';
import { ServiceListComponent } from './pages/service-list/service-list.component';
import { ServicingListComponent } from './pages/servicing-list/servicing-list.component';
import { ServicingCreateComponent } from './pages/servicing-create/servicing-create.component';

const routes: Routes = [
  {
    path: '',
    component: LoginLayoutComponent,
    children: [
      {
        path: '',
        component: LoginComponent,
      },
    ],
  },
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
    path: 'user-edit',
    component: DefaultLayoutComponent,
    children: [
      {
        path: '',
        component: UserCreateComponent,
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
  {
    path: 'product-create',
    component: DefaultLayoutComponent,
    children: [
      {
        path: '',
        component: ProductCreateComponent,
      },
    ],
  },
  {
    path: 'product-edit',
    component: DefaultLayoutComponent,
    children: [
      {
        path: '',
        component: ProductCreateComponent,
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
    path: 'supplier-edit',
    component: DefaultLayoutComponent,
    children: [
      {
        path: '',
        component: SupplierCreateComponent,
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
  {
    path: 'service-list',
    component: DefaultLayoutComponent,
    children: [
      {
        path: '',
        component: ServiceListComponent,
      },
    ],
  },
  {
    path: 'servicing-list',
    component: DefaultLayoutComponent,
    children: [
      {
        path: '',
        component: ServicingListComponent,
      },
    ],
  },
  {
    path: 'servicing-create',
    component: DefaultLayoutComponent,
    children: [
      {
        path: '',
        component: ServicingCreateComponent,
      },
    ],
  },
  {
    path: 'servicing-edit',
    component: DefaultLayoutComponent,
    children: [
      {
        path: '',
        component: ServicingCreateComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
