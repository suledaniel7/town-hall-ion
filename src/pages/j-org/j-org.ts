import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Socket } from 'ngx-socket-io';

import { ProfileProvider } from '../../providers/profile/profile';

@IonicPage()
@Component({
    selector: 'page-j-org',
    templateUrl: 'j-org.html',
})
export class JOrgPage {
    item: any;
    exp: string;
    errOc: boolean = false;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private profProv: ProfileProvider,
        private alCtrl: AlertController,
        private socket: Socket
    ) {
        this.load();
    }

    refresh(){
        this.load();
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad JOrgPage');
    }

    prepend(msg: any) {
        if (this.item) {
            if (this.item.org_msgs) {
                let p_msgs = this.item.org_msgs;
                let c_msgs = [msg];
                this.item.org_msgs = c_msgs.concat(p_msgs);
                this.checkMsgs();
            }
        }
    }

    checkMsgs() {
        if (this.item) {
            if (this.item.org_msgs) {
                let len = this.item.org_msgs.length;
                if (len > 0) {
                    this.exp = null;
                }
                else {
                    this.exp = "There are currently no posts from your Organisation.";
                }
            }
            else {
                this.exp = "There are currently no posts from your Organisation.";
            }
        }
        else {
            this.exp = "There are currently no posts from your Organisation.";
        }
    }

    edit(timestamp: string, newMsg: any) {
        let msgItem = document.getElementById(`p-${timestamp}`);
        if (msgItem) {
            document.getElementById(`p-${timestamp}`).textContent = newMsg.message;
        }
    }

    load() {
        this.profProv.j_profile_o().subscribe(data => {
            this.errOc = false;
            if (data.success) {
                this.item = data.item;
                this.checkMsgs();
                this.socket.emit('conn', { username: data.item.user.username });
                this.socket.on('msg', (m_item: any) => {
                    if (m_item.page.indexOf('o') !== -1) {
                        this.prepend(m_item.message);
                    }
                });
                this.socket.on('edited', (ret_d: any) => {
                    if (ret_d.page.indexOf('o') !== -1) {
                        this.edit(ret_d.message.m_timestamp, ret_d.message);
                    }
                });
                this.socket.on('deletion_comp', (ret_d) => {
                    if (ret_d.page.indexOf('o') !== -1) {
                        if (document.getElementById(ret_d.timestamp)) {
                            document.getElementById(ret_d.timestamp).remove();
                            this.checkMsgs();
                        }
                    }
                });
            }
            else {
                this.newAlert("Error", data.reason);
            }
        }, () => {
            this.errOc = true;
            this.newAlert("Connection Error", "Please check your connection");
        });
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
