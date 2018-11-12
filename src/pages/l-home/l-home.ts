import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { LCommsPage } from '../l-comms/l-comms';

@IonicPage()
@Component({
    selector: 'page-l-home',
    templateUrl: 'l-home.html',
})
export class LHomePage {

    constructor(public navCtrl: NavController, public navParams: NavParams) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad LHomePage');
    }

    compose(){
        this.navCtrl.push(LCommsPage);
    }
}
