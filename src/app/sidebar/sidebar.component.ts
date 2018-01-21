import {Component, ElementRef, EventEmitter, NgZone, OnInit, Output, ViewChild} from '@angular/core';
import {MapsAPILoader} from "@agm/core";
import {FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {} from '@types/googlemaps';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {Address} from "./address";
import {Result} from "./result";
import {AddressDetail} from "./addressDetail";


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  @Output() locateEmitter = new EventEmitter<string>();
  public searchControl: FormControl;
  @ViewChild('search')
  public searchElementRef: ElementRef;
  public latitude: number;
  public longitude: number;
  public position: any;

  constructor( private mapsAPILoader: MapsAPILoader,
               private ngZone: NgZone, private httpClient: HttpClient) { }

  ngOnInit() {
    this.setCurrentPosition();
    this.searchControl = new FormControl();
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: []
      });

     autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          // get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
          console.log('place is >>>>>>>>>>>>>>>>'+place);
          // verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          // autocomplete.setTypes(['address']);

          let address = '';
          if (place.address_components) {
            address = [
              (place.address_components[0] && place.address_components[0].short_name || ''),
              (place.address_components[1] && place.address_components[1].short_name || ''),
              (place.address_components[2] && place.address_components[2].short_name || '')
            ].join(' ');
            console.log('>>>>>>>>>>>>>>>>>>' + address);
          }

          // set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
        });
      });
    });
  }

  currentLocation() {
    this.locateEmitter.emit('refresh');
    console.log('current location ' + this.latitude + this.longitude);

    const url = 'https://maps.googleapis.com/maps/api/geocode/json' +
      '?latlng=12.911765477,77.60845379999999&key=AIzaSyBZFgYHnY4o_MquZuqvperMvi1gssj-ZiU';

    this.httpClient.get<Result>(url)
      .subscribe(data => {
          console.log(data.status);
          console.log(data);

          let details: AddressDetail[];
          details = data.results;
        console.log('<<<<<<<<<<<<<<<<<<<<' + details);
        let address: Address[];
        address = details[7].address_components;
        console.log(address);
        console.log(address[0].long_name);
        console.log(address[1].long_name);
        console.log(address[2].long_name);
        console.log(address[3].long_name);
        }
      );
  }

  private setCurrentPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log('setCurrentPosition() called!' + position.coords.latitude + position.coords.longitude);
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.position = position;
        console.log('setCurrentPosition() called!' + this.latitude + this.longitude);
      });
    }
  }

}
