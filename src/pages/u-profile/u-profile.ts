import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoadingController } from "ionic-angular";
import { AlertController } from 'ionic-angular';

import { ProfileProvider } from "../../providers/profile/profile";

import { USettingsPage } from "../u-settings/u-settings";

@IonicPage()
@Component({
    selector: 'page-u-profile',
    templateUrl: 'u-profile.html',
})
export class UProfilePage {
    item: any;

    constructor(public navCtrl: NavController, private alertCtrl: AlertController, public ldCtrl: LoadingController, public navParams: NavParams, private profProv: ProfileProvider) {
        this.load();
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad UProfilePage');
    }

    load(){
        let loader = this.ldCtrl.create({
            showBackdrop: true,
            content: "Please wait...",
            duration: 5000
        });

        loader.present();

        this.profProv.u_profile_p().subscribe(data => {
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
                setTimeout(()=>{
                    this.load();
                }, 10000);
            }
        });
    }

    settings(){
        this.navCtrl.push(USettingsPage);
    }
}
