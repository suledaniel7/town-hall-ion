import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';

import { ProfileProvider } from "../../providers/profile/profile";

import { LCommsPage } from '../l-comms/l-comms';

@IonicPage()
@Component({
    selector: 'page-l-home',
    templateUrl: 'l-home.html',
})
export class LHomePage {
    item: any;

    constructor(
        public navCtrl: NavController,
        private alertCtrl: AlertController,
        private ldCtrl: LoadingController,
        public navParams: NavParams,
        private profileProv: ProfileProvider
    ) {
        this.load();
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad LHomePage');
    }

    load() {
        let loader = this.ldCtrl.create({
            showBackdrop: true,
            content: "Please wait...",
        });

        loader.present();

        this.profileProv.l_profile_h().subscribe(data => {
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

    newAlert(title: string, text: string) {
        let newAl = this.alertCtrl.create({
            title: title,
            subTitle: text,
            buttons: ['Ok']
        });

        return newAl.present();
    }
}
