import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';

import { ProfileProvider } from "../../providers/profile/profile";
import { AddressProvider } from '../../providers/address/address';

import { LCommsPage } from '../l-comms/l-comms';
import { SettingsPage } from '../settings/settings';
import { FollowersPage } from '../followers/followers';

@IonicPage()
@Component({
    selector: 'page-l-profile',
    templateUrl: 'l-profile.html',
})
export class LProfilePage {
    item: any;
    imgAddress: string;

    constructor(
        public navCtrl: NavController,
        private alertCtrl: AlertController,
        private ldCtrl: LoadingController,
        public navParams: NavParams,
        private profileProv: ProfileProvider,
        public address: AddressProvider
    ) {
        this.imgAddress = this.address.getImageApi();
        this.load();
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad LProfilePage');
    }

    load() {
        let loader = this.ldCtrl.create({
            showBackdrop: true,
            content: "Please wait...",
        });

        loader.present();

        this.profileProv.l_profile_p().subscribe(data => {
                loader.dismiss();
            if (data.success) {
                this.item = data.item;
            }
            else {
                this.newAlert("Error", data.reason);
            }
        }, (err) => {
            loader.dismiss();
            this.newAlert("Connection Error", err.message);
            let confirmed = true;
            let confirm = this.alertCtrl.create({
                title: "Retry?",
                message: "Should we try again in ten seconds?",
                buttons: [
                    {
                        text: 'Yes',
                        handler: () => {
                            confirmed = true;
                        }
                    },
                    {
                        text: 'No',
                        handler: () => {
                            confirmed = false;
                        }
                    }
                ]
            });
            confirm.present();
            if (confirmed) {
                setTimeout(this.load, 10000);
            }
        });
    }

    compose() {
        this.navCtrl.push(LCommsPage);
    }

    settings() {
        this.navCtrl.push(SettingsPage, {u_type: 'l'});
    }

    followers() {
        if (this.item.user.code) {
            this.navCtrl.push(FollowersPage, { username: this.item.user.code });
        }
    }

    newAlert(title: string, text: string){
        let newAl = this.alertCtrl.create({
            title: title,
            subTitle: text,
            buttons: ['Ok']
        });

        return newAl.present();
    }
}
