import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ProfileProvider } from '../../providers/profile/profile';
import { AddressProvider } from '../../providers/address/address';

import { JCommsPage } from "../j-comms/j-comms";
import { SettingsPage } from '../settings/settings';
import { FollowersPage } from '../followers/followers';

@IonicPage()
@Component({
    selector: 'page-j-profile',
    templateUrl: 'j-profile.html',
})
export class JProfilePage {
    item: any;
    imgAddress: string;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private profProv: ProfileProvider,
        public address: AddressProvider
    ) {
        this.imgAddress = this.address.getImageApi();
        this.load();
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad JProfilePage');
    }

    compose() {
        this.navCtrl.push(JCommsPage);
    }

    settings() {
        this.navCtrl.push(SettingsPage, {u_type: 'j'});
    }

    load() {
        this.profProv.j_profile_p().subscribe(data => {
            if (data.success) {
                this.item = data.item;
                if (!data.item.free) {
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

    followers() {
        if (this.item.user.username) {
            this.navCtrl.push(FollowersPage, { username: this.item.user.username });
        }
    }

}
