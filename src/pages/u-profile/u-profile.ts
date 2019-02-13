import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Socket } from 'ngx-socket-io';

import { ProfileProvider } from "../../providers/profile/profile";
import { AddressProvider } from '../../providers/address/address';

import { LRenderPage } from '../l-render/l-render';
import { SettingsPage } from '../settings/settings';

@IonicPage()
@Component({
    selector: 'page-u-profile',
    templateUrl: 'u-profile.html',
})
export class UProfilePage {
    item: any;
    imgAddress: string;

    constructor(
        public navCtrl: NavController,
        private alertCtrl: AlertController,
        public ldCtrl: LoadingController,
        public navParams: NavParams,
        private profProv: ProfileProvider,
        public address: AddressProvider,
        private socket: Socket
    ) {
        this.imgAddress = this.address.getImageApi();
        this.load();
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad UProfilePage');
    }

    reload(newUserDets: any){
        if(this.item){
            this.item.user = newUserDets;
        }
    }

    load() {
        let loader = this.ldCtrl.create({
            showBackdrop: true,
            content: "Please wait...",
            duration: 5000
        });

        loader.present();

        this.profProv.u_profile_p().subscribe(data => {
            if (data.success) {
                loader.dismiss();
                this.item = data.item;
                this.socket.emit('conn', {username: data.item.user.username});
                this.socket.on('profile_changed', (ret_d: any)=>{
                    this.reload(ret_d.newUser);
                });
            }
            else {
                loader.dismiss();
                this.newAlert("Error Loading Info", data.reason);
            }
        }, (err) => {
            loader.dismiss();
            this.newAlert("Connection Error", err.message);
            let confirmed = false;
            let confirm = this.alertCtrl.create({
                title: "Retry?",
                message: "Should we try again in ten seconds?",
                buttons: [
                    {
                        text: 'Yes',
                        handler: () => {
                            confirmed = true;
                        }
                    },
                    {
                        text: 'No',
                        handler: () => {
                            confirmed = false;
                        }
                    }
                ]
            });
            confirm.present().then(() => {
                if (confirmed) {
                    setTimeout(() => {
                        this.load();
                    }, 10000);
                }
            }).catch((reason) => {
                let al1 = this.alertCtrl.create({
                    message: `An error occured. ${reason}`
                });
                al1.present();
            });
        });
    }

    profile(code) {
        this.navCtrl.push(LRenderPage, { code: code });
    }

    settings() {
        this.navCtrl.push(SettingsPage, {u_type: 'u'});
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
