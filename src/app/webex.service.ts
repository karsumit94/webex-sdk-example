import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import WebexSDK from 'webex';

@Injectable({
  providedIn: 'root'
})
export class WebexService {
  webex: any
  constructor() { }
}
