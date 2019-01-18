import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { ProfileProvider } from '../../providers/profile/profile';

@IonicPage()
@Component({
    selector: 'page-j-org',
    templateUrl: 'j-org.html',
})
export class JOrgPage {
    item: any;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private profProv: ProfileProvider,
        private alCtrl: AlertController) {
        this.load();
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad JOrgPage');
    }

    load(){
        this.profProv.j_profile_o().subscribe(data => {
            if(data.success){
                this.item = data.item;
            }
            else {
                this.newAlert("Error", data.reason);
            }
        }, err => {
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
