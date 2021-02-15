import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WebexService } from '../webex.service';

@Component({
  selector: 'app-webex',
  templateUrl: './webex.component.html',
  styleUrls: ['./webex.component.sass']
})
export class WebexComponent implements OnInit {
  displayName: string;
  roomName: string;
  roomsList: any;
  roomsNameList: any;
  
  constructor(private webex: WebexService, public router: Router) { }
  ngOnInit(): void {
    this.roomsNameList = [];
    this.webex.onInit();
    this.webex.onListRoom().then((rooms) => {
      console.log("Printing rooms")
      console.log(rooms.items);
      this.roomsList = rooms.items;
      for (var i = 0; i < this.roomsList.length; i++) {
        this.roomsNameList.push(this.roomsList[i].title);
      }
      console.log(this.roomsNameList);
    });
    this.webex.fetchUserDetails().then((data) => {
      console.log(data);
      this.displayName = data.displayName;
    });
  }
  logout() {
    this.webex.onLogout();
  }

  createRoom() {
    if(this.roomName) {
      this.webex.onCreateRoom(this.roomName)
    }
  }
}
