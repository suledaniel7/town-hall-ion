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
        console.log('ionViewDidLoad JOrgPage');
    }

    prepend(msg: any){
        if(this.item){
            if(this.item.org_msgs){
                let p_msgs = this.item.org_msgs;
                let c_msgs = [msg];
                this.item.org_msgs = c_msgs.concat(p_msgs);
            }
        }
    }

    load() {
        this.profProv.j_profile_o().subscribe(data => {
            if (data.success) {
                this.item = data.item;
                this.socket.emit('conn', {username: data.item.user.username});
                this.socket.on('msg', (m_item: any)=>{
                    if(m_item.page.indexOf('o') !== -1){
                        this.prepend(m_item.message);
                    }
                });
            }
            else {
                this.newAlert("Error", data.reason);
            }
        }, err => {
            this.newAlert("Connection Error", err.message);
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
