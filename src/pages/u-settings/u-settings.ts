import { Component } from '@angular/core';
import { App, IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';

import { LogoutProvider } from "../../providers/logout/logout";

import { SigninPage } from "../signin/signin";
import { SettingsProvider } from '../../providers/settings/settings';
import { SignupProvider } from '../../providers/signup/signup';

@IonicPage()
@Component({
    selector: 'page-u-settings',
    templateUrl: 'u-settings.html',
})
export class USettingsPage {
    bio: string;
    f_name: string;
    username: string;
    email: string;
    password: string = '';
    n_pass: string = '';
    c_pass: string = '';
    gender: string;
    u_state: string;
    curr_state: string;
    fed_const: string;
    sen_dist: string;
    fed_code: string;
    sen_code: string;
    fed_consts: Array<object>;
    sen_dists: Array<object>;
    states: Array<object>;
    item: object;
    notif: string;
    btnColor: string = 'light';

    constructor(
        public navCtrl: NavController,
        public app: App,
        public navParams: NavParams,
        private ldCtrl: LoadingController,
        private logProv: LogoutProvider,
        private settingsProv: SettingsProvider,
        private signupProv: SignupProvider,
        private alCtrl: AlertController
    ) {
        this.load();
    }

    ionViewDidLoad() {

    }

    load() {
        let ld1 = this.ldCtrl.create({
            content: "Loading your Settings"
        });
        ld1.present();
        this.settingsProv.render().subscribe(data => {
            ld1.dismiss();
            if (data.success) {
                let item = data.item;
                let user = data.item.user;
                this.bio = user.bio;
                this.f_name = user.f_name;
                this.username = user.username;
                this.email = user.email;
                this.gender = user.gender;
                this.u_state = user.state_code;
                this.curr_state = user.state_code;
                this.fed_const = item.fed_const_code;
                this.sen_dist = item.sen_dist_code;
                this.states = item.states;
                this.fed_consts = item.fed_consts;
                this.sen_dists = item.sen_dists;
                if (item.notif) {
                    this.newAlert("Notification", item.notif);
                }
                this.item = item;
            }
            else {
                this.newAlert("Account Error", data.reason);
            }
        }, (err) => {
            ld1.dismiss();
            this.newAlert("Connection Error", err.message);
        });
    }

    reloadDists(key) {
        if (key !== this.curr_state) {
            this.fed_const = '';
            this.sen_dist = '';
            let ld2 = this.ldCtrl.create({ content: "Loading Districts" });
            ld2.present();
            this.signupProv.load_districts(key).subscribe(data => {
                ld2.dismiss();
                if (data.success) {
                    this.curr_state = key;
                    this.fed_consts = data.item.fed_consts;
                    this.sen_dists = data.item.sen_dists;
                }
                else {
                    this.u_state = this.curr_state;
                    this.newAlert("State Error", data.reason);
                }
            }, (err) => {
                this.u_state = this.curr_state;
                ld2.dismiss();
                this.newAlert("Connection Error", err.message);
            });
        }
    }

    validate(){
        let wsp = /^\s*$/;
        let test = (text: any)=>{
            return wsp.test(text);
        }
        if(test(this.f_name) || test(this.username) || test(this.email)){
            this.newAlert("Invalid Info", "First Name, Username and Email must be provided");
        }
        else if(!test(this.password)){
            if((test(this.n_pass))){
                this.newAlert("Invalid Info", "You must provide a new password");
            }
            else if(this.n_pass !== this.c_pass){
                this.newAlert("Invalid Info", "Your new passwords do not match");
            }
            else {
                this.val_2();
            }
        }
        else{
            this.val_2();
        }
    }

    val_2(){
        let wsp = /^\s*$/;
        let test = (text: any)=>{
            return wsp.test(text);
        }
        if(test(this.gender) || test(this.u_state) || test(this.fed_const) || test(this.sen_dist)){
            this.newAlert("Invalid Info", "Gender, State and Districts must be selected");
        }
        else {
            this.update();
        }
    }

    update(){
        let ld3 = this.ldCtrl.create({content: "Updating Information"});
        ld3.present();
        this.settingsProv.update_u(this.bio, this.f_name, this.username, this.email, this.password, this.n_pass, this.u_state, this.fed_const, this.sen_dist, this.gender).subscribe(data =>{
            ld3.dismiss();
            if(data.success){
                this.password = '';
                this.n_pass = '';
                this.c_pass = '';
                if(data.logout){
                    this.newAlert("Updated", "Update successful! However, you would have to log in once more because you changed your username");
                    this.logout();
                }
                else {
                    this.newAlert("Updated", "Update successful!");
                }
            }
            else {
                this.newAlert("Update Info", data.reason);
            }
        }, (err)=>{
            ld3.dismiss();
            this.newAlert("Connection Error", err.message);
        });
    }

    logout() {
        this.logProv.logout().subscribe(data => {
            if (data.success) {
                this.app.getRootNav().setRoot(SigninPage);
                this.navCtrl.popToRoot();
            }
            else {
                this.newAlert("Internal Error", "Something went wrong while logging you out. Please restart the app");
            }
        }, (err) => {
            this.newAlert("Connection Error", err.message);
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
