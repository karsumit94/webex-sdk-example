import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WebexService } from '../webex.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  constructor(private webex: WebexService, public router: Router) { }

  ngOnInit(): void {
    this.webex.onBeforeLogin();
  }

  doLogin() {
    this.webex.onLogin();
  }

}
