import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { FHomePage } from "../f-home/f-home";
import { FProfilePage } from "../f-profile/f-profile";
import { SearchPage } from "../search/search";
import { JAccountProvider } from '../../providers/j-account/j-account';
import { JBeatSelPage } from '../j-beat-sel/j-beat-sel';

@IonicPage()
@Component({
    selector: 'page-freelancers',
    templateUrl: 'freelancers.html',
})
export class FreelancersPage {
    tab1Root = FHomePage;
    tab2Root = SearchPage;
    tab3Root = FProfilePage;
    errOc: boolean = false;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private alCtrl: AlertController,
        private jAcProv: JAccountProvider
    ) {
        this.load();
    }

    refresh(){
        this.load();
    }

    load(){
        this.jAcProv.status().subscribe((data) => {
            this.errOc = false;
            if (data.success) {
                if (!data.status) {
                    this.navCtrl.setRoot(JBeatSelPage);
                    this.navCtrl.popToRoot();
                }
            }
            else {
                this.newAlert("Error", data.reason);
            }
        }, () => {
            this.errOc = true;
            this.newAlert("Connection Error", "Please check your connection");
        });
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad FreelancersPage');
    }

    newAlert(title: string, text: string) {
        let newAl = this.alCtrl.create({
            title: title,
            subTitle: text,
            buttons: ['Ok']
        });

        return newAl.present();
    }
}
