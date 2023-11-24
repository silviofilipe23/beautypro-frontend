import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SiteRoutingModule } from './site-routing.module';
import { HomeSiteComponent } from './home/home-site.component';

@NgModule({
  declarations: [HomeSiteComponent],
  imports: [CommonModule, SiteRoutingModule],
})
export class SiteModule {}
