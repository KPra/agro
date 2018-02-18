import { ResourceLocations } from './resourceLocations';
import { ResourceLocation } from './resourceLocation';
import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Location} from "../sidebar/location";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Result} from "../sidebar/result";
import {AddressDetail} from "../sidebar/addressDetail";
import {Address} from "../sidebar/address";
import Marker = google.maps.Marker;
import {} from '@types/googlemaps';

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.css']
})
export class GoogleMapComponent implements OnInit {
  @Input('lat') lat: number;
  @Input('lng') lng: number;
  @Input('mapData') mapData: any;
  // @ViewChild('marker') marker: Marker;

  place: string;
  currentLocationOpen = true;
  icon = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';

  // locations = [
  //   {lat: 12.9715987, lng: 77.5945627, status: false},
  //   {lat: 12.5715987, lng: 77.1945627, status: false},
  //   {lat: 12.1715987, lng: 78.5945627, status: false}
  // ];

  locations: ResourceLocation[];

  constructor(private httpClient: HttpClient) {}

  ngOnInit() {
    this.getUserLocation();
    this.getStateCoordinates();
    this.fetchAllFarmers();
    // this.marker.setAnimation(google.maps.Animation.BOUNCE);
  }

  private getUserLocation() {
    // locate the user
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;        
        let param = this.lat + ',' + this.lng;
        console.log('>>>>>>>>>>>>'+this.lat+this.lng);
        const url = 'https://maps.googleapis.com/maps/api/geocode/json' +
          '?latlng=' + param + '&key=' + environment.googleMapsKey;
        console.log('url is ##'+url);
        this.httpClient.get<Result>(url)
          .subscribe(data => {
            let details: AddressDetail[];
            details = data.results;
            let address: Address[];
            address = details[0].address_components;
              let concatAdd = '';
              for(let add of address){
                if(add.long_name != undefined){                    
                  concatAdd += add.long_name + ' ';
                }
              }
              this.place = concatAdd;
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
      this.place = 'You are at ' + location.address;
      console.log('place dude >>>>>>>>>>>>>>>>>>>>>>>> ' + this.place);
    }, 5);
  }

  openThisLocation(index: number){
    console.log(index);
    for(let location of this.locations){
      location.status = false;
   }
   this.locations[index].status = true;
   this.currentLocationOpen = false;
  }

  fetchAllFarmers(){
    this.httpClient.get<ResourceLocations>("http://localhost:8090/OHRestServices/fetchAllFarmers")
    .subscribe(data => {
      console.log('data '+data);
      console.log('data '+data.locations);
      this.locations = data.locations;      
      console.log('locations is '+this.locations);

      for(let location of this.locations){
      let param = location.lat + ',' + location.lng;
      const url = 'https://maps.googleapis.com/maps/api/geocode/json' +
      '?latlng=' + param + '&key=' + environment.googleMapsKey;
    console.log('url is '+url);
    this.httpClient.get<Result>(url)
      .subscribe(data => {
        let details: AddressDetail[];
        details = data.results;
        let address: Address[];
        address = details[0].address_components;
        let concatAdd = '';
        for(let add of address){
          if(add.long_name != undefined){                    
            concatAdd += add.long_name + ' ';
          }
        }
        location.place = concatAdd;
      });
    
      if(location.info.search('tractor') != -1){
        location.tractor = true;        
      }
      if(location.info.search('tiller') != -1){
        location.tiller = true;
      }
      if(location.info.search('labor') != -1){
        location.labor = true;
      }
      if(location.info.search('shredder') != -1){
        location.shredder = true;
      }
      if(location.info.search('mower') != -1){
        location.mower = true;
      }
      if(location.info.search('trolley') != -1){
        location.trolley = true;
      }
      if(location.info.search('sprayer') != -1){
        location.sprayer = true;
      }
      if(location.info.search('land') != -1){
        location.land = true;
      }
    }
    });
  }
}
