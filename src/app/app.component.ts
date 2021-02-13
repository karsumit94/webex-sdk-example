import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { DeviceDetectorService } from 'ngx-device-detector';


export const DEFAULT_LANG = "en";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  title = 'Webex SDK Example';
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
  }
  isValidLanguage(locale: string) {
    const arr = ["en"];
    return arr.includes(locale);
  }
  isMobile() {
    return this.deviceService.isMobile();
  }
}
