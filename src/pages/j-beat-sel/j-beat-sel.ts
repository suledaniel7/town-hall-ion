import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';

import { JAccountProvider } from '../../providers/j-account/j-account';
import { FreelancersPage } from "../freelancers/freelancers";

@IonicPage()
@Component({
    selector: 'page-j-beat-sel',
    templateUrl: 'j-beat-sel.html',
})
export class JBeatSelPage {
    item: any;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private jAcProv: JAccountProvider,
        private alertCtrl: AlertController,
        private ldCtrl: LoadingController
    ) {
        let ld1 = this.ldCtrl.create({
            content: "Loading Town Hall Districts..."
        });

        ld1.present();
        this.jAcProv.j_beat_render().subscribe(data => {
            ld1.dismiss();
            if (data.success) {
                this.item = data;
            }
            else {
                this.newAlert("Error", data.reason);
            }
        }, err => {
            ld1.dismiss();
            this.newAlert("Connection Error", err.message);
        });
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad JBeatSelPage');
    }

    confirm(b_name, b_code) {
        let conf_alert = this.alertCtrl.create({
            title: "Report on " + b_name + "?",
            message: "Do you want to Report on " + b_name + "?",
            buttons: [
                {
                    text: "No"
                },
                {
                    text: "Yes",
                    handler: () => {
                        this.selectBeat(b_code);
                    }
                }
            ]
        });

        conf_alert.present();
    }

    selectBeat(code) {
        let ld2 = this.ldCtrl.create({
            content: "Sending Request..."
        });

        ld2.present();
        this.jAcProv.j_beat_sub(code).subscribe(data => {
            ld2.dismiss();
            if (data.success) {
                this.navCtrl.setRoot(FreelancersPage);
                this.navCtrl.popToRoot();
            }
            else {
                this.newAlert("Error", data.reason);
            }
        }, err => {
            ld2.dismiss();
            this.newAlert("Connection Error", err.message);
        });
    }

    newAlert(title: string, text: string) {
        let newAl = this.alertCtrl.create({
            title: title,
            subTitle: text,
            buttons: ['Ok']
        });

        return newAl.present();
    }
}
