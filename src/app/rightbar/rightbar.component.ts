import { WindowRef } from './windowref';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'app-rightbar',
    templateUrl: './rightbar.component.html',
    styleUrls: ['./rightbar.component.css']
  })
  export class RightbarComponent implements OnInit {
      isActivated = false;
      @Output() farmerEmitter = new EventEmitter<String>();
      @Output() dealerEmitter = new EventEmitter<String>();
      @Output() shopEmitter = new EventEmitter<String>();
      ngOnInit(){
      }

      constructor(){
      }

      showFarmersActivateSearch(){
        this.isActivated = true;
        this.farmerEmitter.emit('farmer');
      }

      showDealersActivateSearch(){
        this.isActivated = false;
        this.dealerEmitter.emit('dealer');
      }

      showVendorsActivateSearch(){
        this.isActivated = false;
        this.shopEmitter.emit('shop');
      }
  }