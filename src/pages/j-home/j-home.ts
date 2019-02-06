import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Socket } from 'ngx-socket-io';

import { ProfileProvider } from '../../providers/profile/profile';

import { JCommsPage } from "../j-comms/j-comms";

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
        private socket: Socket
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
                c_msgs.concat(p_msgs);
                this.item.beat_msgs = c_msgs;
            }
        }
    }

    load() {
        this.profProv.j_profile_h().subscribe(data => {
            if (data.success) {
                this.item = data.item;
                this.socket.emit('conn', {username: data.item.user.username});
                this.socket.on('message', (m_item: any)=>{
                    if(m_item.page.indexOf('h') !== -1){
                        this.prepend(m_item.message);
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
        this.navCtrl.push(JCommsPage);
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
