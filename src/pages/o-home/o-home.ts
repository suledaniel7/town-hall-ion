import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController, App } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Socket } from 'ngx-socket-io';

import { ProfileProvider } from "../../providers/profile/profile";
import { SignedInProvider } from '../../providers/signed-in/signed-in';

import { OCommsPage } from "../o-comms/o-comms";
import { HomePage } from '../home/home';

@IonicPage()
@Component({
    selector: 'page-o-home',
    templateUrl: 'o-home.html',
})

export class OHomePage {
    item: any;
    exp: string;
    errOc: boolean = false;
    preloaded: boolean = false;
    fin_preloaded: boolean = false;

    constructor(
        public navCtrl: NavController,
        private alertCtrl: AlertController,
        public navParams: NavParams,
        private profileProv: ProfileProvider,
        private signedIn: SignedInProvider,
        private mdCtrl: ModalController,
        private socket: Socket,
        private app: App,
        private storage: Storage
    ) {
        this.preload();
    }

    authorize() {
        this.signedIn.authorized('o').subscribe((data) => {
            if (!data) {
                this.storage.set('signed_in', JSON.stringify(null)).then(() => {
                    this.app.getRootNav().setRoot(HomePage);
                    this.navCtrl.popToRoot();
                }).catch((err) => {
                    this.newAlert("Error", err);
                });
            }
            else if (!data.success) {
                this.storage.set('signed_in', JSON.stringify(null)).then(() => {
                    alert('b')
                    this.app.getRootNav().setRoot(HomePage);
                    this.navCtrl.popToRoot();
                }).catch((err) => {
                    this.newAlert("Error", err);
                });
            }
        });
    }

    refresh() {
        this.load();
    }

    ionViewDidLoad() {

    }

    prepend(msg: any) {
        if (this.item) {
            if (this.item.j_msgs) {
                let p_msgs = this.item.j_msgs;
                let c_msgs = [msg];
                this.item.j_msgs = c_msgs.concat(p_msgs);
                this.checkMsgs();
            }
        }
    }

    checkMsgs() {
        if (this.item) {
            if (this.item.j_msgs) {
                let len = this.item.j_msgs.length;
                if (len > 0) {
                    this.exp = null;
                }
                else {
                    this.exp = "There are no Town Hall posts yet from your journalists.";
                }
            }
            else {
                this.exp = "There are no Town Hall posts yet from your journalists.";
            }
        }
        else {
            this.exp = "There are no Town Hall posts yet from your journalists.";
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
            this.item.j_msgs = msgs;
        }
        else {
            this.item = { j_msgs: msgs };
        }
        this.checkMsgs();
    }

    preload() {
        this.storage.get('home_data').then((val) => {
            let h_data = JSON.parse(val);
            if (h_data) {
                if (h_data.page = 'o') {
                    if (h_data.item) {
                        this.item = h_data.item;
                        this.checkMsgs();
                        this.preloaded = true;
                    }
                }
            }
            this.load();
        }).catch(err => {
            this.newAlert("Error", err);
            this.load();
        });
    }

    load() {
        this.profileProv.o_profile_h().subscribe(data => {
            this.errOc = false;
            this.socket.disconnect();
            this.socket.connect();
            if (data.success) {
                this.authorize();
                this.fin_preloaded = false;
                this.item = data.item;
                this.checkMsgs();
                this.socket.on('msg', (m_item: any) => {
                    if (m_item.page.indexOf('h') !== -1) {
                        this.prepend(m_item.message);
                    }
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
                let tmp_item = JSON.parse(JSON.stringify(this.item));
                let tmp_msgs = tmp_item.j_msgs;
                let len = tmp_msgs.length;
                if (len > 50) {
                    tmp_msgs = tmp_msgs.slice(0, 50);
                }
                tmp_item.j_msgs = tmp_msgs;
                this.storage.set('home_data', JSON.stringify({ page: 'o', item: tmp_item })).then(() => {
                    this.preloaded = false;
                }).catch((err) => {
                    this.preloaded = false;
                    this.newAlert("Error", err);
                });
            }
            else {
                if(this.preloaded){
                    this.fin_preloaded = true;
                }
                this.newAlert("Error", data.reason);
            }
        }, () => {
            if(this.preloaded){
                this.fin_preloaded = true;
            }
            if (!this.preloaded) {
                this.errOc = true;
            }
            this.newAlert("Connection Error", "Please check your connection");
        });
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

    newAlert(title: string, text: string) {
        let newAl = this.alertCtrl.create({
            title: title,
            subTitle: text,
            buttons: ['Ok']
        });

        return newAl.present();
    }
}
