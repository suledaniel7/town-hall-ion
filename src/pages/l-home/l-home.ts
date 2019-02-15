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

    ionViewDidLoad() {
        console.log('ionViewDidLoad LHomePage');
    }

    prepend(msg: any){
        if(this.item){
            if(this.item.dist_posts){
                let p_msgs = this.item.dist_posts;
                let c_msgs = [msg];
                this.item.dist_posts = c_msgs.concat(p_msgs);
            }
        }
    }

    edit(timestamp: string, newMsg: any){
        let msgItem = document.getElementById(timestamp);
        if(msgItem){
            msgItem.textContent = newMsg.message;
        }
    }

    load() {
        let loader = this.ldCtrl.create({
            showBackdrop: true,
            content: "Please wait...",
        });

        loader.present();

        this.profileProv.l_profile_h().subscribe(data => {
            loader.dismiss();
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
                this.socket.on('edited', (ret_d: any)=>{
                    if(ret_d.page === 'h'){
                        this.edit(ret_d.message.m_timestamp, ret_d.message);
                    }
                });
            }
            else {
                this.newAlert("Error", data.reason);
            }
        }, (err) => {
            loader.dismiss();
            this.newAlert("Connection Error", err.message);
            let confirmed = true;
            let confirm = this.alertCtrl.create({
                title: "Retry?",
                message: "Should we try again in ten seconds?",
                buttons: [
                    {
                        text: 'Yes',
                        handler: () => {
                            confirmed = true;
                        }
                    },
                    {
                        text: 'No',
                        handler: () => {
                            confirmed = false;
                        }
                    }
                ]
            });
            confirm.present();
            if (confirmed) {
                setTimeout(this.load, 10000);
            }
        });
    }

    compose() {
        let md1 = this.mdCtrl.create(LCommsPage);
        md1.onDidDismiss((data)=>{
            if(data.success){
                this.socket.emit('message_sent', { username: data.username, timestamp: data.timestamp, beats: data.beats});
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
