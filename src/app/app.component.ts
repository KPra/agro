import {Component, Output} from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';

@Component ({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  private apiUrl = 'http://polygons.openstreetmap.fr/get_geojson.py?id=2019939&params=0';
  data: any = {};
  toggled = 'collapse';
  @Output() latitude: number;
  @Output() longitude: number;

  constructor(private http: Http) {
    console.log('inside constructor!');
    this.getCoordinates();
    // this.getData();
    console.log(this.data);
  }

  getData() {
    return this.http.get(this.apiUrl).map((res: Response) => res.json());
  }

  getCoordinates() {
    this.getData().subscribe(data => {
      console.log(data);
      this.data = data;
    });
  }

  processToggle(toggledStatus : string) {
    console.log('app component toggled called ' + toggledStatus);
    this.toggled = toggledStatus;
  }

  isToggled() {
    return this.toggled === 'expand' ? true : false;
  }



  // public getUserLocation() {
  //   // locate the user
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(position => {
  //       this.latitude = position.coords.latitude;
  //       this.longitude = position.coords.longitude;
  //     });
  //   }
  //   console.log(navigator.geolocation);
  //   console.log('getUserLocation of app component called!' + this.latitude + '--' + this.longitude);
  // }

}
