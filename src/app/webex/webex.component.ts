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
  
  constructor(private webex: WebexService, public router: Router) { }
  ngOnInit(): void {
    this.webex.onInit();
    this.webex.onListRoom().then((rooms) => {
      console.log("Printing rooms")
      console.log(rooms.items);
      this.roomsList = rooms.items;
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
  addPeople(space){
    console.log("add people");
    console.log(space)
    var email = prompt("Please enter email of the person you want to add!", "sumkar@cisco.com");
    this.webex.addPeople(email,space.id)
  }

  sendMsg(space){
    console.log("Send msg");
    console.log(space)
    var msg = prompt("Enter a Message", "Hello!");
    this.webex.sendMsg(space.id,msg)

  }
}
