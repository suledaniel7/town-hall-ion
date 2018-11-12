import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { JCommsPage } from "../j-comms/j-comms";
import { JSettingsPage } from "../j-settings/j-settings";

@IonicPage()
@Component({
    selector: 'page-j-profile',
    templateUrl: 'j-profile.html',
})
export class JProfilePage {

    constructor(public navCtrl: NavController, public navParams: NavParams) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad JProfilePage');
    }

    compose(){
        this.navCtrl.push(JCommsPage);
    }

    settings(){
        this.navCtrl.push(JSettingsPage);
    }

}
