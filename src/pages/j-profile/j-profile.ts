import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ProfileProvider } from '../../providers/profile/profile';

import { JCommsPage } from "../j-comms/j-comms";
import { JSettingsPage } from "../j-settings/j-settings";

@IonicPage()
@Component({
    selector: 'page-j-profile',
    templateUrl: 'j-profile.html',
})
export class JProfilePage {
    item: any;

    constructor(public navCtrl: NavController, public navParams: NavParams, private profProv: ProfileProvider) {
        this.load();
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad JProfilePage');
    }

    compose(){
        this.navCtrl.push(JCommsPage);
    }

    settings(){
        this.navCtrl.push(JSettingsPage);
    }

    load(){
        this.profProv.j_profile_p().subscribe(data => {
            if(data.success){
                this.item = data.item;
                if(!data.item.free){
                    this.item.exp = "Your request to " + data.item.user.orgName + " is still pending.";
                }
            }
            else {
                alert(data.reason);
            }
        }, err => {
            alert("An error occured. Error: " + err.message);
        });
    }

}
