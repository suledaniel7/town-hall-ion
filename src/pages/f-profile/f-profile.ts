import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { ProfileProvider } from '../../providers/profile/profile';
import { AddressProvider } from '../../providers/address/address';

import { FCommsPage } from "../f-comms/f-comms";
import { JSettingsPage } from '../j-settings/j-settings';
@IonicPage()
@Component({
    selector: 'page-f-profile',
    templateUrl: 'f-profile.html',
})
export class FProfilePage {
    item: any;
    imgAddress: string;

    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        private profProv: ProfileProvider,
        public address: AddressProvider,
        private alCtrl: AlertController
    ) {
        this.imgAddress = this.address.getImageApi();
        this.load();
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad FProfilePage');
    }

    compose() {
        this.navCtrl.push(FCommsPage);
    }

    settings() {
        this.navCtrl.push(JSettingsPage);
    }

    load() {
        this.profProv.j_profile_p().subscribe(data => {
            if (data.success) {
                this.item = data.item;
            }
            else {
                this.newAlert("Error", data.reason);
            }
        }, err => {
            this.newAlert("Communication Error", err.message);
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
