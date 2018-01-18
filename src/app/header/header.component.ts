import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() toggle = new EventEmitter<String>();
  toggleStatus = false;
  constructor() { }

  ngOnInit() {
  }

  toggleSidebar() {
    console.log('>>>>>>>>>>header component >>>>>>>> sidebar toggle called!');
    this.toggle.emit(this.toggleStatus ? 'collapse' : 'expand');
    this.toggleStatus = this.toggleStatus ? false : true;
  }
}
