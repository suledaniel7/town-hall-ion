import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { LogoutProvider } from "../../providers/logout/logout";

import { SigninPage } from "../signin/signin";

@IonicPage()
@Component({
    selector: 'page-o-settings',
    templateUrl: 'o-settings.html',
})
export class OSettingsPage {

    constructor(public navCtrl: NavController, public navParams: NavParams, private logProv: LogoutProvider) {
    }

    ionViewDidLoad() {
        
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
