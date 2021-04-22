import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../http.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-map-traject',
  templateUrl: './map-traject.page.html',
  styleUrls: ['./map-traject.page.scss'],
})
export class MapTrajectPage implements OnInit {
  constructor(
    public _http: HttpService,
    public modalController: ModalController
  ) {}

  ngOnInit() {
    this._http.searchTraject(this._http.path).subscribe(async (res) => {
      console.log(res);
    });
  }
}
