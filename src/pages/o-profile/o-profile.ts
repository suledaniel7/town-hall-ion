import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ProfileProvider } from "../../providers/profile/profile";

import { OCommsPage } from "../o-comms/o-comms";
import { OSettingsPage } from "../o-settings/o-settings";

@IonicPage()
@Component({
    selector: 'page-o-profile',
    templateUrl: 'o-profile.html',
})
export class OProfilePage {
    item: any;
    user: any;
    messages: any;
    errOcc = false;

    constructor(public navCtrl: NavController, public navParams: NavParams, private profProv: ProfileProvider) {
        this.profProv.o_profile_p().subscribe(data => {
            if(data.success){
                this.item = data.item;
                this.user = data.item.user;
                this.messages = data.item.messages;
                this.errOcc = false;
            }
            else {
                this.errOcc = true;
                alert("An error occured. Error: " + data.reason);
            }
        }, err =>{
            this.errOcc = true;
            alert("An error occured. Error: " + err.message);
        });
    }

    retry(){
        this.profProv.o_profile_p().subscribe(data => {
            if(data.success){
                this.item = data.item;
                this.errOcc = false;
            }
            else {
                this.errOcc = true;
                alert("An error occured. Error: " + data.reason);
            }
        }, err =>{
            this.errOcc = true;
            alert("An error occured. Error: " + err.message);
        });
    }

    ionViewDidLoad() {
        
    }

    compose() {
        this.navCtrl.push(OCommsPage);
    }

    settings(){
        this.navCtrl.push(OSettingsPage);
    }

}
