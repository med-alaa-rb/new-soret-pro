import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HttpService } from '../../http.service';
import { TripTypePage } from '../trip-type/trip-type.page';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  arrPictures: any = [];
  pic: any;

  constructor(
    public modalController: ModalController,
    public _http: HttpService
  ) {}

  async ngOnInit() {
    this.arrPictures = this._http.picArr()['__zone_symbol__value'];
    this.pic = await this.welcomePic(this.arrPictures);
    this.makeText();
  }

  async getStarted() {
    const modal = await this.modalController.create({
      component: TripTypePage,
      cssClass: 'my-custom-class',
    });

    return await modal.present();
  }

  async welcomePic(arr) {
    var val = await Math.ceil(Math.random() * Math.random() * 13);
    return arr[val];
  }

  makeText() {
    document.getElementById('id1').innerHTML =
      '<strong>welcome to kairouan</strong>';
  }
}
