import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Socket } from 'ngx-socket-io';

import { SignupProvider } from "../../providers/signup/signup";

import { BioPage } from '../bio/bio';
import { SignupPage } from '../signup/signup';

@IonicPage()
@Component({
    selector: 'page-u-signup',
    templateUrl: 'u-signup.html',
})
export class USignupPage {
    statesLoaded: boolean = false;
    districtsLoading: boolean = false;
    districtsLoaded: boolean = false;
    stateSel: any;
    item: any;
    districts: any;
    auto: boolean = false;

    //validation info
    f_name: any = '';
    username: any = '';
    email: any = '';
    password: any = '';
    pass1: any = '';
    gender: any = 'f';
    u_state: any = '';
    sen_dist: any = '';
    fed_const: any = '';
    v_id: any = '';

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private signupProv: SignupProvider,
        private ldCtrl: LoadingController,
        private alCtrl: AlertController,
        private socket: Socket,
        private storage: Storage
    ) {
        this.auto = this.navParams.get('auto');
        this.load_states();
    }

    ionViewDidLoad() {
    }

    back(){
        this.navCtrl.insert(this.navCtrl.length() - 1, SignupPage);
        this.navCtrl.pop();
    }

    load_states() {
        let s_loader = this.ldCtrl.create({
            content: "Loading States..."
        });

        s_loader.present();
        this.signupProv.load_states().subscribe(data => {
            s_loader.dismiss();
            if (data.success) {
                this.item = data.item;
                this.statesLoaded = true;
            }
        }, () => {
            s_loader.dismiss();
            this.newAlert("Error", "Please check your connection");
        });
    }

    load_districts(key) {
        let d_loader = this.ldCtrl.create({
            content: "Loading Districts..."
        });

        d_loader.present();
        this.districtsLoading = true;
        this.signupProv.load_districts(key).subscribe(data => {
            d_loader.dismiss();
            this.districts = data.item;
            this.districtsLoading = false;
            this.districtsLoaded = true;
        }, () => {
            d_loader.dismiss();
            this.newAlert("Error", "Please check your connection");
        });
    }

    validate() {
        let wsp = /^\s*$/;
        if (!wsp.test(this.f_name) && !wsp.test(this.username) && !wsp.test(this.email) && !wsp.test(this.password) && !wsp.test(this.pass1) && !wsp.test(this.gender) && !wsp.test(this.fed_const) && !wsp.test(this.sen_dist) && !wsp.test(this.v_id)) {
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
                                this.signupProv.i_check(this.v_id).subscribe(dataV=>{
                                    if(dataV.found){
                                        u_loader.dismiss();
                                        this.newAlert("Voter ID in Use", "A user exists with that Voter ID. Please enter yours accurately");
                                    }
                                    else {
                                        this.signupProv.signup_u(this.f_name, this.username, this.email, this.password, this.gender, this.sen_dist, this.fed_const).subscribe(resp => {
                                            u_loader.dismiss();
                                            if (resp.success) {
                                                this.socket.emit('changed_profile', this.sen_dist);
                                                this.socket.emit('changed_profile', this.fed_const);
                                                this.storage.set('signed_in', JSON.stringify({ status: true, u_type: 'j' })).then(() => {
                                                    this.navCtrl.setRoot(BioPage, { u_type: 'u', photo_type: 'Avatar' });
                                                    this.navCtrl.popToRoot();
                                                }).catch(err => {
                                                    this.newAlert("Error", err);
                                                    this.navCtrl.setRoot(BioPage, { u_type: 'u', photo_type: 'Avatar' });
                                                    this.navCtrl.popToRoot();
                                                });
                                            }
                                            else {
                                                this.newAlert("Signup Error", resp.reason);
                                            }
                                        }, () => {
                                            u_loader.dismiss();
                                            this.newAlert("Connection Error", "Please check your connection");
                                        });
                                    }
                                }, ()=>{
                                    u_loader.dismiss();
                                    this.newAlert("Connection Error", "Please check your connection");
                                })
                            }
                        }, () => {
                            u_loader.dismiss();
                            this.newAlert("Connection Error", "Please check your connection");
                        });
                    }
                }, () => {
                    u_loader.dismiss();
                    this.newAlert("Connection Error", "Please check your connection");
                });
            }
            else {
                this.newAlert("Password Mismatch", "Your passwords do not match");
            }
        }
        else {
            this.newAlert("Incomplete Data", "All fields are required");
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

    checkVId(){
        let wsp = /^\s*$/;
        if(!wsp.test(this.v_id)){
            this.signupProv.i_check(this.v_id).subscribe(data => {
                if(data.found){
                    this.newAlert("Voter ID in Use", "A user exists with that Voter ID. Please enter yours accurately");
                }
            });
        }
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
