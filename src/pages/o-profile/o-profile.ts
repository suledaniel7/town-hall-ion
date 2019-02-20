import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController, LoadingController } from 'ionic-angular';
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
    imgAddress: string;
    exp: string;
    plur1Text: string = "Journalists";
    plur2Text: string = "Followers";
    errOc: boolean = false;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private profProv: ProfileProvider,
        public address: AddressProvider,
        private alCtrl: AlertController,
        private mdCtrl: ModalController,
        private ldCtrl: LoadingController,
        private socket: Socket
    ) {
        this.imgAddress = this.address.getImageApi();
        this.load();
    }

    refresh(){
        this.load();
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
                let jCount = this.item.user.journo_num;
                if (jCount === 1) {
                    this.plur1Text = "Journalist";
                }
                else {
                    this.plur1Text = "Journalists";
                }
            }
        }
        if (this.item) {
            if (this.item.user) {
                let fCount = this.item.user.followersNo;
                if (fCount === 1) {
                    this.plur2Text = "Follower";
                }
                else {
                    this.plur2Text = "Followers";
                }
            }
        }
    }

    reload(newUserDets: any) {
        if (this.item) {
            this.item.user = newUserDets.user;
            this.plurals();
            this.checkMsgs();
        }
    }

    load() {
        let ld1 = this.ldCtrl.create({content: "Loading Profile Info"});
        ld1.present();
        this.profProv.o_profile_p().subscribe(data => {
            this.errOc = false;
            ld1.dismiss();
            if (data.success) {
                this.item = data.item;
                this.plurals();
                this.checkMsgs();
                this.user = data.item.user;
                this.messages = data.item.messages;
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
            ld1.dismiss();
            this.errOc = true;
            this.newAlert("Connection Error", "Please check your connection");
        });
    }

    ionViewDidLoad() {

    }

    compose() {
        let md1 = this.mdCtrl.create(OCommsPage);
        md1.onDidDismiss((data) => {
            if (data.success) {
                this.socket.emit('message_sent', { username: data.username, timestamp: data.timestamp, beats: data.beats });
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
