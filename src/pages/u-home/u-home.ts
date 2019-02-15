import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Socket } from 'ngx-socket-io';

import { ProfileProvider } from "../../providers/profile/profile";

@IonicPage()
@Component({
    selector: 'page-u-home',
    templateUrl: 'u-home.html',
})
export class UHomePage {
    item: any;

    constructor(
        public navCtrl: NavController,
        private alertCtrl: AlertController,
        private ldCtrl: LoadingController,
        public navParams: NavParams,
        private profProv: ProfileProvider,
        private socket: Socket
    ) {
        this.load();
    }

    ionViewDidLoad() {

    }

    prepend(msg: any){
        if(this.item){
            if(this.item.messages){
                let p_msgs = this.item.messages;
                let c_msgs = [msg];
                this.item.messages = c_msgs.concat(p_msgs);
            }
        }
    }

    reload(msgs: any){
        if(this.item){
            this.item.messages = msgs;
        }
        else {
            this.item = {messages: msgs};
        }
    }

    load() {
        let loader = this.ldCtrl.create({
            showBackdrop: true,
            content: "Please wait...",
        });

        loader.present();

        this.profProv.u_profile_h().subscribe(data => {
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
                this.socket.on('following', (f_data: any)=>{
                    if(f_data.page === 'h'){
                        this.reload(f_data.messages);
                    }
                });
            }
            else {
                this.newAlert("Error Loading Profile", data.reason);
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

    newAlert(title: string, text: string) {
        let newAl = this.alertCtrl.create({
            title: title,
            subTitle: text,
            buttons: ['Ok']
        });

        return newAl.present();
    }

}
