import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { ProfileProvider } from "../../providers/profile/profile";

@IonicPage()
@Component({
    selector: 'page-o-journos',
    templateUrl: 'o-journos.html',
})
export class OJournosPage {
    item: any;
    errOcc = false;
    username: string;
    pending_reqs: boolean;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private profProv: ProfileProvider,
        private alCtrl: AlertController) {
        this.profProv.o_profile_j().subscribe(data =>{
            if(data.success){
                this.errOcc = false;
                this.item = data.item;
                this.username = this.item.user.username;
            }
            else {
                this.errOcc = true;
                this.newAlert("Error", data.reason);
            }
        }, err =>{
            this.errOcc = true;
            this.newAlert("Connection Error", err.message);
        });
    }

    ionViewDidLoad() {
        
    }

    retry(){
        this.profProv.o_profile_j().subscribe(data =>{
            if(data.success){
                this.errOcc = false;
                this.item = data.item;
                this.username = this.item.user.username;
            }
            else {
                this.errOcc = true;
                this.newAlert("Error", data.reason);
            }
        }, (err)=>{
            this.errOcc = true;
            this.newAlert("Connection Error", err.message);
        });
    }

    newAlert(title: string, text: string){
        let newAl = this.alCtrl.create({
            title: title,
            subTitle: text,
            buttons: ['Ok']
        });

        return newAl.present();
    }

}
