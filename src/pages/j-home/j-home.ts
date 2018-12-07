import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ProfileProvider } from '../../providers/profile/profile';

import { JCommsPage } from "../j-comms/j-comms";

@IonicPage()
@Component({
    selector: 'page-j-home',
    templateUrl: 'j-home.html',
})
export class JHomePage {
    item: any;

    constructor(public navCtrl: NavController, public navParams: NavParams, private profProv: ProfileProvider) {
        this.load();
    }

    ionViewDidLoad() {
        
    }

    load() {
        this.profProv.j_profile_h().subscribe(data =>{
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

    compose() {
        this.navCtrl.push(JCommsPage);
    }

}
