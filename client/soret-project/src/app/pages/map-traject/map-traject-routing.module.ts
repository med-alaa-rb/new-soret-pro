import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MapTrajectPage } from './map-traject.page';

const routes: Routes = [
  {
    path: '',
    component: MapTrajectPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MapTrajectPageRoutingModule {}
