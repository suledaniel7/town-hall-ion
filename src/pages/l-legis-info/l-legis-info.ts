import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
    selector: 'page-l-legis-info',
    templateUrl: 'l-legis-info.html',
})
export class LLegisInfoPage {

    constructor(public navCtrl: NavController, public navParams: NavParams) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad LLegisInfoPage');
    }

}
