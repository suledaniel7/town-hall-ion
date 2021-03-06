import { Component } from '@angular/core';
import { App, IonicPage, NavController, NavParams, LoadingController, AlertController, ModalController } from 'ionic-angular';
import { Socket } from 'ngx-socket-io';

import { LogoutProvider } from "../../providers/logout/logout";
import { SettingsProvider } from '../../providers/settings/settings';

import { SigninPage } from "../signin/signin";
import { ChangeBeatPage } from '../change-beat/change-beat';

@IonicPage()
@Component({
    selector: 'page-j-settings',
    templateUrl: 'j-settings.html',
})
export class JSettingsPage {
    bio: string;
    f_name: string;
    l_name: string;
    username: string;
    email: string;
    password: string = '';
    n_pass: string = '';
    c_pass: string = '';
    init_org: string;
    org: string;
    beat: string;
    item: object;
    notif: string;
    errOc: boolean = false;

    constructor(
        public navCtrl: NavController,
        public app: App,
        public navParams: NavParams,
        private ldCtrl: LoadingController,
        private settingsProv: SettingsProvider,
        private logProv: LogoutProvider,
        private alCtrl: AlertController,
        private mdCtrl: ModalController,
        private socket: Socket
    ) {
        this.load();
    }

    refresh(){
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
            this.errOc = false;
            ld1.dismiss();
            if (data.success) {
                let item = data.item;
                let user = data.item.user;
                this.bio = user.bio;
                this.f_name = user.f_name;
                this.l_name = user.l_name;
                this.username = user.username;
                this.email = user.email;
                if(item.formal){
                    this.org = user.organisation;
                    this.init_org = user.organisation;
                }
                else {
                    this.beat = user.beat;
                }
                this.item = data.item;
                
                if (item.notif) {
                    this.newAlert("Notification", item.notif);
                }
            }
            else {
                this.newAlert("Account Error", data.reason);
            }
        }, () => {
            this.errOc = true;
            ld1.dismiss();
            this.newAlert("Connection Error", "Please check your connection");
        });
    }

    changeBeat(){
        let bPage = this.mdCtrl.create(ChangeBeatPage, {dist: this.beat});
        bPage.onDidDismiss((data)=>{
            let dist = data.district;
            this.beat = dist;
        });
        bPage.present();
    }

    validate(){
        let wsp = /^\s*$/;
        let test = (text: any)=>{
            return wsp.test(text);
        }
        if(test(this.f_name) || test(this.l_name) || test(this.username) || test(this.email) || test(this.beat)){
            this.newAlert("Invalid Info", "First Name, Last Name, Username and Email Address must be provided");
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
        else {
            this.update();
        }
    }

    update(){
        let ld2 = this.ldCtrl.create({content: "Updating Information"});
        ld2.present();
        this.settingsProv.update_j(this.bio, this.f_name, this.l_name, this.username, this.email, this.password, this.n_pass, this.org, this.beat).subscribe((data)=>{
            ld2.dismiss();
            if(data.success){
                if(data.ch_org){
                    this.socket.emit('ch_org', {username: this.username, org: this.org, init_org: this.init_org});
                    this.init_org = this.org;
                    this.socket.emit('recompile', {username: this.username});
                    this.socket.emit('recompile', {username: this.init_org});
                }
                if(data.ch_beat){
                    this.socket.emit('recompile', {username: this.username});
                }
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
                    if(this.org){
                        if(this.org !== this.init_org){
                            this.socket.emit('changed_profile', this.init_org);
                        }
                    }
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
                this.newAlert("Internal Error", "Something went wrong while logging you out. Please restart the app");
            }
        }, () => {
            this.newAlert("Connection Error", "Please check your connection");
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
