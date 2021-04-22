import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserPathPage } from './user-path.page';

const routes: Routes = [
  {
    path: '',
    component: UserPathPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserPathPageRoutingModule {}
