import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { LCommsPage } from '../l-comms/l-comms';
import { LSettingsPage } from "../l-settings/l-settings";

@IonicPage()
@Component({
    selector: 'page-l-profile',
    templateUrl: 'l-profile.html',
})
export class LProfilePage {

    constructor(public navCtrl: NavController, public navParams: NavParams) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad LProfilePage');
    }

    compose(){
        this.navCtrl.push(LCommsPage);
    }

    settings(){
        this.navCtrl.push(LSettingsPage);
    }

}
