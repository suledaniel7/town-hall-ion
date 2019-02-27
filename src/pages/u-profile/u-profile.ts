import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Socket } from 'ngx-socket-io';

import { ProfileProvider } from "../../providers/profile/profile";
import { AddressProvider } from '../../providers/address/address';

import { LRenderPage } from '../l-render/l-render';
import { SettingsPage } from '../settings/settings';
import { ChatsPage } from '../chats/chats';

@IonicPage()
@Component({
    selector: 'page-u-profile',
    templateUrl: 'u-profile.html',
})
export class UProfilePage {
    item: any;
    imgAddress: string;
    errOc: boolean = false;

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

    refresh(){
        this.load();
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad UProfilePage');
    }

    reload(newUserDets: any){
        if(this.item){
            this.item.user = newUserDets.user;
            this.item.rep = newUserDets.rep;
            this.item.sen = newUserDets.sen;
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
            this.errOc = false;
            if (data.success) {
                loader.dismiss();
                this.item = data.item;
                this.socket.on('profile_changed', (ret_d: any)=>{
                    this.reload(ret_d.newUser);
                });
            }
            else {
                loader.dismiss();
                this.newAlert("Error Loading Info", data.reason);
            }
        }, () => {
            loader.dismiss();
            this.errOc = true;
            this.newAlert("Connection Error", "Please check your connection");
        });
    }

    profile(code) {
        this.navCtrl.push(LRenderPage, { code: code });
    }

    settings() {
        this.navCtrl.push(SettingsPage, {u_type: 'u'});
    }

    dms(){
        this.navCtrl.push(ChatsPage);
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
