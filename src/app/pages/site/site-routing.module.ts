import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeSiteComponent } from './home/home-site.component';

const routes: Routes = [
  {
    path: '',
    component: HomeSiteComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SiteRoutingModule {}
