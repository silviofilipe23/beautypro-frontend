import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SiteRoutingModule } from './site-routing.module';
import { HomeSiteComponent } from './home/home-site.component';
import { HeaderComponent } from './components/header/header.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { FooterComponent } from './components/footer/footer.component';
import { MapsComponent } from './components/maps/maps.component';
import { LightgalleryModule } from 'lightgallery/angular';
import { GaleryComponent } from './components/galery/galery.component';
import { WhatsappComponent } from './components/whatsapp/whatsapp.component';
import { AboutComponent } from './components/about/about.component';
import { ScrollSpyDirective } from './directive/scroll-spy.directive';

@NgModule({
  declarations: [
    HomeSiteComponent,
    HeaderComponent,
    CarouselComponent,
    FooterComponent,
    MapsComponent,
    GaleryComponent,
    WhatsappComponent,
    AboutComponent,
    ScrollSpyDirective,
  ],
  imports: [CommonModule, SiteRoutingModule, LightgalleryModule],
})
export class SiteModule {}
