import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

import WebexSDK from 'webex';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  webex: any
  constructor(public router: Router) { }

  ngOnInit(): void {
    this.webex = WebexSDK.init({
      config: {
        meetings: {
          deviceType: 'WEB'
        },
        credentials: {
          client_id: environment.client_id,
          redirect_uri: environment.redirect_uri,
          scope: environment.scope
        }
      }
    });
    this.webex.once('ready', () => {
      console.log(this.webex.canAuthorize);
      if (this.webex.canAuthorize) {
        this.router.navigate(['/webex'], { skipLocationChange: true });
      }
    });
  }

  doLogin() {
    this.webex.authorization.initiateLogin();
  }

}
