import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoadingController } from "ionic-angular";

import { SignupProvider } from "../../providers/signup/signup";

import { JBeatSelPage } from "../j-beat-sel/j-beat-sel";
import { JOrgSelPage } from "../j-org-sel/j-org-sel";

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

    constructor(public navCtrl: NavController, public navParams: NavParams, private signupProv: SignupProvider, private ldCtrl: LoadingController) {
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
                        alert("A user exists with that username. Please choose another");
                    }
                    else {
                        this.signupProv.e_check(this.email).subscribe(data1 => {
                            if (data1.found) {
                                u_loader.dismiss();
                                alert("A user exists with that email address. Please choose another");
                            }
                            else {
                                this.signupProv.signup_j(this.f_name, this.l_name, this.username, this.email, this.password, this.ac_type).subscribe(data => {
                                    u_loader.dismiss();
                                    if (data.success) {
                                        if (this.ac_type == 'm') {
                                            this.navCtrl.setRoot(JOrgSelPage);
                                            this.navCtrl.popToRoot();
                                        }
                                        else {
                                            this.navCtrl.setRoot(JBeatSelPage);
                                            this.navCtrl.popToRoot();
                                        }
                                    }
                                    else {
                                        alert("An error occured during signup. Error: " + data.reason);
                                    }
                                }, err => {
                                    u_loader.dismiss();
                                    alert("An error occured during signup. Please check your connection. Error: " + err.message);
                                });
                            }
                        });
                    }
                });
            }
            else {
                alert("Your passwords do not match");
            }
        }
        else {
            alert("All fields are required");
        }
    }

    checkUsername() {
        let wsp = /^\s*$/;
        if (!wsp.test(this.username)) {
            this.signupProv.u_check(this.username).subscribe((data) => {
                if (data.found) {
                    alert("A user exists with that username. Please choose another");
                }
            });
        }
    }

    checkEmail() {
        let wsp = /^\s*$/;
        if (!wsp.test(this.email)) {
            this.signupProv.e_check(this.email).subscribe(data => {
                if (data.found) {
                    alert("A user exists with that email address. Please choose another");
                }
            });
        }
    }
}
