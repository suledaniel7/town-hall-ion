import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, App } from 'ionic-angular';
import { Socket } from "ngx-socket-io";

import { JAccountProvider } from '../../providers/j-account/j-account';
import { LogoutProvider } from "../../providers/logout/logout";

import { JournalistsPage } from '../journalists/journalists';
import { SigninPage } from '../signin/signin';

@IonicPage()
@Component({
    selector: 'page-j-org-sel',
    templateUrl: 'j-org-sel.html',
})
export class JOrgSelPage {
    selOrg: any = '';
    item: any;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public app: App,
        private jAcProv: JAccountProvider,
        private alertCtrl: AlertController,
        private ldCtrl: LoadingController,
        private logProv: LogoutProvider,
        private socket: Socket
    ) {
        let ld1 = this.ldCtrl.create({
            content: "Loading Town Hall Organisations..."
        });

        ld1.present();
        this.jAcProv.j_org_render().subscribe(data => {
            ld1.dismiss();
            if (data.success) {
                this.item = data.item;
            }
            else {
                this.newAlert("Error", data.reason);
            }
        }, err => {
            ld1.dismiss();
            this.newAlert("Connection Error", err.message);
        });
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad JOrgSelPage');
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

    confirm(o_name, o_username) {
        let conf_alert = this.alertCtrl.create({
            title: "Send Journalist Request to " + o_name + "?",
            message: "Do you want to send your Journalist Request to " + o_name + "? This action cannot be undone.",
            buttons: [
                {
                    text: "No"
                },
                {
                    text: "Yes",
                    handler: () => {
                        this.selectOrg(o_username);
                    }
                }
            ]
        });

        conf_alert.present();
    }

    selectOrg(username) {
        let ld2 = this.ldCtrl.create({
            content: "Sending Request..."
        });

        ld2.present();
        this.jAcProv.j_org_sub(username).subscribe(data => {
            ld2.dismiss();
            if (data.success) {
                this.socket.emit('j_request', {username: data.username});
                this.navCtrl.setRoot(JournalistsPage);
                this.navCtrl.popToRoot();
            }
            else {
                this.newAlert("Error", data.reason);
            }
        }, err => {
            ld2.dismiss();
            this.newAlert("Connection Error", err.message);
        });
    }

    newAlert(title: string, text: string){
        let newAl = this.alertCtrl.create({
            title: title,
            subTitle: text,
            buttons: ['Ok']
        });

        return newAl.present();
    }
}
