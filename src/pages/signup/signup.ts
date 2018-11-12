import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { USignupPage } from '../u-signup/u-signup';
import { JSignupPage } from '../j-signup/j-signup';
import { OSignupPage } from '../o-signup/o-signup';

@IonicPage()
@Component({
    selector: 'page-signup',
    templateUrl: 'signup.html',
})
export class SignupPage {
    ac_type = 'u';
    wsp = /^\s*$/;

    constructor(public navCtrl: NavController, public navParams: NavParams) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad SignupPage');
    }

    selectedAcc(val){
        this.ac_type = val;
    }

    back(){
        this.navCtrl.pop();
    }

    signup(){
        if(!this.wsp.test(this.ac_type)){
            switch(this.ac_type){
                case('u'):
                    this.navCtrl.push(USignupPage);
                    break;
                case('j'):
                    this.navCtrl.push(JSignupPage);
                    break;
                case('o'):
                    this.navCtrl.push(OSignupPage);
                    break;
                default:
                    break;
            }
        }
    }

}
