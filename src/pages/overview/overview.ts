import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { UIntroPage } from '../u-intro/u-intro';
import { JIntroPage } from '../j-intro/j-intro';
import { LIntroPage } from '../l-intro/l-intro';
import { OIntroPage } from '../o-intro/o-intro';
import { SigninPage } from '../signin/signin';

@IonicPage()
@Component({
    selector: 'page-overview',
    templateUrl: 'overview.html',
})
export class OverviewPage {
    sel_ac: string = 'u';

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private storage: Storage
    ) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad OverviewPage');
    }

    sel(ac: string) {
        this.sel_ac = ac;
    }

    skip() {
        this.storage.set('orientation_complete', JSON.stringify(true)).then(() => {
            this.navCtrl.push(SigninPage);
        }).catch(err => {
            alert(err);
        });
    }

    move() {
        if (this.sel_ac === 'u') {
            this.navCtrl.push(UIntroPage);
        }
        else if (this.sel_ac === 'j') {
            this.navCtrl.push(JIntroPage);
        }
        else if (this.sel_ac === 'l') {
            this.navCtrl.push(LIntroPage);
        }
        else if (this.sel_ac === 'o') {
            this.navCtrl.push(OIntroPage);
        }
        else {
            this.navCtrl.push(SigninPage);
        }
    }

}
