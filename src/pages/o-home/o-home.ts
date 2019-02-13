import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ModalController } from 'ionic-angular';
import { Socket } from 'ngx-socket-io';

import { ProfileProvider } from "../../providers/profile/profile";

import { OCommsPage } from "../o-comms/o-comms";

@IonicPage()
@Component({
    selector: 'page-o-home',
    templateUrl: 'o-home.html',
})

export class OHomePage {
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

    }

    prepend(msg: any){
        if(this.item){
            if(this.item.j_msgs){
                let p_msgs = this.item.j_msgs;
                let c_msgs = [msg];
                this.item.j_msgs = c_msgs.concat(p_msgs);
            }
        }
    }

    load() {
        let loader = this.ldCtrl.create({
            showBackdrop: true,
            content: "Please wait...",
        });

        loader.present();

        this.profileProv.o_profile_h().subscribe(data => {
            loader.dismiss();
            if (data.success) {
                this.item = data.item;
                this.socket.emit('conn', {username: data.item.user.username});
                this.socket.on('msg', (m_item: any)=>{
                    if(m_item.page.indexOf('h') !== -1){
                        this.prepend(m_item.message);
                    }
                });
                this.socket.on('self_message', (message: any)=>{
                    this.prepend(message);
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
        let md1 = this.mdCtrl.create(OCommsPage);
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
