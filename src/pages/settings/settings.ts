import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, App } from 'ionic-angular';

import { LogoutProvider } from "../../providers/logout/logout";

import { JSettingsPage } from "../j-settings/j-settings";
import { OSettingsPage } from '../o-settings/o-settings';
import { LSettingsPage } from '../l-settings/l-settings';
import { USettingsPage } from '../u-settings/u-settings';
import { SigninPage } from '../signin/signin';

@IonicPage()
@Component({
    selector: 'page-settings',
    templateUrl: 'settings.html',
})
export class SettingsPage {
    u_type: string;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public app: App,
        private logProv: LogoutProvider,
        private alCtrl: AlertController
    ) {
        this.u_type = this.navParams.get('u_type');
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad SettingsPage');
    }

    settings() {
        if (this.u_type === 'j') {
            this.navCtrl.push(JSettingsPage);
        }
        else if (this.u_type === 'o') {
            this.navCtrl.push(OSettingsPage);
        }
        else if (this.u_type === 'l') {
            this.navCtrl.push(LSettingsPage);
        }
        else if (this.u_type === 'u') {
            this.navCtrl.push(USettingsPage);
        }
    }

    logout() {
        this.logProv.logout().subscribe(data => {
            if (data.success) {
                this.app.getRootNav().setRoot(SigninPage);
                this.navCtrl.popToRoot();
            }
            else {
                this.newAlert("Internal Error", "Something went wrong while logging you out. Please restart the app");
            }
        }, (err) => {
            this.newAlert("Connection Error", err.message);
        });
    }

    newAlert(title: string, text: string) {
        let newAl = this.alCtrl.create({
            title: title,
            subTitle: text,
            buttons: ['Ok']
        });

        return newAl.present();
    }

}
