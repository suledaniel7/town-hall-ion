import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, App } from 'ionic-angular';

import { LogoutProvider } from "../../providers/logout/logout";
import { JAccountProvider } from '../../providers/j-account/j-account';

import { FreelancersPage } from "../freelancers/freelancers";
import { SigninPage } from '../signin/signin';

@IonicPage()
@Component({
    selector: 'page-j-beat-sel',
    templateUrl: 'j-beat-sel.html',
})
export class JBeatSelPage {
    item: any;
    errOc: boolean = false;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public app: App,
        private jAcProv: JAccountProvider,
        private logProv: LogoutProvider,
        private alertCtrl: AlertController,
        private ldCtrl: LoadingController
    ) {
        this.load();
    }

    refresh(){
        this.load();
    }

    load(){
        let ld1 = this.ldCtrl.create({
            content: "Loading Town Hall Districts..."
        });

        ld1.present();
        this.jAcProv.j_beat_render().subscribe(data => {
            this.errOc = false;
            ld1.dismiss();
            if (data.success) {
                this.item = data;
            }
            else {
                this.newAlert("Error", data.reason);
            }
        }, () => {
            this.errOc = true;
            ld1.dismiss();
            this.newAlert("Connection Error", "Please check your connection");
        });
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad JBeatSelPage');
    }

    logout() {
        this.logProv.logout().subscribe(data => {
            if (data.success) {
                this.app.getRootNav().setRoot(SigninPage);
                this.navCtrl.popToRoot();
            }
            else {
                this.newAlert("Internal Error", "Something went wrong while logging you out. Please restart the app");
            }
        }, () => {
            this.newAlert("Connection Error", "Please check your connection");
        });
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
            this.newAlert("Connection Error", "Please check your connection");
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
