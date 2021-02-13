import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { environment } from 'src/environments/environment';
import { TranslateService } from "@ngx-translate/core";
import { DeviceDetectorService } from 'ngx-device-detector';
import WebexSDK from 'webex';

export const DEFAULT_LANG = "en";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  title = 'webex-sdk-example';
  webex: any
  locale: string;
  constructor(
    public router: Router,
    private activatedRoute: ActivatedRoute,
    private deviceService: DeviceDetectorService,
    private translate: TranslateService,

  ) {
    this.translate.setDefaultLang(DEFAULT_LANG);
   }
  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.locale = params["locale"];
      if (
        this.locale !== undefined &&
        this.locale !== "undefined" &&
        this.isValidLanguage(this.locale)
      ) {
        this.translate.use(this.locale);
        sessionStorage.setItem("locale", this.locale);
      }
    });
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
        this.router.navigate(['/home'], { skipLocationChange: true });
      }
    });
  }
  isValidLanguage(locale: string) {
    const arr = ["en"];
    return arr.includes(locale);
  }
  isMobile() {
    return this.deviceService.isMobile();
  }
}
