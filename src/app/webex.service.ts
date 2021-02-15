import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import WebexSDK from 'webex';

@Injectable({
  providedIn: 'root'
})
export class WebexService {
  webex: any;
  currentRoom: any;
  token: string;
  registered: boolean;
  syncStatus: string;
  currentMeeting: any;
  destination: string;

  constructor( public router: Router) { }
  onBeforeLogin() {
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
    this.listenForWebex();
  }

  onInit() {
    this.webex = WebexSDK.init({
      config: {
        meetings: {
          deviceType: 'WEB'
        }
      },
      credentials: {
        access_token: localStorage.getItem('webex_token')
      }
    });
    this.listenForWebex();
  }

  async onCreateRoom(name: string) {
    try {
      this.currentRoom = await this.webex.rooms.create({ title: name });
      alert('Your room has been created');
    } catch (error) {
      console.log(error);
    }
  }

  async onListRoom() {
    return this.webex.rooms.list();
  }

  async listenForWebex() {
    this.webex.once(`ready`, () => {
      console.log('READY', this.webex.credentials.supertoken);
      if (this.webex.credentials.supertoken) {
        localStorage.setItem('webex_token', this.webex.credentials.supertoken.access_token);
      }
    });
  }

  onLogin() {
    this.webex.authorization.initiateLogin();
  }


  onLogout() {
    if (this.webex) {
      if (this.webex.canAuthorize) {
        console.log('Already Logged in');
        this.webex.logout();
      }
      else {
        this.webex.logout();
        console.log('Cannot logout when no user is authenticated');
      }
      localStorage.removeItem('webex_token');
    }
  }

  async fetchUserDetails() {
    return this.webex.people.get('me');
  }

  async onRegister() {
    try {
      await this.webex.meetings.register();
      this.registered = true;
    } catch (error) {
      console.log(error);
    }
  }
  async onUnregister() {
    try {
      await this.webex.meetings.unregister();
      this.registered = false;
    } catch (error) {
      console.error(error);
    }
  }
  async onSyncMeetings() {
    try {
      this.syncStatus = 'SYNCING';
      await this.webex.meetings.syncMeetings();
      this.syncStatus = 'SYNCED';
    } catch (error) {
      this.syncStatus = 'ERROR';
      console.error(error);
    }
  }
  async onCreateMeeting(destination) {
    try {
      this.currentMeeting = await this.webex.meetings.create(destination);
    } catch (error) {
      console.error(error);
    }
  }
  printMeeting() {
    if(this.currentMeeting) {
      return this.currentMeeting.id;
    }
    return 'No Meeting';
  }
}
