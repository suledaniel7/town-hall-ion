import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoadingController } from "ionic-angular";

import { SignupProvider } from "../../providers/signup/signup";

import { UsersPage } from '../users/users';

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


    constructor(public navCtrl: NavController, public navParams: NavParams, private signupProv: SignupProvider, private ldCtrl: LoadingController) {
        this.load_states();
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad USignupPage');
    }

    load_states(){
        let s_loader = this.ldCtrl.create({
            content: "Loading States..."
        });

        s_loader.present();
        this.signupProv.load_states().subscribe(data => {
            if(data.success){
                s_loader.dismiss();
                this.item = data.item;
                this.statesLoaded = true;
            }
        }, err => {
            alert("An error occured. Error: "+err.message);
        });
    }

    load_districts(key){
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
        });
    }

    validate(){
        let wsp = /^\s*$/;
        if(!wsp.test(this.f_name) && !wsp.test(this.username) && !wsp.test(this.email) && !wsp.test(this.password) && !wsp.test(this.pass1) && !wsp.test(this.gender) && !wsp.test(this.fed_const) && !wsp.test(this.sen_dist)){
            if(this.password == this.pass1){
                let u_loader = this.ldCtrl.create({
                    content: "Creating Account..."
                });

                u_loader.present();

                this.signupProv.u_check(this.username).subscribe(data => {
                    if(data.found){
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
                                this.signupProv.signup_u(this.f_name, this.username, this.email, this.password, this.gender, this.sen_dist, this.fed_const).subscribe(resp => {
                                    u_loader.dismiss();
                                    if(resp.success){
                                        this.navCtrl.setRoot(UsersPage);
                                        this.navCtrl.popToRoot();
                                    }
                                    else {
                                        alert(resp.reason);
                                    }
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
