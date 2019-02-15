import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController, App } from 'ionic-angular';
import { Socket } from 'ngx-socket-io';

import { ProfileProvider } from '../../providers/profile/profile';

import { JCommsPage } from "../j-comms/j-comms";
import { JOrgSelPage } from '../j-org-sel/j-org-sel';

@IonicPage()
@Component({
    selector: 'page-j-home',
    templateUrl: 'j-home.html',
})
export class JHomePage {
    item: any;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private profProv: ProfileProvider,
        private alCtrl: AlertController,
        private mdCtrl: ModalController,
        private socket: Socket,
        private app: App
    ) {
        this.load();
    }

    ionViewDidLoad() {
    }

    prepend(msg: any){
        if(this.item){
            if(this.item.beat_msgs){
                let p_msgs = this.item.beat_msgs;
                let c_msgs = [msg];
                this.item.beat_msgs = c_msgs.concat(p_msgs);
            }
        }
    }

    assigned(beat: any){
        if(this.item){
            this.item.user.beatDets = beat;
            this.item.free = true;
            this.item.exp = null;
        }
    }

    reload(msgs: any){
        if(this.item){
            this.item.beat_msgs = msgs;
        }
        else {
            this.item = {beat_msgs: msgs};
        }
    }

    edit(timestamp: string, newMsg: any){
        let msgItem = document.getElementById(timestamp);
        if(msgItem){
            msgItem.textContent = newMsg.message;
        }
    }

    load() {
        this.profProv.j_profile_h().subscribe(data => {
            if (data.success) {
                this.item = data.item;
                this.socket.on('msg', (m_item: any)=>{
                    if(m_item.page.indexOf('h') !== -1){
                        this.prepend(m_item.message);
                    }
                });
                this.socket.on('self_message', (message: any)=>{
                    this.prepend(message);
                });
                this.socket.on('j_assigned', (beat: any)=>{
                    this.assigned(beat);
                });
                this.socket.on('following', (f_data: any)=>{
                    if(f_data.page === 'h'){
                        this.reload(f_data.messages);
                    }
                });
                this.socket.on('rej_j', ()=>{
                    this.app.getRootNav().setRoot(JOrgSelPage);
                    this.navCtrl.popToRoot();
                });
                this.socket.on('rem_j', ()=>{
                    this.app.getRootNav().setRoot(JOrgSelPage);
                    this.navCtrl.popToRoot();
                });
                this.socket.on('acc_j', ()=>{
                    this.item.exp = null;
                    this.item.free = true;
                });
                this.socket.on('edited', (ret_d: any)=>{
                    if(ret_d.page === 'h'){
                        this.edit(ret_d.message.m_timestamp, ret_d.message);
                    }
                });
                if (!data.item.free) {
                    this.item.exp = "Your request to " + data.item.user.orgName + " is still pending.";
                }
            }
            else {
                this.newAlert("Error", data.reason);
            }
        }, err => {
            this.newAlert("Connection Error", err.message);
        });
    }

    compose() {
        // this.navCtrl.push(JCommsPage);
        let md1 = this.mdCtrl.create(JCommsPage);
        md1.onDidDismiss((data)=>{
            if(data.success){
                this.socket.emit('message_sent', { username: data.username, timestamp: data.timestamp, beats: data.beats});
                this.socket.emit('changed_profile', data.timestamp);
                this.socket.emit('new_j_post');
            }
        });
        md1.present();
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
