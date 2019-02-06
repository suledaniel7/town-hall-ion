import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';

import { SignupProvider } from "../../providers/signup/signup";

import { BioPage } from '../bio/bio';

@IonicPage()
@Component({
    selector: 'page-j-signup',
    templateUrl: 'j-signup.html',
})
export class JSignupPage {
    f_name: any = '';
    l_name: any = '';
    username: any = '';
    email: any = '';
    password: any = '';
    pass1: any = '';
    ac_type: any = 'm';

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private signupProv: SignupProvider,
        private ldCtrl: LoadingController,
        private alCtrl: AlertController
    ) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad JSignupPage');
    }

    validate() {
        let wsp = /^\s*$/;
        if (!wsp.test(this.f_name) && !wsp.test(this.l_name) && !wsp.test(this.username) && !wsp.test(this.email) && !wsp.test(this.password) && !wsp.test(this.pass1) && !wsp.test(this.ac_type)) {
            if (this.password == this.pass1) {
                let u_loader = this.ldCtrl.create({
                    content: "Creating Account..."
                });

                u_loader.present();

                this.signupProv.u_check(this.username).subscribe(data => {
                    if (data.found) {
                        u_loader.dismiss();
                        this.newAlert("Username in Use", "A user exists with that username. Please choose another");
                    }
                    else {
                        this.signupProv.e_check(this.email).subscribe(data1 => {
                            if (data1.found) {
                                u_loader.dismiss();
                                this.newAlert("Invalid Email", "A user exists with that email address. Please choose another");
                            }
                            else {
                                this.signupProv.signup_j(this.f_name, this.l_name, this.username, this.email, this.password, this.ac_type).subscribe(data => {
                                    u_loader.dismiss();
                                    if (data.success) {
                                        if (this.ac_type == 'm') {
                                            this.navCtrl.setRoot(BioPage, { u_type: 'j', photo_type: 'Avatar' });
                                            this.navCtrl.popToRoot();
                                        }
                                        else {
                                            this.navCtrl.setRoot(BioPage, { u_type: 'f', photo_type: 'Avatar' });
                                            this.navCtrl.popToRoot();
                                        }
                                    }
                                    else {
                                        this.newAlert("Error", data.reason);
                                    }
                                }, err => {
                                    u_loader.dismiss();
                                    this.newAlert("Connection Error", err.message);
                                });
                            }
                        }, err => {
                            u_loader.dismiss();
                            this.newAlert("Connection Error", err.message);
                        });
                    }
                }, err => {
                    u_loader.dismiss();
                    this.newAlert("Connection Error", err.message);
                });
            }
            else {
                this.newAlert("Password Mismatch", "Your passwords do not match");
            }
        }
        else {
            this.newAlert("Incomplete Details", "All fields are required");
        }
    }

    checkUsername() {
        let wsp = /^\s*$/;
        if (!wsp.test(this.username)) {
            this.signupProv.u_check(this.username).subscribe((data) => {
                if (data.found) {
                    this.newAlert("Username in Use", "A user exists with that username. Please choose another");
                }
            });
        }
    }

    checkEmail() {
        let wsp = /^\s*$/;
        if (!wsp.test(this.email)) {
            this.signupProv.e_check(this.email).subscribe(data => {
                if (data.found) {
                    this.newAlert("Invalid Email", "A user exists with that email address. Please choose another");
                }
            });
        }
    }

    newAlert(title: string, text: string){
        let newAl = this.alCtrl.create({
            title: title,
            subTitle: text,
            buttons: ['Ok']
        });

        return newAl.present();
    }
}
