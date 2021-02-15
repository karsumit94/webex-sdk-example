import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import WebexSDK from 'webex';

@Component({
  selector: 'app-webex',
  templateUrl: './webex.component.html',
  styleUrls: ['./webex.component.sass']
})
export class WebexComponent implements OnInit {
  webex: any
  constructor() { }

  ngOnInit(): void {
    
    console.log("WebexComponent ngOnInit");
    this.webex = WebexSDK.init({
      config: {
        meetings: {
          deviceType: 'WEB'
        },
        credentials: {
          access_token: localStorage.getItem('webex_token')
        }
      }
    });
    console.log("canAuthorize: " + this.webex.canAuthorize);
    console.log("Webex SDK init complete");
    this.webex.once('ready', () => {
      console.log("Webex SDK ready");
      if (this.webex.credentials.supertoken) {
        console.log(this.webex.credentials.supertoken.access_token);
        localStorage.setItem('webex_token', this.webex.credentials.supertoken.access_token);
      }
      if(this.webex.canAuthorize){
        console.log("canAuthorize: "+ this.webex.canAuthorize);
      }
    });
  }
}
