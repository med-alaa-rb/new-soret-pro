import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TripTypePageRoutingModule } from './trip-type-routing.module';

import { TripTypePage } from './trip-type.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TripTypePageRoutingModule
  ],
  declarations: [TripTypePage]
})
export class TripTypePageModule {}
