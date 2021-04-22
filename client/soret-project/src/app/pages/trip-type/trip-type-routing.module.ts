import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TripTypePage } from './trip-type.page';

const routes: Routes = [
  {
    path: '',
    component: TripTypePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TripTypePageRoutingModule {}
