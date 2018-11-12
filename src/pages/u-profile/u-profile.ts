import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { USettingsPage } from "../u-settings/u-settings";

@IonicPage()
@Component({
    selector: 'page-u-profile',
    templateUrl: 'u-profile.html',
})
export class UProfilePage {

    constructor(public navCtrl: NavController, public navParams: NavParams) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad UProfilePage');
    }

    settings(){
        this.navCtrl.push(USettingsPage);
    }
}
