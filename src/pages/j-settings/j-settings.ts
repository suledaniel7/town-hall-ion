import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { LogoutProvider } from "../../providers/logout/logout";

import { SigninPage } from "../signin/signin";

@IonicPage()
@Component({
    selector: 'page-j-settings',
    templateUrl: 'j-settings.html',
})
export class JSettingsPage {

    constructor(public navCtrl: NavController, public navParams: NavParams, private logProv: LogoutProvider) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad JSettingsPage');
    }

    logout(){
        this.logProv.logout().subscribe(data => {
            if(data.success){
                this.navCtrl.setRoot(SigninPage);
                this.navCtrl.popToRoot();
            }
            else {
                alert("Something went wrong while logging you out. Please restart the app");
            }
        }, (err)=> {
            alert("An error occured. Error: " + err.message);
        });
    }

}
