import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { SignupPage } from '../signup/signup';
import { SigninProvider } from "../../providers/signin/signin";
import { UsersPage } from "../users/users";
import { JournalistsPage } from "../journalists/journalists";
import { OrganisationsPage } from '../organisations/organisations';
import { LegislatorsPage } from "../legislators/legislators";
import { FreelancersPage } from '../freelancers/freelancers';
import { OSignupPage } from '../o-signup/o-signup';
import { JSignupPage } from '../j-signup/j-signup';
import { USignupPage } from '../u-signup/u-signup';

@IonicPage()
@Component({
    selector: 'page-post-o-signin',
    templateUrl: 'post-o-signin.html',
})
export class PostOSigninPage {
    email: string;
    password: string;
    err = '';
    sel_acc: string = 'u';

    constructor(
        public navCtrl: NavController,
        private ldCtrl: LoadingController,
        public navParams: NavParams,
        private signinProv: SigninProvider,
        private alCtrl: AlertController,
        private storage: Storage
    ) {
        this.sel_acc = this.navParams.get('sel_acc');
    }

    ionViewDidLoad() {

    }

    signup() {
        if(this.sel_acc === 'u'){
            this.navCtrl.push(USignupPage, {auto: true});
        }
        else if(this.sel_acc === 'j'){
            this.navCtrl.push(JSignupPage, {auto: true});
        }
        else if(this.sel_acc === 'o'){
            this.navCtrl.push(OSignupPage, {auto: true});
        }
        else {
            this.navCtrl.push(SignupPage);
        }
    }

    signin() {
        if (this.email && this.password) {
            let wsp = /^\s*$/;

            if (!wsp.test(this.email) && !wsp.test(this.password)) {
                let loader = this.ldCtrl.create({
                    showBackdrop: true,
                    content: "Please wait...",
                });

                loader.present();
                this.signinProv.signinUser(this.email, this.password).subscribe(data => {
                    loader.dismiss();
                    if (data.success) {
                        if (data.u_type == 'u') {
                            this.storage.set('signed_in', JSON.stringify({ status: true, u_type: data.u_type })).then(() => {
                                this.navCtrl.setRoot(UsersPage);
                                this.navCtrl.popToRoot();
                            }).catch(err => {
                                this.newAlert("Error", err);
                                this.navCtrl.setRoot(UsersPage);
                                this.navCtrl.popToRoot();
                            });
                        }
                        else if (data.u_type == 'j') {
                            if (data.j_type === 'm') {
                                this.storage.set('signed_in', JSON.stringify({ status: true, u_type: data.u_type })).then(() => {
                                    this.navCtrl.setRoot(JournalistsPage);
                                    this.navCtrl.popToRoot();
                                }).catch(err => {
                                    this.newAlert("Error", err);
                                    this.navCtrl.setRoot(JournalistsPage);
                                    this.navCtrl.popToRoot();
                                });
                            }
                            else {
                                this.storage.set('signed_in', JSON.stringify({ status: true, u_type: 'f' })).then(() => {
                                    this.navCtrl.setRoot(FreelancersPage);
                                    this.navCtrl.popToRoot();
                                }).catch(err => {
                                    this.newAlert("Error", err);
                                    this.navCtrl.setRoot(FreelancersPage);
                                    this.navCtrl.popToRoot();
                                });
                            }
                        }
                        else if (data.u_type == 'o') {
                            this.storage.set('signed_in', JSON.stringify({ status: true, u_type: data.u_type })).then(() => {
                                this.navCtrl.setRoot(OrganisationsPage);
                                this.navCtrl.popToRoot();
                            }).catch(err => {
                                this.newAlert("Error", err);
                                this.navCtrl.setRoot(OrganisationsPage);
                                this.navCtrl.popToRoot();
                            });
                        }
                        else if (data.u_type == 'l') {
                            this.storage.set('signed_in', JSON.stringify({ status: true, u_type: data.u_type })).then(() => {
                                this.navCtrl.setRoot(LegislatorsPage);
                                this.navCtrl.popToRoot();
                            }).catch(err => {
                                this.newAlert("Error", err);
                                this.navCtrl.setRoot(LegislatorsPage);
                                this.navCtrl.popToRoot();
                            });
                        }
                    }
                    else {
                        this.err = data.reason;
                        this.clearErr();
                    }
                }, () => {
                    loader.dismiss();
                    this.newAlert("Connection Error", "Please check your connection");
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

    newAlert(title: string, text: string) {
        let newAl = this.alCtrl.create({
            title: title,
            subTitle: text,
            buttons: ['Ok']
        });

        return newAl.present();
    }
}
