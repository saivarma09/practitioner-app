import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton } from '@ionic/angular/standalone';

declare let cordova: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonButton, CommonModule, FormsModule]
})
export class LoginPage implements OnInit {

  ngOnInit() {
  }

  openExternalLogin() {
    const url = 'https://auth.dev.healthcode.co.uk/login';
    const target = '_blank';
    const options = 'location=yes,clearcache=yes,clearsessioncache=yes,toolbar=yes';

    const browser = cordova.InAppBrowser.open(url, target, options);

    browser.addEventListener('loadstop', (event: any) => {
      if (event.url && event.url.includes('callback')) {
        // Handle token/callback here
        browser.close();
      }
    });
  }
}
