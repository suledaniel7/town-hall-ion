import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController, App } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Socket } from 'ngx-socket-io';

import { ProfileProvider } from '../../providers/profile/profile';
import { SignedInProvider } from '../../providers/signed-in/signed-in';

import { JCommsPage } from "../j-comms/j-comms";
import { HomePage } from '../home/home';

@IonicPage()
@Component({
    selector: 'page-f-home',
    templateUrl: 'f-home.html',
})
export class FHomePage {
    item: any;
    exp: string;
    errOc: boolean = false;
    preloaded: boolean = false;
    fin_preloaded: boolean = false;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private profProv: ProfileProvider,
        private alCtrl: AlertController,
        private mdCtrl: ModalController,
        private signedIn: SignedInProvider,
        private socket: Socket,
        private app: App,
        private storage: Storage
    ) {
        this.preload();
    }

    authorize() {
        this.signedIn.authorized('j').subscribe((data) => {
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
        console.log('ionViewDidLoad FHomePage');
    }

    prepend(msg: any) {
        if (this.item) {
            if (this.item.beat_msgs) {
                let p_msgs = this.item.beat_msgs;
                let c_msgs = [msg];
                this.item.beat_msgs = c_msgs.concat(p_msgs);
                this.checkMsgs();
            }
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
            this.item.beat_msgs = msgs;
        }
        else {
            this.item = { beat_msgs: msgs };
        }
        this.checkMsgs();
    }

    checkMsgs() {
        if (this.item) {
            if (this.item.beat_msgs) {
                let len = this.item.beat_msgs.length;
                if (len > 0) {
                    this.exp = null;
                }
                else {
                    this.exp = "You currently have no posts on your Feed. Follow other journalists, legislators or organisations to populate your Feed.";
                }
            }
            else {
                this.exp = "You currently have no posts on your Feed. Follow other journalists, legislators or organisations to populate your Feed.";
            }
        }
        else {
            this.exp = "You currently have no posts on your Feed. Follow other journalists, legislators or organisations to populate your Feed.";
        }
    }

    preload() {
        this.storage.get('home_data').then((val) => {
            let h_data = JSON.parse(val);
            if (h_data) {
                if (h_data.page = 'f') {
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
        this.profProv.j_profile_h().subscribe(data => {
            this.socket.disconnect();
            this.socket.connect();
            this.errOc = false;
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
                this.socket.on('self_message', (message: any) => {
                    this.prepend(message);
                });
                this.socket.on('following', (f_data: any) => {
                    if (f_data.page === 'h') {
                        this.reload(f_data.messages);
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
                        }
                        this.checkMsgs();
                    }
                });
                this.socket.on('recompiled', (ret_d) => {
                    let msgs = ret_d.messages;
                    this.reload(msgs);
                });
                let tmp_item = JSON.parse(JSON.stringify(this.item));
                let tmp_msgs = tmp_item.beat_msgs;
                let len = tmp_msgs.length;
                if(len > 50){
                    tmp_msgs = tmp_msgs.slice(0, 50);
                }
                tmp_item.beat_msgs = tmp_msgs;
                this.storage.set('home_data', JSON.stringify({page: 'f', item: tmp_item})).then(()=>{
                    this.preloaded = false;
                }).catch((err)=>{
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
        let md1 = this.mdCtrl.create(JCommsPage);
        md1.onDidDismiss((data) => {
            if (data.success) {
                this.socket.emit('message_sent', { username: data.username, timestamp: data.timestamp, beats: data.beats });
                this.socket.emit('changed_profile', data.timestamp);
            }
        });
        md1.present();
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
