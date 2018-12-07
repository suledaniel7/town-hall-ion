import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoadingController } from "ionic-angular";
import { AlertController } from 'ionic-angular';

import { ProfileProvider } from "../../providers/profile/profile";

@IonicPage()
@Component({
    selector: 'page-u-home',
    templateUrl: 'u-home.html',
})
export class UHomePage {
    item: any;

    constructor(public navCtrl: NavController, private alertCtrl: AlertController, private ldCtrl: LoadingController, public navParams: NavParams, private profProv: ProfileProvider) {
        this.load();
    }

    ionViewDidLoad() {

    }

    load(){
        let loader = this.ldCtrl.create({
            showBackdrop: true,
            content: "Please wait...",
        });

        loader.present();

        this.profProv.u_profile_h().subscribe(data => {
            loader.dismiss();
            if(data.success){
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

}
