import { Component } from '@angular/core';
import { App, IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { Socket } from 'ngx-socket-io';

import { LogoutProvider } from "../../providers/logout/logout";

import { SigninPage } from "../signin/signin";
import { SettingsProvider } from '../../providers/settings/settings';

@IonicPage()
@Component({
    selector: 'page-l-settings',
    templateUrl: 'l-settings.html',
})
export class LSettingsPage {
    bio: string;
    f_name: string;
    l_name: string;
    email: string;
    password: string = '';
    n_pass: string = '';
    c_pass: string = '';
    gender: string;
    item: any;

    constructor(
        public navCtrl: NavController,
        public app: App,
        public navParams: NavParams,
        private logProv: LogoutProvider,
        private alCtrl: AlertController,
        private ldCtrl: LoadingController,
        private settingsProv: SettingsProvider,
        private socket: Socket
    ) {
        this.load();
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad LSettingsPage');
    }

    load(){
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
                this.l_name = user.l_name;
                this.email = user.email;
                this.gender = user.gender;
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

    validate(){
        let wsp = /^\s*$/;
        let test = (text: any)=>{
            return wsp.test(text);
        }
        if(test(this.f_name) || test(this.l_name) || test(this.email) || test(this.gender)){
            this.newAlert("Invalid Info", "First Name, Last Name, Email Address and Gender are required");
        }
        else if(!test(this.password)){
            if((test(this.n_pass))){
                this.newAlert("Invalid Info", "You must provide a new password");
            }
            else if(this.n_pass !== this.c_pass){
                this.newAlert("Invalid Info", "Your new passwords do not match");
            }
            else {
                this.update();
            }
        }
        else{
            this.update();
        }
    }

    update(){
        let ld2 = this.ldCtrl.create({content: "Updating Information"});
        ld2.present();
        this.settingsProv.update_l(this.bio, this.f_name, this.l_name, this.email, this.password, this.n_pass, this.gender).subscribe(data =>{
            ld2.dismiss();
            if(data.success){
                this.password = '';
                this.n_pass = '';
                this.c_pass = '';
                this.newAlert("Updated", "Update successful!");
                this.socket.emit('changed_profile', this.item.code);
            }
            else {
                this.newAlert("Update Info", data.reason);
            }
        }, (err)=>{
            ld2.dismiss();
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
                this.newAlert("Error", data.reason);
            }
        }, (err) => {
            this.newAlert("Connection Error", err.message);
        });
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
