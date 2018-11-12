import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ProfileProvider } from "../../providers/profile/profile";

import { OCommsPage } from "../o-comms/o-comms";

@IonicPage()
@Component({
    selector: 'page-o-home',
    templateUrl: 'o-home.html',
})

export class OHomePage {
    item: any;

    constructor(public navCtrl: NavController, public navParams: NavParams, private profileProv: ProfileProvider) {
    }

    ionViewDidLoad() {
        this.profileProv.o_profile_h().subscribe(data => {
            if(data.success){
                this.item = data.item;
            }
        });
    }


    compose() {
        this.navCtrl.push(OCommsPage);
    }
}
