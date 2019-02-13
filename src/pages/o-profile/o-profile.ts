import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController } from 'ionic-angular';
import { Socket } from 'ngx-socket-io';

import { ProfileProvider } from "../../providers/profile/profile";
import { AddressProvider } from '../../providers/address/address';

import { OCommsPage } from "../o-comms/o-comms";
import { SettingsPage } from '../settings/settings';
import { FollowersPage } from '../followers/followers';

@IonicPage()
@Component({
    selector: 'page-o-profile',
    templateUrl: 'o-profile.html',
})
export class OProfilePage {
    item: any;
    user: any;
    messages: any;
    errOcc = false;
    imgAddress: string;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private profProv: ProfileProvider,
        public address: AddressProvider,
        private alCtrl: AlertController,
        private mdCtrl: ModalController,
        private socket: Socket
    ) {
        this.imgAddress = this.address.getImageApi();
        this.load();
    }

    prepend(msg: any){
        if(this.item){
            if(this.item.messages){
                let p_msgs = this.item.messages;
                let c_msgs = [msg];
                this.item.messages = c_msgs.concat(p_msgs);
            }
        }
    }

    reload(newUserDets: any){
        if(this.item){
            this.item.user = newUserDets;
        }
    }

    load() {
        this.profProv.o_profile_p().subscribe(data => {
            if (data.success) {
                this.item = data.item;
                this.user = data.item.user;
                this.messages = data.item.messages;
                this.errOcc = false;
                this.socket.emit('conn', {username: data.item.user.username});
                this.socket.on('self_message', (message: any)=>{
                    this.prepend(message);
                });
                this.socket.on('profile_changed', (ret_d: any)=>{
                    this.reload(ret_d.newUser);
                });
            }
            else {
                this.errOcc = true;
                this.newAlert("Error", data.reason);
            }
        }, err => {
            this.errOcc = true;
            this.newAlert("Connection Error", err.message);
        });
    }

    ionViewDidLoad() {

    }

    compose() {
        let md1 = this.mdCtrl.create(OCommsPage);
        md1.onDidDismiss((data)=>{
            if(data.success){
                this.socket.emit('message_sent', { username: data.username, timestamp: data.timestamp, beats: data.beats});
                this.socket.emit('changed_profile', data.timestamp);
            }
        });
        md1.present();
    }

    settings() {
        this.navCtrl.push(SettingsPage, { u_type: 'o' });
    }

    followers() {
        if (this.user.username) {
            this.navCtrl.push(FollowersPage, { username: this.user.username });
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
