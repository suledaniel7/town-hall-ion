import { Component } from '@angular/core';
import { Input } from "@angular/core";
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the OrgPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-org',
    templateUrl: 'org.html',
})
export class OrgPage {
    @Input() person: any;

    constructor(public navCtrl: NavController, public navParams: NavParams) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad OrgPage');
    }

}
