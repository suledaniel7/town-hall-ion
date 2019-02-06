import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { ProfileProvider } from "../../providers/profile/profile";
import { AddressProvider } from '../../providers/address/address';

import { OCommsPage } from "../o-comms/o-comms";
import { SettingsPage } from '../settings/settings';
import { FollowersPage } from '../followers/followers';

@IonicPage()
@Component({
    selector: 'page-o-profile',
    templateUrl: 'o-profile.html',
})
export class OProfilePage {
    item: any;
    user: any;
    messages: any;
    errOcc = false;
    imgAddress: string;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private profProv: ProfileProvider,
        public address: AddressProvider,
        private alCtrl: AlertController
    ) {
        this.imgAddress = this.address.getImageApi();
        this.profProv.o_profile_p().subscribe(data => {
            if (data.success) {
                this.item = data.item;
                this.user = data.item.user;
                this.messages = data.item.messages;
                this.errOcc = false;
            }
            else {
                this.errOcc = true;
                this.newAlert("Error", data.reason);
            }
        }, err => {
            this.errOcc = true;
            this.newAlert("Connection Error", err.message);
        });
    }

    retry() {
        this.profProv.o_profile_p().subscribe(data => {
            if (data.success) {
                this.item = data.item;
                this.errOcc = false;
            }
            else {
                this.errOcc = true;
                this.newAlert("Error", data.reason);
            }
        }, err => {
            this.errOcc = true;
            this.newAlert("Connection Error", err.message);
        });
    }

    ionViewDidLoad() {

    }

    compose() {
        this.navCtrl.push(OCommsPage);
    }

    settings() {
        this.navCtrl.push(SettingsPage, { u_type: 'o' });
    }

    followers() {
        if (this.user.username) {
            this.navCtrl.push(FollowersPage, { username: this.user.username });
        }
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
