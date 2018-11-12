import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { JCommsPage } from "../j-comms/j-comms";

@IonicPage()
@Component({
    selector: 'page-j-beat',
    templateUrl: 'j-beat.html',
})
export class JBeatPage {

    constructor(public navCtrl: NavController, public navParams: NavParams) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad JBeatPage');
    }

    compose() {
        this.navCtrl.push(JCommsPage);
    }

}
