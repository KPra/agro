import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-rightbar',
    templateUrl: './rightbar.component.html',
    styleUrls: ['./rightbar.component.css']
  })
  export class RightbarComponent implements OnInit {
      isActivated = false;
      ngOnInit(){
      }

      constructor(){
      }

      showFarmersActivateSearch(){
        this.isActivated = true;
      }

      showDealersActivateSearch(){
        this.isActivated = false;
      }

      showVendorsActivateSearch(){
        this.isActivated = false;
      }
  }