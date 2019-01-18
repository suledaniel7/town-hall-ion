import { Component } from '@angular/core';
import { Input } from "@angular/core";
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AddressProvider } from '../../providers/address/address';

@IonicPage()
@Component({
    selector: 'page-o-journo',
    templateUrl: 'o-journo.html',
})
export class OJournoPage {
    imgAddress: string;

    @Input() journalist: any;
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public address: AddressProvider
    ) {
        this.imgAddress = this.address.getImageApi();
    }

    ionViewDidLoad() {
        if (this.journalist.followersNo == '1') {
            document.getElementById('plur').innerText = 'Follower';
        }
    }

}
