import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, ViewController } from 'ionic-angular';

import { OrgJsProvider } from '../../providers/org-js/org-js';

@IonicPage()
@Component({
    selector: 'page-org-beat-sel',
    templateUrl: 'org-beat-sel.html',
})
export class OrgBeatSelPage {
    item: any;
    f_name: string;
    l_name: string;
    username: string;
    o_username: string;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private orgJProv: OrgJsProvider,
        private alertCtrl: AlertController,
        private viewCtrl: ViewController,
        private ldCtrl: LoadingController
    ) {
        this.f_name = this.navParams.get('f_name');
        this.l_name = this.navParams.get('l_name');
        this.username = this.navParams.get('username');
        this.o_username = this.navParams.get('o_username');

        let ld1 = this.ldCtrl.create({
            content: "Loading Town Hall Districts..."
        });

        ld1.present();
        this.orgJProv.serve_dists().subscribe(data => {
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
        console.log('ionViewDidLoad OrgBeatSelPage');
    }

    confirm(b_name: string, b_code: string) {
        let conf_alert = this.alertCtrl.create({
            title: "Report on " + b_name + "?",
            message: `Do you want ${this.f_name} to report on ${b_name}?`,
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

    selectBeat(code: string) {
        let ld2 = this.ldCtrl.create({
            content: "Assigning Journalist..."
        });

        ld2.present();
        this.orgJProv.assign_j(this.username, this.o_username, code).subscribe(data => {
            ld2.dismiss();
            if (data.success) {
                this.closeModal(true);
            }
            else {
                this.newAlert("Error", data.reason);
            }
        }, err => {
            ld2.dismiss();
            this.newAlert("Connection Error", err.message);
        });
    }

    closeModal(success: boolean){
        this.viewCtrl.dismiss(success);
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
