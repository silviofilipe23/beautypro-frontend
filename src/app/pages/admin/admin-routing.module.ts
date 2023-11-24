import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { LoginLayoutComponent } from './layouts/login-layout/login-layout.component';
import { DefaultLayoutComponent } from './layouts/default-layout/default-layout.component';
import { HomeComponent } from './home/home.component';
import { ServiceListComponent } from './service/service-list/service-list.component';
import { ServiceStartComponent } from './service/service-start/service-start.component';
import { ServiceCreateComponent } from './service/service-create/service-create.component';
import { ServiceListAllComponent } from './service/service-list-all/service-list-all.component';
import { ClientCreateComponent } from './client/client-create/client-create.component';
import { ClientListComponent } from './client/client-list/client-list.component';
import { ClientServicesListComponent } from './client/client-services-list/client-services-list.component';
import { ProductCreateComponent } from './product/product-create/product-create.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { ServicingCreateComponent } from './servicing/servicing-create/servicing-create.component';
import { ServicingListComponent } from './servicing/servicing-list/servicing-list.component';
import { SupplierListComponent } from './supplier/supplier-list/supplier-list.component';
import { SupplierCreateComponent } from './supplier/supplier-create/supplier-create.component';
import { UserCreateComponent } from './user/user-create/user-create.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';

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
    path: 'service-start',
    component: DefaultLayoutComponent,
    children: [
      {
        path: '',
        component: ServiceStartComponent,
      },
    ],
  },
  {
    path: 'service-create',
    component: DefaultLayoutComponent,
    children: [
      {
        path: '',
        component: ServiceCreateComponent,
      },
    ],
  },
  {
    path: 'service-edit',
    component: DefaultLayoutComponent,
    children: [
      {
        path: '',
        component: ServiceCreateComponent,
      },
    ],
  },
  {
    path: 'service-list-all',
    component: DefaultLayoutComponent,
    children: [
      {
        path: '',
        component: ServiceListAllComponent,
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
    path: 'client-service-list',
    component: DefaultLayoutComponent,
    children: [
      {
        path: '',
        component: ClientServicesListComponent,
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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
