import { Component } from '@angular/core';
import { Input } from "@angular/core";
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AddressProvider } from '../../providers/address/address';

@IonicPage()
@Component({
    selector: 'page-org',
    templateUrl: 'org.html',
})
export class OrgPage {
    imgAddress: string;

    @Input() person: any;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public address: AddressProvider
    ) {
        this.imgAddress = this.address.getImageApi();
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad OrgPage');
    }

}
