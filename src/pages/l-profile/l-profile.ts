import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoadingController } from "ionic-angular";
import { AlertController } from 'ionic-angular';

import { ProfileProvider } from "../../providers/profile/profile";

import { LCommsPage } from '../l-comms/l-comms';
import { LSettingsPage } from "../l-settings/l-settings";

@IonicPage()
@Component({
    selector: 'page-l-profile',
    templateUrl: 'l-profile.html',
})
export class LProfilePage {
    item: any;

    constructor(public navCtrl: NavController, private alertCtrl: AlertController, private ldCtrl: LoadingController, public navParams: NavParams, private profileProv: ProfileProvider) {
        this.load();
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad LProfilePage');
    }

    load(){
        let loader = this.ldCtrl.create({
            showBackdrop: true,
            content: "Please wait...",
        });

        loader.present();

        this.profileProv.l_profile_p().subscribe(data => {
            if(data.success){
                loader.dismiss();
                this.item = data.item;
            }
            else {
                alert(data.reason);
            }
        }, (err)=>{
            alert("An error occured. Error: "+ err.message);
            let confirmed = true;
            let confirm = this.alertCtrl.create({
                title: "Retry?",
                message: "Should we try again in ten seconds?",
                buttons: [
                    {
                        text: 'Yes',
                        handler: ()=>{
                            confirmed = true;
                        }
                    },
                    {
                        text: 'No',
                        handler: ()=>{
                            confirmed = false;
                        }
                    }
                ]
            });
            confirm.present();
            if(confirmed){
                setTimeout(this.load, 10000);
            }
        });
    }

    compose(){
        this.navCtrl.push(LCommsPage);
    }

    settings(){
        this.navCtrl.push(LSettingsPage);
    }

}
