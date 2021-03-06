import { Component } from '@angular/core';
import { App, IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Socket } from 'ngx-socket-io';

import { LogoutProvider } from "../../providers/logout/logout";

import { SigninPage } from "../signin/signin";
import { SettingsProvider } from '../../providers/settings/settings';

@IonicPage()
@Component({
    selector: 'page-o-settings',
    templateUrl: 'o-settings.html',
})
export class OSettingsPage {
    item: object;
    bio: string;
    name: string;
    username: string;
    email: string;
    c_email: string;
    password: string = '';
    n_pass: string = '';
    c_pass: string = '';
    verification: string;
    errOc: boolean = false;

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

    refresh(){
        this.load();
    }

    ionViewDidLoad() {

    }
    
    load(){
        let ld1 = this.ldCtrl.create({
            content: "Loading your Settings"
        });
        ld1.present();
        this.settingsProv.render().subscribe(data => {
            this.errOc = false;
            ld1.dismiss();
            if(data.success){
                this.item = data.item;
                let user = data.item.user;
                this.name = user.name;
                this.bio = user.bio;
                this.username = user.username;
                this.email = user.email;
                this.c_email = user.pub_email;
                this.verification = user.verification.id;
            }
            else {
                this.newAlert("Account Error", data.reason);
            }
        }, () => {
            ld1.dismiss();
            this.errOc = true;
            this.newAlert("Connection Error", "Please check your connection");
        });
    }

    validate(){
        let wsp = /^\s*$/;
        let test = (text: any)=>{
            return wsp.test(text);
        }

        if(test(this.name) || test(this.username) || test(this.email) || test(this.c_email)){
            this.newAlert("Invalid Info", "Name, Username and both email addresses must be provided");
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
        this.settingsProv.update_o(this.bio, this.name, this.username, this.email, this.c_email, this.password, this.n_pass, this.verification).subscribe((data)=>{
            ld2.dismiss();
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
                    this.socket.emit('changed_profile', this.username);
                }
            }
            else {
                this.newAlert("Update Info", data.reason);
            }
        }, ()=>{
            ld2.dismiss();
            this.newAlert("Connection Error", "Please check your connection");
        });
    }

    logout() {
        this.logProv.logout().subscribe(data => {
            if (data.success) {
                this.app.getRootNav().setRoot(SigninPage);
                this.navCtrl.popToRoot();
            }
            else {
                this.newAlert("Logout Error", "Something went wrong while logging you out. Please restart the app");
            }
        }, () => {
            this.newAlert("Connection Error", "Please check your connection");
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
