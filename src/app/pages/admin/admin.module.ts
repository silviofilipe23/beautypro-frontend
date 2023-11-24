import { NgApexchartsModule } from 'ng-apexcharts';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { LoginComponent } from './auth/login/login.component';
import { DefaultLayoutComponent } from './layouts/default-layout/default-layout.component';
import { LoginLayoutComponent } from './layouts/login-layout/login-layout.component';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { BlockUIModule } from 'ng-block-ui';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
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
import { SupplierCreateComponent } from './supplier/supplier-create/supplier-create.component';
import { SupplierListComponent } from './supplier/supplier-list/supplier-list.component';
import { UserCreateComponent } from './user/user-create/user-create.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { UsersComponent } from './user/users/users.component';
import { AddProductDialogComponent } from 'src/app/components/add-product-dialog/add-product-dialog.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';

@NgModule({
  declarations: [
    LoginComponent,
    DefaultLayoutComponent,
    LoginLayoutComponent,
    HomeComponent,
    ServiceListComponent,
    ServiceStartComponent,
    ServiceCreateComponent,
    ServiceListAllComponent,
    ClientCreateComponent,
    ClientListComponent,
    ClientServicesListComponent,
    ProductCreateComponent,
    ProductListComponent,
    ServicingCreateComponent,
    ServicingListComponent,
    SupplierCreateComponent,
    SupplierListComponent,
    UserCreateComponent,
    UserListComponent,
    UsersComponent,
    AddProductDialogComponent,
    ResetPasswordComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    BlockUIModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSnackBarModule,
    BlockUIModule.forRoot(),
    MatSidenavModule,
    MatToolbarModule,
    MatMenuModule,
    MatExpansionModule,
    MatDividerModule,
    MatListModule,
    MatRippleModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMomentDateModule,
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule,
    MatSlideToggleModule,
    MatTooltipModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatCardModule,
    SharedModule,
    MatCheckboxModule,
    NgApexchartsModule,
  ],
})
export class AdminModule {}
