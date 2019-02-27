import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ModalController } from 'ionic-angular';
import { Socket } from 'ngx-socket-io';

import { ProfileProvider } from "../../providers/profile/profile";
import { AddressProvider } from '../../providers/address/address';

import { LCommsPage } from '../l-comms/l-comms';
import { SettingsPage } from '../settings/settings';
import { FollowersPage } from '../followers/followers';
import { ChatsPage } from '../chats/chats';

@IonicPage()
@Component({
    selector: 'page-l-profile',
    templateUrl: 'l-profile.html',
})
export class LProfilePage {
    item: any;
    imgAddress: string;
    exp: string;
    plur1Text: string = "Followers";
    plur2Text: string = "Constituents";
    errOc: boolean = false;

    constructor(
        public navCtrl: NavController,
        private alertCtrl: AlertController,
        private ldCtrl: LoadingController,
        public navParams: NavParams,
        private profileProv: ProfileProvider,
        public address: AddressProvider,
        private mdCtrl: ModalController,
        private socket: Socket
    ) {
        this.imgAddress = this.address.getImageApi();
        this.load();
    }

    refresh(){
        this.load();
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad LProfilePage');
    }

    prepend(msg: any) {
        if (this.item) {
            if (this.item.messages) {
                let p_msgs = this.item.messages;
                let c_msgs = [msg];
                this.item.messages = c_msgs.concat(p_msgs);
                this.plurals();
                this.checkMsgs();
            }
        }
    }

    checkMsgs() {
        if (this.item) {
            if (this.item.messages) {
                let len = this.item.messages.length;
                if (len > 0) {
                    this.exp = null;
                }
                else {
                    this.exp = "You have not created any Town Hall posts. Compose a post using the + icon in the lower right-hand corner of your device.";
                }
            }
            else {
                this.exp = "You have not created any Town Hall posts. Compose a post using the + icon in the lower right-hand corner of your device.";
            }
        }
        else {
            this.exp = "You have not created any Town Hall posts. Compose a post using the + icon in the lower right-hand corner of your device.";
        }
    }

    plurals() {
        if (this.item) {
            if (this.item.user) {
                let fCount = this.item.user.followersNo;
                if (fCount === 1) {
                    this.plur1Text = "Follower";
                }
                else {
                    this.plur1Text = "Followers";
                }
            }
        }
        if (this.item) {
            if (this.item.user) {
                let mCount = this.item.user.const_num;
                if (mCount === 1) {
                    this.plur2Text = "Constituent";
                }
                else {
                    this.plur2Text = "Constituents";
                }
            }
        }
    }

    reload(newUserDets: any) {
        if (this.item) {
            this.item.user = newUserDets.user;
            this.item.district = newUserDets.district;
            this.plurals();
            this.checkMsgs();
        }
    }

    load() {
        let loader = this.ldCtrl.create({
            content: "Loading Profile Info",
        });

        loader.present();

        this.profileProv.l_profile_p().subscribe(data => {
            this.errOc = false;
            loader.dismiss();
            if (data.success) {
                this.item = data.item;
                this.plurals();
                this.checkMsgs();
                this.socket.on('self_message', (message: any) => {
                    this.prepend(message);
                });
                this.socket.on('profile_changed', (ret_d: any) => {
                    this.reload(ret_d.newUser);
                });
            }
            else {
                this.newAlert("Error", data.reason);
            }
        }, () => {
            this.errOc = true;
            loader.dismiss();
            this.newAlert("Connection Error", "Please check your connection");
        });
    }

    compose() {
        let md1 = this.mdCtrl.create(LCommsPage);
        md1.onDidDismiss((data) => {
            if (data.success) {
                this.socket.emit('message_sent', { username: data.username, timestamp: data.timestamp, beats: data.beats });
                this.socket.emit('changed_profile', data.timestamp);
            }
        });
        md1.present();
    }

    settings() {
        this.navCtrl.push(SettingsPage, { u_type: 'l' });
    }

    followers() {
        if (this.item.user.code) {
            this.navCtrl.push(FollowersPage, { username: this.item.user.code });
        }
    }

    dms(){
        this.navCtrl.push(ChatsPage);
    }

    newAlert(title: string, text: string) {
        let newAl = this.alertCtrl.create({
            title: title,
            subTitle: text,
            buttons: ['Ok']
        });

        return newAl.present();
    }
}
