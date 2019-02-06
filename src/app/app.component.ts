import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
// import { HeaderColor } from "@ionic-native/header-color";

import { HomePage } from "../pages/home/home";

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    rootPage = HomePage;

    constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen/* , header: HeaderColor */) {
        platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.backgroundColorByHexString('1e87f0');
            // header.tint('1e87f0');
            splashScreen.hide();
        });
    }
}