import {Component, Input, OnInit} from '@angular/core';
import {Location} from "../sidebar/location";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Result} from "../sidebar/result";
import {AddressDetail} from "../sidebar/addressDetail";
import {Address} from "../sidebar/address";

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.css']
})
export class GoogleMapComponent implements OnInit {
  @Input('lat') lat: number;
  @Input('lng') lng: number;
  @Input('mapData') mapData: any;
  place: string;

  triangleCoords = [
    {lat: 25.774, lng: -80.190},
    {lat: 18.466, lng: -66.118},
    {lat: 32.321, lng: -64.757},
    {lat: 25.774, lng: -80.190}
  ];

  constructor(private httpClient: HttpClient) {}

  ngOnInit() {
    this.getUserLocation();
    this.getStateCoordinates();
  }

  private getUserLocation() {
    // locate the user
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;

        let param = this.lat + ',' + this.lng;
        const url = 'https://maps.googleapis.com/maps/api/geocode/json' +
          '?latlng=' + param + '&key=' + environment.googleMapsKey;

        this.httpClient.get<Result>(url)
          .subscribe(data => {
            let details: AddressDetail[];
            details = data.results;
            let address: Address[];
            address = details[0].address_components;
            this.place = address[4].long_name.concat(' ' + address[5].long_name
              + ' ' + address[6].long_name + ' ' + address[7].long_name);
            console.log(this.place);
          });
      });
    }
    console.log('getUserLocation of google map ' + this.lat + '--' + this.lng);
  }

  private getStateCoordinates() {
    console.log('getStateCoordinates called!');
    console.log(this.mapData);
  }

  refresh(location: Location) {
    // console.log('refresh called!');
    // this.getUserLocation();
    this.lat = 0;
    this.lng = 0;
    setTimeout(() => {
      console.log('refresh called');
      // this.lat = 12.911759400000001;
      // this.lng = 77.6085251;
      // this.getUserLocation();
      this.lat = location.latitude;
      this.lng = location.longitude;
      this.place = location.address;
      console.log('place dude >>>>>>>>>>>>>>>>>>>>>>>> ' + this.place);
    }, 5);
  }

}
