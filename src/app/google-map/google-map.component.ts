import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.css']
})
export class GoogleMapComponent implements OnInit {
  @Input('lat') lat: number;
  @Input('lng') lng: number;
  @Input('mapData') mapData: any;

  triangleCoords = [
    {lat: 25.774, lng: -80.190},
    {lat: 18.466, lng: -66.118},
    {lat: 32.321, lng: -64.757},
    {lat: 25.774, lng: -80.190}
  ];

  constructor() {}

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
      });
    }
    console.log('getUserLocation of google map ' + this.lat + '--' + this.lng);
  }

  private getStateCoordinates() {
    console.log('getStateCoordinates called!');
    console.log(this.mapData);
  }

  refresh() {
    // console.log('refresh called!');
    // this.getUserLocation();
    this.lat = 0;
    this.lng = 0;
    setTimeout(() => {
      console.log('refresh called');
      this.lat = 12.911759400000001;
      this.lng = 77.6085251;
    }, 5);
  }

}
