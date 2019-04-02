import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import { Socket } from "ngx-socket-io";

import { ProfileProvider } from '../../providers/profile/profile';
import { AddressProvider } from '../../providers/address/address';

import { JCommsPage } from "../j-comms/j-comms";
import { SettingsPage } from '../settings/settings';
import { FollowersPage } from '../followers/followers';
import { ChatsPage } from '../chats/chats';
import { ORenderPage } from '../o-render/o-render';

@IonicPage()
@Component({
    selector: 'page-j-profile',
    templateUrl: 'j-profile.html',
})
export class JProfilePage {
    item: any;
    imgAddress: string;
    exp: string;
    plur1Text: string = "Followers";
    plur2Text: string = "Messages";
    errOc: boolean = false;

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

    refresh(){
        this.load();
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad JProfilePage');
    }

    compose() {
        let md1 = this.mdCtrl.create(JCommsPage);
        md1.onDidDismiss((data) => {
            if (data.success) {
                this.socket.emit('message_sent', { username: data.username, timestamp: data.timestamp, beats: data.beats });
                this.socket.emit('changed_profile', data.timestamp);
                this.socket.emit('new_j_post');
            }
        });
        md1.present();
    }

    settings() {
        this.navCtrl.push(SettingsPage, { u_type: 'j' });
    }

    checkMsgs() {
        if (this.item) {
            if (this.item.messages) {
                let len = this.item.messages.length;
                if (len > 0) {
                    this.exp = null;
                }
                else {
                    this.exp = "You have not created any Town Hall posts. If you have been accepted by your Organisation, you may create a post using the + icon in the lower right-hand corner of your device.";
                }
            }
            else {
                this.exp = "You have not created any Town Hall posts. If you have been accepted by your Organisation, you may create a post using the + icon in the lower right-hand corner of your device.";
            }
        }
        else {
            this.exp = "You have not created any Town Hall posts. If you have been accepted by your Organisation, you may create a post using the + icon in the lower right-hand corner of your device.";
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
            if (newUserDets.user.beat) {
                if (newUserDets.user.beat.length > 0) {
                    this.item.exp = null;
                    this.item.free = true;
                }
            }
            else {
                this.item.exp = "Your request to " + this.item.user.orgName + " is still pending.";
                this.item.free = false;
            }
            this.plurals();
            this.checkMsgs();
        }
    }

    assigned(beat: any) {
        if (this.item) {
            this.item.user.beatDets = beat;
            this.item.free = true;
            this.item.exp = null;
        }
    }

    load() {
        this.profProv.j_profile_p().subscribe(data => {
            this.errOc = false;
            if (data.success) {
                this.item = data.item;
                this.plurals();
                this.checkMsgs();
                if (!data.item.free) {
                    this.item.exp = "Your request to " + data.item.user.orgName + " is still pending.";
                }
                this.socket.on('self_message', (message: any) => {
                    this.prepend(message);
                });
                this.socket.on('msg', (m_item: any) => {
                    if (m_item.page.indexOf('p') !== -1) {
                        this.prepend(m_item.message);
                    }
                });
                this.socket.on('acc_j', () => {
                    this.item.exp = null;
                    this.item.free = true;
                });
                this.socket.on('profile_changed', (ret_d: any) => {
                    this.reload(ret_d.newUser);
                });
                this.socket.on('j_assigned', (beat: any) => {
                    this.assigned(beat);
                });
            }
            else {
                this.newAlert("Error", data.reason);
            }
        }, () => {
            this.errOc = true;
            this.newAlert("Communication Error", "Please check your connection");
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

    oProf(username: string){
        if(username){
            if(username.length > 0){
                this.navCtrl.push(ORenderPage, { username: username });
            }
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
