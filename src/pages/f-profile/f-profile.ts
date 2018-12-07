import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ProfileProvider } from '../../providers/profile/profile';

import { FCommsPage } from "../f-comms/f-comms";
import { FSettingsPage } from "../f-settings/f-settings";
@IonicPage()
@Component({
    selector: 'page-f-profile',
    templateUrl: 'f-profile.html',
})
export class FProfilePage {
    item: any;

    constructor(public navCtrl: NavController, public navParams: NavParams, private profProv: ProfileProvider) {
        this.load();
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad FProfilePage');
    }

    compose(){
        this.navCtrl.push(FCommsPage);
    }

    settings(){
        this.navCtrl.push(FSettingsPage);
    }

    load(){
        this.profProv.j_profile_p().subscribe(data => {
            if(data.success){
                this.item = data.item;
            }
            else {
                alert(data.reason);
            }
        }, err => {
            alert("An error occured. Error: " + err.message);
        });
    }
}
