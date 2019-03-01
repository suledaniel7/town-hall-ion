import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { SignupProvider } from '../../providers/signup/signup';

import { BioPage } from '../bio/bio';
import { SignupPage } from '../signup/signup';

@IonicPage()
@Component({
    selector: 'page-o-signup',
    templateUrl: 'o-signup.html',
})
export class OSignupPage {
    name: string;
    username: string;
    email: string;
    email_corr: string;
    password: string;
    pass1: string;
    id: string;
    err = '';
    validUsername: boolean = false;
    validEmail: boolean = false;
    validCMail: boolean = false;
    auto: boolean = false;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private signupProv: SignupProvider,
        private storage: Storage
    ) {
        this.auto = this.navParams.get('auto');
    }

    ionViewDidLoad() {

    }

    back(){
        this.navCtrl.insert(this.navCtrl.length() - 1, SignupPage);
        this.navCtrl.pop();
    }

    sub() {
        let wsp = /^\s*$/;
        if (this.name && this.username && this.email && this.email_corr && this.password && this.pass1) {
            if (!wsp.test(this.name) && !wsp.test(this.username) && !wsp.test(this.email) && !wsp.test(this.email_corr) && !wsp.test(this.password) && !wsp.test(this.pass1)) {
                if (this.password == this.pass1) {
                    this.checks();
                }
                else {
                    this.err = "Your passwords do not match";
                    this.clearErr();
                }
            }
            else {
                this.err = "All fields, except ID are required";
                this.clearErr();
            }
        }
        else {
            this.err = "All fields, except ID are required";
            this.clearErr()
        }
    }

    clearErr() {
        setTimeout(() => {
            this.err = '';
        }, 5000);
    }

    checks() {
        this.signupProv.u_check(this.username).subscribe(data => {
            if (data.found) {
                this.err = 'A user exists with that username. Please choose another';
                this.clearErr();
            }
            else {
                this.signupProv.e_check(this.email).subscribe(data => {
                    if (data.found) {
                        this.err = 'A user exists with that email address. Please choose another';
                        this.clearErr();
                    }
                    else {
                        this.signupProv.c_check(this.email_corr).subscribe(data => {
                            if (data.found) {
                                this.err = 'A user exists with that Correspondence email address. Please choose another';
                                this.clearErr();
                            }
                            else {
                                this.signupProv.signup_o(this.name, this.username, this.email, this.email_corr, this.password, this.id).subscribe(data => {
                                    if (data.success) {
                                        this.storage.set('signed_in', JSON.stringify({ status: true, u_type: 'j' })).then(() => {
                                            this.navCtrl.setRoot(BioPage, { u_type: 'o', photo_type: 'Logo' });
                                            this.navCtrl.popToRoot();
                                        }).catch(err => {
                                            this.err = err;
                                            this.navCtrl.setRoot(BioPage, { u_type: 'o', photo_type: 'Logo' });
                                            this.navCtrl.popToRoot();
                                        });
                                    }
                                    else {
                                        this.err = data.reason;
                                        this.clearErr();
                                    }
                                }, ()=>{
                                    this.err = "Please check your connection";
                                    this.clearErr();
                                });
                            }
                        }, ()=>{
                            this.err = "Please check your connection";
                            this.clearErr();
                        });
                    }
                }, ()=>{
                    this.err = "Please check your connection";
                    this.clearErr();
                });
            }
        }, ()=>{
            this.err = "Please check your connection";
            this.clearErr();
        });
    }

    checkUsername() {
        let wsp = /^\s*$/;
        if (!wsp.test(this.username)) {
            this.signupProv.u_check(this.username).subscribe((data) => {
                if (data.found) {
                    this.err = 'A user exists with that username. Please choose another';
                    this.clearErr();
                    this.validUsername = false;
                }
                else {
                    this.validUsername = true;
                }
            });
        }
    }

    checkEmail() {
        let wsp = /^\s*$/;
        if (!wsp.test(this.email)) {
            this.signupProv.e_check(this.email).subscribe(data => {
                if (data.found) {
                    this.err = 'A user exists with that email address. Please choose another';
                    this.clearErr();
                    this.validEmail = false;
                }
                else {
                    this.validEmail = true;
                }
            });
        }
    }

    checkCMail() {
        let wsp = /^\s*$/;
        if (!wsp.test(this.email_corr)) {
            this.signupProv.c_check(this.email_corr).subscribe(data => {
                if (data.found) {
                    this.err = 'A user exists with that Correspondence email address. Please choose another';
                    this.clearErr();
                    this.validCMail = false;
                }
                else {
                    this.validCMail = true;
                }
            });
        }
    }
}
