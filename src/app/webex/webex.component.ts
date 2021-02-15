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
  constructor(private webex: WebexService, public router: Router) { }
  ngOnInit(): void {
    this.webex.onInit();
    this.webex.onListRoom().then((rooms) => {
      console.log(rooms)
    });
    this.webex.fetchUserDetails().then((data) => {
      console.log(data);
      this.displayName = data.displayName;
    });
  }

}
