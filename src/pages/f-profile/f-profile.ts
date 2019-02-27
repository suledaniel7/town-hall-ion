import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController, LoadingController } from 'ionic-angular';
import { Socket } from 'ngx-socket-io';

import { ProfileProvider } from '../../providers/profile/profile';
import { AddressProvider } from '../../providers/address/address';

import { JCommsPage } from "../j-comms/j-comms";
import { SettingsPage } from '../settings/settings';
import { FollowersPage } from '../followers/followers';
import { ChatsPage } from '../chats/chats';

@IonicPage()
@Component({
    selector: 'page-f-profile',
    templateUrl: 'f-profile.html',
})
export class FProfilePage {
    item: any;
    imgAddress: string;
    exp: string;
    plur1Text: string = "Followers";
    plur2Text: string = "Messages";
    errOc: boolean = false;
    

    constructor(public navCtrl: NavController,
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

    ionViewDidLoad() {
        console.log('ionViewDidLoad FProfilePage');
    }

    compose() {
        let md1 = this.mdCtrl.create(JCommsPage);
        md1.onDidDismiss((data) => {
            if (data.success) {
                this.socket.emit('message_sent', { username: data.username, timestamp: data.timestamp, beats: data.beats });
                this.socket.emit('changed_profile', data.timestamp);
            }
        });
        md1.present();
    }

    settings() {
        this.navCtrl.push(SettingsPage, { u_type: 'j' });
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

    reload(newUserDets: any) {
        if (this.item) {
            this.item.user = newUserDets.user;
            this.plurals();
            this.checkMsgs();
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
                let mCount = this.item.user.messages_no;
                if (mCount === 1) {
                    this.plur2Text = "Message";
                }
                else {
                    this.plur2Text = "Messages";
                }
            }
        }
    }

    load() {
        let ld1 = this.ldCtrl.create({content: "Loading Profile Info"});
        ld1.present();
        this.profProv.j_profile_p().subscribe(data => {
            this.errOc = false;
            ld1.dismiss();
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
            ld1.dismiss();
            this.newAlert("Connection Error", "Please check your Connection");
        });
    }

    followers() {
        if (this.item.user.username) {
            this.navCtrl.push(FollowersPage, { username: this.item.user.username });
        }
    }

    dms(){
        this.navCtrl.push(ChatsPage);
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
