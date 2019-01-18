import { Component } from '@angular/core';
import { App, IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { LogoutProvider } from "../../providers/logout/logout";

import { SigninPage } from "../signin/signin";

@IonicPage()
@Component({
    selector: 'page-o-settings',
    templateUrl: 'o-settings.html',
})
export class OSettingsPage {

    constructor(
        public navCtrl: NavController,
        public app: App,
        public navParams: NavParams,
        private logProv: LogoutProvider,
        private alCtrl: AlertController
    ) {
    }

    ionViewDidLoad() {

    }

    logout() {
        this.logProv.logout().subscribe(data => {
            if (data.success) {
                this.app.getRootNav().setRoot(SigninPage);
                this.navCtrl.popToRoot();
            }
            else {
                this.newAlert("Logout Error", "Something went wrong while logging you out. Please restart the app");
            }
        }, (err) => {
            this.newAlert("Connection Error", err.message);
        });
    }

    newAlert(title: string, text: string){
        let newAl = this.alCtrl.create({
            title: title,
            subTitle: text,
            buttons: ['Ok']
        });

        return newAl.present();
    }
}
