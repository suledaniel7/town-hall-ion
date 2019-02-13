import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';

import { SignupPage } from '../signup/signup';
import { SigninProvider } from "../../providers/signin/signin";
import { UsersPage } from "../users/users";
import { JournalistsPage } from "../journalists/journalists";
import { OrganisationsPage } from '../organisations/organisations';
import { LegislatorsPage } from "../legislators/legislators";
import { FreelancersPage } from '../freelancers/freelancers';

@IonicPage()
@Component({
    selector: 'page-signin',
    templateUrl: 'signin.html',
})
export class SigninPage {
    email: string;
    password: string;
    err = '';

    constructor(
        public navCtrl: NavController,
        private ldCtrl: LoadingController,
        public navParams: NavParams,
        private signinProv: SigninProvider,
        private alCtrl: AlertController
    ) {
    }

    ionViewDidLoad() {

    }

    signup() {
        this.navCtrl.push(SignupPage);
    }

    signin() {
        let loader = this.ldCtrl.create({
            showBackdrop: true,
            content: "Please wait...",
        });

        loader.present();

        if (this.email && this.password) {
            let wsp = /^\s*$/;

            if (!wsp.test(this.email) && !wsp.test(this.password)) {
                this.signinProv.signinUser(this.email, this.password).subscribe(data => {
                    loader.dismiss();
                    if (data.success) {
                        if (data.u_type == 'u') {
                            this.navCtrl.setRoot(UsersPage);
                        }
                        else if (data.u_type == 'j') {
                            if (data.j_type === 'm') {
                                this.navCtrl.setRoot(JournalistsPage);
                            }
                            else {
                                this.navCtrl.setRoot(FreelancersPage);
                            }
                        }
                        else if (data.u_type == 'o') {
                            this.navCtrl.setRoot(OrganisationsPage);
                        }
                        else if (data.u_type == 'l') {
                            this.navCtrl.setRoot(LegislatorsPage);
                        }
                        this.navCtrl.popToRoot();
                    }
                    else {
                        this.err = data.reason;
                        this.clearErr();
                    }
                }, (err) => {
                    loader.dismiss();
                    this.newAlert("Connection Error", err.message);
                });
            }
            else {
                loader.dismiss();
                this.err = 'All fields are required';
                this.clearErr();
            }
        }
        else {
            loader.dismiss();
            this.err = 'All fields are required';
            this.clearErr();
        }
    }

    clearErr() {
        setTimeout(() => {
            this.err = '';
        }, 5000);
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
