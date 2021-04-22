import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { DxButtonModule } from 'devextreme-angular';

import { UserPathPageRoutingModule } from './user-path-routing.module';

import { UserPathPage } from './user-path.page';

import { DxLookupModule } from 'devextreme-angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserPathPageRoutingModule,
    DxButtonModule,
    DxLookupModule,
  ],
  declarations: [UserPathPage],
})
export class UserPathPageModule {}
