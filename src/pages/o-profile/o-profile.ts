import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { OCommsPage } from "../o-comms/o-comms";
import { OSettingsPage } from "../o-settings/o-settings";

@IonicPage()
@Component({
    selector: 'page-o-profile',
    templateUrl: 'o-profile.html',
})
export class OProfilePage {

    constructor(public navCtrl: NavController, public navParams: NavParams) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad OProfilePage');
    }

    compose() {
        this.navCtrl.push(OCommsPage);
    }

    settings(){
        this.navCtrl.push(OSettingsPage);
    }

}
