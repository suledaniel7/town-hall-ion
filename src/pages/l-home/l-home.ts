import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ModalController } from 'ionic-angular';
import { Socket } from 'ngx-socket-io';

import { ProfileProvider } from "../../providers/profile/profile";

import { LCommsPage } from '../l-comms/l-comms';

@IonicPage()
@Component({
    selector: 'page-l-home',
    templateUrl: 'l-home.html',
})
export class LHomePage {
    item: any;
    exp: string;
    errOc: boolean = false;

    constructor(
        public navCtrl: NavController,
        private alertCtrl: AlertController,
        private ldCtrl: LoadingController,
        public navParams: NavParams,
        private profileProv: ProfileProvider,
        private mdCtrl: ModalController,
        private socket: Socket
    ) {
        this.load();
    }

    refresh(){
        this.load();
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad LHomePage');
    }

    prepend(msg: any) {
        if (this.item) {
            if (this.item.dist_posts) {
                let p_msgs = this.item.dist_posts;
                let c_msgs = [msg];
                this.item.dist_posts = c_msgs.concat(p_msgs);
                this.checkMsgs();
            }
        }
    }

    checkMsgs() {
        if (this.item) {
            if (this.item.dist_posts) {
                let len = this.item.dist_posts.length;
                if (len > 0) {
                    this.exp = null;
                }
                else {
                    this.exp = "You currently have no posts on your Feed. Your Feed is populated with posts from other Users specific to your District.";
                }
            }
            else {
                this.exp = "You currently have no posts on your Feed. Your Feed is populated with posts from other Users specific to your District.";
            }
        }
        else {
            this.exp = "You currently have no posts on your Feed. Your Feed is populated with posts from other Users specific to your District.";
        }
    }

    edit(timestamp: string, newMsg: any) {
        let msgItem = document.getElementById(`p-${timestamp}`);
        if (msgItem) {
            document.getElementById(`p-${timestamp}`).textContent = newMsg.message;
        }
    }

    reload(msgs: any) {
        if (this.item) {
            this.item.dist_posts = msgs;
        }
        else {
            this.item = { dist_posts: msgs };
        }
        this.checkMsgs();
    }

    load() {
        let loader = this.ldCtrl.create({
            showBackdrop: true,
            content: "Please wait...",
        });

        loader.present();

        this.profileProv.l_profile_h().subscribe(data => {
            this.errOc = false;
            this.socket.disconnect();
            this.socket.connect();
            loader.dismiss();
            if (data.success) {
                this.item = data.item;
                this.checkMsgs();
                this.socket.on('msg', (m_item: any) => {
                    if (m_item.page.indexOf('h') !== -1) {
                        this.prepend(m_item.message);
                    }
                });
                this.socket.on('self_message', (message: any) => {
                    this.prepend(message);
                });
                this.socket.on('edited', (ret_d: any) => {
                    if (ret_d.page.indexOf('h') !== -1) {
                        this.edit(ret_d.message.m_timestamp, ret_d.message);
                    }
                });
                this.socket.on('deletion_comp', (ret_d) => {
                    if (ret_d.page.indexOf('h') !== -1) {
                        if (document.getElementById(ret_d.timestamp)) {
                            document.getElementById(ret_d.timestamp).remove();
                            this.checkMsgs();
                        }
                    }
                });
                this.socket.on('recompiled', (ret_d) => {
                    let msgs = ret_d.messages;
                    this.reload(msgs);
                });
            }
            else {
                this.newAlert("Error", data.reason);
            }
        }, () => {
            loader.dismiss();
            this.errOc = true;
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

    newAlert(title: string, text: string) {
        let newAl = this.alertCtrl.create({
            title: title,
            subTitle: text,
            buttons: ['Ok']
        });

        return newAl.present();
    }
}
