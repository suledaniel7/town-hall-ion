import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';

import { ProfileProvider } from "../../providers/profile/profile";

import { OCommsPage } from "../o-comms/o-comms";

@IonicPage()
@Component({
    selector: 'page-o-home',
    templateUrl: 'o-home.html',
})

export class OHomePage {
    item: any;

    constructor(
        public navCtrl: NavController,
        private alertCtrl: AlertController,
        private ldCtrl: LoadingController,
        public navParams: NavParams,
        private profileProv: ProfileProvider,
    ) {
        this.load();
    }

    ionViewDidLoad() {

    }

    load() {
        let loader = this.ldCtrl.create({
            showBackdrop: true,
            content: "Please wait...",
        });

        loader.present();

        this.profileProv.o_profile_h().subscribe(data => {
            if (data.success) {
                loader.dismiss();
                this.item = data.item;
            }
            else {
                this.newAlert("Error", data.reason);
            }
        }, (err) => {
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
        this.navCtrl.push(OCommsPage);
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
