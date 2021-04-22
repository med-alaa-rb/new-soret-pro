import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MapTrajectPageRoutingModule } from './map-traject-routing.module';

import { MapTrajectPage } from './map-traject.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MapTrajectPageRoutingModule
  ],
  declarations: [MapTrajectPage]
})
export class MapTrajectPageModule {}
