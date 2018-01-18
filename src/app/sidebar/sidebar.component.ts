import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  @Output() locateEmitter = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  currentLocation() {
    this.locateEmitter.emit('refresh');
  }

}
