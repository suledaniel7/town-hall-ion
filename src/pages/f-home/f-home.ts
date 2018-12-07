import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ProfileProvider } from '../../providers/profile/profile';

import { JCommsPage } from "../j-comms/j-comms";

@IonicPage()
@Component({
    selector: 'page-f-home',
    templateUrl: 'f-home.html',
})
export class FHomePage {
    item: any;

    constructor(public navCtrl: NavController, public navParams: NavParams, private profProv: ProfileProvider) {
        this.load();
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad FHomePage');
    }

    load() {
        this.profProv.j_profile_h().subscribe(data =>{
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

    compose() {
        this.navCtrl.push(JCommsPage);
    }

}
