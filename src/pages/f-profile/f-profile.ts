import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController } from 'ionic-angular';
import { Socket } from 'ngx-socket-io';

import { ProfileProvider } from '../../providers/profile/profile';
import { AddressProvider } from '../../providers/address/address';

import { JCommsPage } from "../j-comms/j-comms";
import { SettingsPage } from '../settings/settings';
import { FollowersPage } from '../followers/followers';

@IonicPage()
@Component({
    selector: 'page-f-profile',
    templateUrl: 'f-profile.html',
})
export class FProfilePage {
    item: any;
    imgAddress: string;

    constructor(public navCtrl: NavController,
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

    ionViewDidLoad() {
        console.log('ionViewDidLoad FProfilePage');
    }

    compose() {
        let md1 = this.mdCtrl.create(JCommsPage);
        md1.onDidDismiss((data)=>{
            if(data.success){
                this.socket.emit('message_sent', { username: data.username, timestamp: data.timestamp, beats: data.beats});
                this.socket.emit('changed_profile', data.timestamp);
            }
        });
        md1.present();
    }

    settings() {
        this.navCtrl.push(SettingsPage, {u_type: 'j'});
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
        this.profProv.j_profile_p().subscribe(data => {
            if (data.success) {
                this.item = data.item;
                this.socket.on('self_message', (message: any)=>{
                    this.prepend(message);
                });
                this.socket.on('profile_changed', (ret_d: any)=>{
                    this.reload(ret_d.newUser);
                });
            }
            else {
                this.newAlert("Error", data.reason);
            }
        }, err => {
            this.newAlert("Communication Error", err.message);
        });
    }

    followers() {
        if (this.item.user.username) {
            this.navCtrl.push(FollowersPage, { username: this.item.user.username });
        }
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
