import { Component } from '@angular/core';
import { Input } from "@angular/core";
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { LRenderPage } from "../l-render/l-render";

import { AddressProvider } from '../../providers/address/address';

@IonicPage()
@Component({
    selector: 'page-legislator',
    templateUrl: 'legislator.html',
})
export class LegislatorPage {
    imgAddress: string;

    @Input() person: any;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private address: AddressProvider
    ) {
        this.imgAddress = this.address.getImageApi();
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad LegislatorPage');
    }

    render(code: string){
        this.navCtrl.push(LRenderPage, { code: code });
    }
}
