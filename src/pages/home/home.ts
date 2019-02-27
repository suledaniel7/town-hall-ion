import { Component } from '@angular/core';
import { NavController, AlertController, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

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
import { OrgBeatSelPage } from '../org-beat-sel/org-beat-sel';

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
        private signedIn: SignedInProvider,
        private alCtrl: AlertController,
        private mdCtrl: ModalController,
        private storage: Storage
    ) {
        this.preload();
    }

    refresh() {
        this.preload();
    }

    preload() {
        this.storage.get('signed_in').then((val) => {
            let signed_in = JSON.parse(val);
            if (signed_in) {
                if (signed_in.status) {
                    let u_type = signed_in.u_type;
                    if (u_type === 'u') {
                        this.navCtrl.setRoot(UsersPage);
                        this.navCtrl.popToRoot();
                    }
                    else if (u_type === 'j') {
                        this.navCtrl.setRoot(JournalistsPage);
                        this.navCtrl.popToRoot();
                    }
                    else if (u_type === 'l') {
                        this.navCtrl.setRoot(LegislatorsPage);
                        this.navCtrl.popToRoot();
                    }
                    else if (u_type === 'o') {
                        this.navCtrl.setRoot(OrganisationsPage);
                        this.navCtrl.popToRoot();
                    }
                    else if (u_type === 'f') {
                        this.navCtrl.setRoot(FreelancersPage);
                        this.navCtrl.popToRoot();
                    }
                    else {
                        this.load();
                    }
                }
                else {
                    this.load();
                }
            }
            else {
                this.load();
            }
        }).catch(err => {
            this.newAlert("Error", err);
        });

    }

    load() {
        this.signedIn.isSignedIn().subscribe(data => {
            this.errOc = false;
            if (data.active) {
                let u_type = data.u_type;
                if (u_type == 'u') {
                    this.navCtrl.setRoot(UsersPage);
                }
                else if (u_type == 'j') {
                    this.profProv.j_profile_v().subscribe(data => {
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
                    this.profProv.o_profile_r().subscribe(data => {
                        if (data.success) {
                            if (data.pending) {
                                //set to req
                                let md1 = this.mdCtrl.create(OrgBeatSelPage, { f_name: data.journo.f_name, l_name: data.journo.l_name, username: data.journo.username, o_username: data.user.username });

                                md1.present();
                                md1.onDidDismiss((success) => {
                                    if (success) {
                                        this.navCtrl.setRoot(OrganisationsPage);
                                    }
                                    else {
                                        this.newAlert("Error", "An error occured. Please try again");
                                    }
                                });
                            }
                            else {
                                this.navCtrl.setRoot(OrganisationsPage);
                            }
                        }
                    });
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
                this.navCtrl.setRoot(SigninPage);
                this.navCtrl.popToRoot();
            }
        }, () => {
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
