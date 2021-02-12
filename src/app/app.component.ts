import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { environment } from 'src/environments/environment';
import WebexSDK from 'webex';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  title = 'webex-sdk-example';
  webex: any
  constructor(
    public router: Router
  ) { }
  ngOnInit(): void {
    console.log("Init method");
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
      if (!this.webex.canAuthorize) {
        this.router.navigate(['/home']);
      }
    });
  }
}
