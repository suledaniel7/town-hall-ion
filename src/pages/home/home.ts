import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';

import { SignedInProvider } from "../../providers/signed-in/signed-in";
import { ProfileProvider } from '../../providers/profile/profile';

import { SigninPage } from '../signin/signin';
import { UsersPage } from "../users/users";
import { JBeatSelPage } from "../j-beat-sel/j-beat-sel";
import { JOrgSelPage } from "../j-org-sel/j-org-sel";
import { FreelancersPage } from "../freelancers/freelancers";
import { JournalistsPage } from "../journalists/journalists";
import { OrganisationsPage } from "../organisations/organisations";
import { LegislatorsPage } from "../legislators/legislators";

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    err: string = '';
    errOc: boolean = false;

    constructor(
        public navCtrl: NavController,
        private profProv: ProfileProvider,
        private ldCtrl: LoadingController,
        private signedIn: SignedInProvider,
        private alCtrl: AlertController
    ) {
        this.load();
    }

    refresh(){
        this.load();
    }

    load() {
        let loader = this.ldCtrl.create({
            showBackdrop: true,
            content: "Please wait...",
        });

        loader.present();

        this.signedIn.isSignedIn().subscribe(data => {
            this.errOc = false;
            if (data.active) {
                loader.dismiss();
                let u_type = data.u_type;
                if (u_type == 'u') {
                    this.navCtrl.setRoot(UsersPage);
                }
                else if (u_type == 'j') {
                    //check if acc is complete. In near-prod, don't localstorage.signedIn until has selected.
                    //in fact, add a third parameter telling localstorage what page to go to... well, a second, I guess
                    let u_loader = this.ldCtrl.create({
                        content: "Verifying Account Status"
                    });

                    u_loader.present();
                    this.profProv.j_profile_v().subscribe(data => {
                        u_loader.dismiss();
                        if (data.complete) {
                            if (data.redirectTo == 'm') {
                                this.navCtrl.setRoot(JournalistsPage);
                            }
                            else {
                                this.navCtrl.setRoot(FreelancersPage);
                            }
                        }
                        else {
                            if (data.redirectTo == 'm') {
                                this.navCtrl.setRoot(JOrgSelPage);
                            }
                            else {
                                this.navCtrl.setRoot(JBeatSelPage);
                            }
                        }
                    });
                }
                else if (u_type == 'o') {
                    this.navCtrl.setRoot(OrganisationsPage);
                }
                else if (u_type == 'l') {
                    this.navCtrl.setRoot(LegislatorsPage);
                }
                else {
                    this.newAlert("Invalid Details", "Invalid Data Type Provided");
                }
                this.navCtrl.popToRoot();
            }
            else {
                loader.dismiss();
                this.navCtrl.setRoot(SigninPage);
                this.navCtrl.popToRoot();
            }
        }, () => {
            loader.dismiss();
            this.errOc = true;
            this.err = "Connection Error";
        });
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
