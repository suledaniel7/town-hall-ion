import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from "@ionic/storage";

import { HomePage } from "../pages/home/home";
import { OverviewPage } from "../pages/overview/overview";

import { TransmitErrorProvider } from '../providers/transmit-error/transmit-error';

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    rootPage: any;

    constructor(
        platform: Platform,
        statusBar: StatusBar,
        splashScreen: SplashScreen,
        private storage: Storage,
        private transmit: TransmitErrorProvider
    ) {
        this.storage.get('orientation_complete').then((found) => {
            found = JSON.parse(found);
            if (!found) {
                this.rootPage = OverviewPage;
            }
            else {
                this.rootPage = HomePage;
            }
        }).catch(err => {
            err.c_message = "App.component.ts, storage for orientation_complete";
            this.transmit.transmit(err).subscribe(()=>{});
        });
        platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.backgroundColorByHexString('1e87f0');
            splashScreen.hide();
        });
    }
}