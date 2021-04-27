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
  path: any = {};

  constructor(
    public _http: HttpService,
    public modalController: ModalController
  ) {}

  async ngOnInit() {
    await this._http.splitData(this._http.tripType).subscribe((res) => {
      console.log(res);
      this.data = res;
    });
  }

  from(el) {
    this.path['from'] = el.value;
  }

  to(el) {
    this.path['to'] = el.value;
  }

  async userTrip() {
    this.path.tripType = this._http.tripType
    console.log(this.path)
    this._http.searchTraject(this.path).subscribe(async (res) => {
      this._http.tripId = await res;
      console.log(this._http.tripId);
    });
    const modal = await this.modalController.create({
      component: MapTrajectPage,
      cssClass: 'my-custom-class',
    });

    return await modal.present();
  }
}
