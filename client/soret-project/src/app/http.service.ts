import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  path: any = {};

  constructor(private http: HttpClient) {}
  ROOT_URL = 'http://192.168.43.52:2700';

  splitData(num) {
    return this.http.get(this.ROOT_URL + `/data/api/2020/routes/${num}`);
  }

  searchTraject(obj) {
    return this.http.post(this.ROOT_URL + `/data/api/2020/UserTraject`, obj);
  }

  async picArr() {
    var result = [];
    for (var i = 0; i <= 13; i++) {
      var data = `../assets/welcomeIcon/${i}.png`;
      result.push(data);
    }
    return result;
  }
}
