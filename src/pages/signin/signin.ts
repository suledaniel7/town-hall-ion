import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { SignupPage } from '../signup/signup';
import { SigninProvider } from "../../providers/signin/signin";
import { OrganisationsPage } from '../organisations/organisations';

@IonicPage()
@Component({
    selector: 'page-signin',
    templateUrl: 'signin.html',
})
export class SigninPage {
    email: string;
    password: string;
    err = '';

    constructor(public navCtrl: NavController, public navParams: NavParams, private signinProv: SigninProvider) {
    }

    ionViewDidLoad() {

    }

    signup() {
        this.navCtrl.push(SignupPage);
    }

    signin() {
        if (this.email && this.password) {
            let wsp = /^\s*$/;

            if (!wsp.test(this.email) && !wsp.test(this.password)) {
                this.signinProv.signinUser(this.email, this.password).subscribe(data => {
                    if(data.success){
                        this.navCtrl.setRoot(OrganisationsPage);
                        this.navCtrl.popToRoot();
                    }
                    else {
                        this.err = data.reason;
                        this.clearErr();
                    }
                });
            }
            else {
                this.err = 'All fields are required';
                this.clearErr();
            }
        }
        else {
            this.err = 'All fields are required';
            this.clearErr();
        }
    }

    clearErr() {
        setTimeout(() => {
            this.err = '';
        }, 5000);
    }
}
