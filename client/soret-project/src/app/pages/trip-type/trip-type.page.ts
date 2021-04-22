import { Component } from '@angular/core';
import { HttpService } from '../../http.service';
import { ModalController } from '@ionic/angular';
import { UserPathPage } from '../user-path/user-path.page';

@Component({
  selector: 'app-trip-type',
  templateUrl: './trip-type.page.html',
  styleUrls: ['./trip-type.page.scss'],
})
export class TripTypePage {
  constructor(
    public _http: HttpService,
    public modalController: ModalController
  ) {}

  async segmentChanged(ev: any) {
    this._http.path.tripType = JSON.parse(ev.detail.value);
     this.modalController.dismiss();
    const modal = await this.modalController.create({
      component: UserPathPage,
      cssClass: 'my-custom-class',
    });
    console.log('tripType');
    return await modal.present();
  }
}
