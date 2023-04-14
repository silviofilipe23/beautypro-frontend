import { AuthInterceptor } from './interceptors/auth.interceptor';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BlockUIModule } from 'ng-block-ui';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import {
  MatNativeDateModule,
  MatRippleModule,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import {
  MatPaginatorIntl,
  MatPaginatorModule,
} from '@angular/material/paginator';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';

import { LoginLayoutComponent } from './pages/layouts/login-layout/login-layout.component';
import { LoginComponent } from './pages/login/login.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DefaultLayoutComponent } from './pages/layouts/default-layout/default-layout.component';
import { HomeComponent } from './pages/home/home.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { UsersComponent } from './pages/users/users.component';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { ClientListComponent } from './pages/client-list/client-list.component';
import { getBrPaginatorIntl } from './portuguese-paginator-intl';
import { ClientCreateComponent } from './pages/client-create/client-create.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { SupplierListComponent } from './pages/supplier-list/supplier-list.component';
import { SupplierCreateComponent } from './pages/supplier-create/supplier-create.component';
import { UserListComponent } from './pages/user-list/user-list.component';
import { UserCreateComponent } from './pages/user-create/user-create.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginLayoutComponent,
    LoginComponent,
    DefaultLayoutComponent,
    HomeComponent,
    ResetPasswordComponent,
    UsersComponent,
    ClientListComponent,
    ClientCreateComponent,
    ProductListComponent,
    SupplierListComponent,
    SupplierCreateComponent,
    UserListComponent,
    UserCreateComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
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
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    { provide: MatDialogRef, useValue: {} },
    { provide: MatPaginatorIntl, useValue: getBrPaginatorIntl() },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
