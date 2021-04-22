import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../http.service';
import { ModalController } from '@ionic/angular';
import { MapTrajectPage } from '../map-traject/map-traject.page';

@Component({
  selector: 'app-user-path',
  templateUrl: './user-path.page.html',
  styleUrls: ['./user-path.page.scss'],
})
export class UserPathPage implements OnInit {
  data: any = [];

  constructor(
    public _http: HttpService,
    public modalController: ModalController
  ) {}

  async ngOnInit() {
    await this._http.splitData(this._http.path.tripType).subscribe((res) => {
      console.log(res);
      this.data = res;
    });
  }

  from(el) {
    this._http.path['from'] = el.value;
  }

  to(el) {
    this._http.path['to'] = el.value;
  }

  async userTrip() {
    console.log(this._http.path);
    const modal = await this.modalController.create({
      component: MapTrajectPage,
      cssClass: 'my-custom-class',
    });

    return await modal.present();
  }
}
