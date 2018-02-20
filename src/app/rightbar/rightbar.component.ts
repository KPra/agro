import { WindowRef } from './windowref';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { CompleterService, CompleterData } from 'ng2-completer';

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
      @Output() resourceEmitter = new EventEmitter<String>();

      protected dataService: CompleterData;
      protected searchStr: string;
      protected searchData = [
        { color: 'tractor', value: '#f00' },
        { color: 'tiller', value: '#0f0' },
        { color: 'mower', value: '#00f' },
        { color: 'sprayer', value: '#0ff' },
        { color: 'land', value: '#f0f' },
        { color: 'labour', value: '#ff0' },
        { color: 'shredder', value: '#000' }
      ];

      ngOnInit(){
      }

      constructor(private completerService: CompleterService){
        this.dataService = completerService.local(this.searchData, 'color', 'color');        
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

      searchInfo(){
          console.log(">>>>>>>>>>>>>>>>>>"+this.searchStr);
          this.resourceEmitter.emit(this.searchStr);
      }
  }