import { Component, OnInit } from '@angular/core';
import { TranslateService } from "@ngx-translate/core";
@Component({
  selector: 'app-mobile-not-supported',
  templateUrl: './mobile-not-supported.component.html',
  styleUrls: ['./mobile-not-supported.component.sass']
})
export class MobileNotSupportedComponent implements OnInit {

  constructor(private translate: TranslateService) { }

  ngOnInit(): void {
  }

}
