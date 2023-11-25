import { AuthInterceptor } from './interceptors/auth.interceptor';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BlockUIModule } from 'ng-block-ui';
import {
  MAT_DATE_LOCALE,
  MatDateFormats,
  DateAdapter,
  MAT_DATE_FORMATS,
} from '@angular/material/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { getBrPaginatorIntl } from './portuguese-paginator-intl';
import { SiteLayoutComponent } from './pages/layouts/site-layout/site-layout.component';
import { MatDialogRef } from '@angular/material/dialog';

export const MY_FORMATS: MatDateFormats = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@NgModule({
  declarations: [AppComponent, SiteLayoutComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BlockUIModule.forRoot(),
    BlockUIModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE],
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    { provide: MatDialogRef, useValue: {} },
    { provide: MatPaginatorIntl, useValue: getBrPaginatorIntl() },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
