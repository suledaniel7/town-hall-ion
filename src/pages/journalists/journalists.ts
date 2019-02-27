import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { JAccountProvider } from "../../providers/j-account/j-account";

import { JHomePage } from "../j-home/j-home";
import { JOrgPage } from "../j-org/j-org";
import { JProfilePage } from "../j-profile/j-profile";
import { SearchPage } from "../search/search";
import { JOrgSelPage } from '../j-org-sel/j-org-sel';

@IonicPage()
@Component({
    selector: 'page-journalists',
    templateUrl: 'journalists.html',
})
export class JournalistsPage {
    tab1Root = JHomePage;
    tab2Root = SearchPage;
    tab3Root = JOrgPage;
    tab4Root = JProfilePage;

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
            if (data.success) {
                if (!data.status) {
                    this.navCtrl.setRoot(JOrgSelPage);
                    this.navCtrl.popToRoot();
                }
            }
        });
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad JournalistsPage');
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
