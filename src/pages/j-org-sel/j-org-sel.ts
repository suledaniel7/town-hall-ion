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
    r_item: any;
    errOc: boolean = false;

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
        this.load();
    }

    refresh(){
        this.load();
    }

    load(){
        let ld1 = this.ldCtrl.create({
            content: "Loading Town Hall Organisations..."
        });

        ld1.present();
        this.jAcProv.j_org_render().subscribe(data => {
            this.errOc = false;
            ld1.dismiss();
            if (data.success) {
                this.item = data.item;
            }
            else {
                this.newAlert("Error", data.reason);
            }
        }, () => {
            ld1.dismiss();
            this.errOc = true;
            this.newAlert("Connection Error", "Please check your connection");
        });

        this.jAcProv.reason().subscribe(data => {
            if(data.success){
                this.r_item = data.item;
                let tmp_item = data.item;
                if(tmp_item.rejection){
                    if(tmp_item.removed){
                        this.r_item.reason = `You were removed from ${tmp_item.organisation}. Please reapply to another Organisation`;
                    }
                    else {
                        this.r_item.reason = `Your request to ${tmp_item.organisation} was declined. Please apply to another Organisation`;
                    }
                }
            }
            else {
                this.newAlert("Error", data.reason);
            }
        }, () => {
            this.newAlert("Connection Error", "Please check your connection");            
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
        }, () => {
            this.newAlert("Connection Error", "Please check your connection");
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
                this.socket.emit('j_request', {username: data.username, o_username: username});
                this.navCtrl.setRoot(JournalistsPage);
                this.navCtrl.popToRoot();
            }
            else {
                this.newAlert("Error", data.reason);
            }
        }, () => {
            ld2.dismiss();
            this.newAlert("Connection Error", "Please check your connection");
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
