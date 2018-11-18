import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ProfileProvider } from "../../providers/profile/profile";

@IonicPage()
@Component({
    selector: 'page-o-comms',
    templateUrl: 'o-comms.html',
})
export class OCommsPage {
    item: any;

    constructor(public navCtrl: NavController, public navParams: NavParams, private profProv: ProfileProvider) {
        this.profProv.o_profile_c().subscribe(data => {
            if(data.success){
                this.item = data.item;
            }
            else {
                this.autoretry();
            }
        }, err => {
            alert(err.message);
            this.autoretry();
        });
    }

    autoretry(){
        this.profProv.o_profile_c().subscribe(data => {
            if(data.success){
                this.item = data.item;
            }
            else {
                this.autoretry();
            }
        }, err => {
            alert(err.message);
            this.autoretry();
        });
    }

    ionViewDidLoad() {

    }

}
