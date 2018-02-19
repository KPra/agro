import { User } from './user';
import {Component, Output} from '@angular/core';
import {Http, Response} from '@angular/http';
import {ActivatedRoute} from '@angular/router'
import 'rxjs/add/operator/map';

@Component ({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  userLogged: User;
  username: String;
  private sub: any;
  title = 'app';
  private apiUrl = 'http://polygons.openstreetmap.fr/get_geojson.py?id=2019939&params=0';
  data: any = {};
  toggled = 'collapse';
  @Output() latitude: number;
  @Output() longitude: number;
  phone: Number;

  constructor(private http: Http, private route: ActivatedRoute, 
private user: User) {
    console.log('inside constructor!');
    this.getCoordinates();
    this.userLogged = user;
    console.log('the logged in user is '+ JSON.stringify(this.user.storage));
    this.username = this.user.storage.username;
    console.log('username'+this.username);
    this.phone = this.user.storage.phone;
    // this.getData();
    console.log(this.data);
  }

  ngOnInit(){
    //   this.sub = this.route.queryParams.subscribe(params => {
    //     this.user = params['user'];
    //     console.log('the logged in user is '+this.user.phoneno+this.user.username);
    //   });
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
