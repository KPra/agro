import { ResourceLocations } from './resourceLocations';
import { ResourceLocation } from './resourceLocation';
import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Location} from "../sidebar/location";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Result} from "../sidebar/result";
import {AddressDetail} from "../sidebar/addressDetail";
import {Address} from "../sidebar/address";
import {HttpHeaders, HttpErrorResponse} from '@angular/common/http';
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
  @Input('phone') phone: number;
  showFarmer = true;
  showDealer = false;
  showShops = false;
  showTractors = false;
  showTillers = false;
  // @ViewChild('marker') marker: Marker;

  place: string;
  currentLocationOpen = true;
  // icon = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';
  icon = '../../assets/farmer.png';
  dealerIcon = '../../assets/dealer.jpg';
  shopIcon = '../../assets/shop.jpg';
  tractorIcon = '../../assets/tractor2.jpg';
  tillerIcon = '../../assets/tiller2.jpg'
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
    for(let location of this.locations){
      location.status = false;
   }
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
    this.showFarmer = true;
    this.showDealer = false;
    this.showShops = false;
    this.showTractors = false;
    this.showTillers = false;
    this.httpClient.get<ResourceLocations>("http://localhost:8090/OHRestServices/fetchAllFarmers")
    .subscribe(data => {
      console.log('data '+data);
      console.log('data '+data.locations);
      this.locations = data.locations;      
      console.log('locations is '+this.locations);

      for(let location of this.locations){
      location.favoriteButton = false;
      location.requestButton = false;
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

  fetchDealers(){
    this.showDealer = true;
    this.showFarmer = false;
    this.showShops = false;
    this.showTractors = false;
    this.showTillers = false;

    this.httpClient.get<ResourceLocations>("http://localhost:8090/OHRestServices/fetchAllDealers")
    .subscribe(data => {
      console.log('data '+data);
      console.log('data '+data.locations);
      this.locations = data.locations;      
      console.log('locations is '+this.locations);

      for(let location of this.locations){
      location.favoriteButton = false;
      location.requestButton = false;
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
    }
    });
  }

  fetchShops(){
    console.log('fetch shops called!');
    this.showDealer = false;
    this.showFarmer = false;
    this.showShops = true;
    this.showTractors = false;
    this.showTillers = false;
    this.httpClient.get<ResourceLocations>("http://localhost:8090/OHRestServices/fetchAllShops")
    .subscribe(data => {
      console.log('data '+data);
      console.log('data '+data.locations);
      this.locations = data.locations;      
      console.log('locations is '+this.locations);

      for(let location of this.locations){
      location.favoriteButton = false;
      location.requestButton = false;
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
    }
    });
  }

  fetchFarmersWithResource(resource: String){
    console.log('fetchFarmersWithResource'+resource);
    this.fetchAllFarmers();
    this.showFarmer = false;
    this.showDealer = false;
    this.showShops = false;
    if(resource == 'tractor'){
      this.showTractors = true;
    }
    if(resource == 'tiller'){
      this.showTillers = true;
    }
  }

  sendRequest(name: String, type: String) {
    console.log('send message to '+ this.phone+ name + type);
    let message: String;
    if(type == 'farmer'){
      message = 'Please find the mobile number of the requested FARMER : 9898989898';
    }else if (type == 'dealer'){
      message = 'Please find the mobile number of the requested DEALER : 9898989898';
    }else{
      message = 'Please find the mobile number of the requested SHOPKEEPER : 9898989898';
    }
    
    for(let location of this.locations){
      if(location.name == name){
        location.requestButton = true;
      }
    }
    // let myHeaders = new Headers({ 'Content-Type': 'application/json', 'Cache-Control': 'no-cache' }); 
    const headers = new HttpHeaders().set("Content-Type", "application/json");

    this.httpClient.post("http://localhost:8090/OHRestServices/sendMessage",
    {
      "email":"creativeku1@gmail.com",
      "password":"sms1234",
      "device":"78747",
      "number":"9986695955",
      "message":message
    })
    .subscribe(
      res => {
        console.log(res);
      },
      (err: HttpErrorResponse) => {
        console.log(err.error);
        console.log(err.name);
        console.log(err.message);
        console.log(err.status);
      }
    );
  }
}
