import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { SigninPage } from '../signin/signin';
import { PostOSigninPage } from '../post-o-signin/post-o-signin';

@IonicPage()
@Component({
    selector: 'page-u-intro',
    templateUrl: 'u-intro.html',
})
export class UIntroPage {

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private storage: Storage
    ) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad UIntroPage');
    }

    skip() {
        this.storage.set('orientation_complete', JSON.stringify(true)).then(() => {
            this.navCtrl.push(SigninPage);
        }).catch(err => {
            alert(err);
        });
    }

    next() {
        this.navCtrl.push(PostOSigninPage, { sel_acc: 'u' });
    }

}
