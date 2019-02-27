import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Socket } from 'ngx-socket-io';

import { DmProvider } from '../../providers/dm/dm';

@IonicPage()
@Component({
    selector: 'page-chat',
    templateUrl: 'chat.html',
})
export class ChatPage {
    sender: any;
    recepient: any;
    r_name: any;
    errOc: boolean = false;
    item: any;
    isBlocked: boolean;
    blockedUser: boolean;
    b_text: string = 'Block';
    valid: boolean = false;
    btnColor: string = 'primary';
    text: string = '';

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private ldCtrl: LoadingController,
        private alCtrl: AlertController,
        private dmProv: DmProvider,
        private socket: Socket
    ) {
        this.sender = this.navParams.get('sender');
        this.recepient = this.navParams.get('recepient');
        this.r_name = '@'+this.recepient;
        this.load();
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad ChatPage');
    }

    back(){
        this.navCtrl.pop();
    }

    refresh() {
        this.load();
    }

    load() {
        let ld1 = this.ldCtrl.create({ content: "Retrieving Messages" });
        ld1.present();
        this.dmProv.conversation(this.sender, this.recepient).subscribe((data) => {
            this.socket.disconnect();
            this.socket.connect();
            this.errOc = false;
            ld1.dismiss();
            if (data.success) {
                this.item = data.item;
                this.r_name = data.r_name;
                if (data.canSend) {
                    this.isBlocked = false;
                }
                else {
                    this.isBlocked = true;
                }
                if(data.blocked){
                    this.blockedUser = true;
                    this.b_text = 'Unblock'
                }
                else {
                    this.blockedUser = false;
                    this.b_text = 'Block'
                }

                this.socket.on('new_dm', (dm: any)=>{
                    this.append(dm);
                });
            }
            else {
                this.newAlert("Error", data.reason);
            }
        }, () => {
            ld1.dismiss();
            this.errOc = true;
            this.newAlert("Connection Error", "Please check your connection");
        });
    }

    post() {
        let wsp = /^\s*$/;
        if (!wsp.test(this.text)) {
            this.dmProv.create_dm(this.recepient, this.text).subscribe((data) => {
                if(data.success){
                    let dm = data.dm;
                    this.text = '';
                    this.btnColor = 'secondary';
                    this.append(dm);
                    this.socket.emit('dm', {dm: dm, recepient: this.recepient});
                }
                else {
                    this.newAlert("Error", data.reason);
                }
            }, () => {
                this.newAlert("Connection Error", "Please check your connection");
            });
        }
    }

    append(dm: any) {
        if (this.item) {
            if (this.item.dms) {
                this.item.dms.push(dm);
            }
            else {
                this.item.dms = [dm];
            }
        }
        else {
            this.item = { dms: [dm] };
        }
    }

    count() {
        let num = this.text.length;
        let wsp = /^\s*$/;
        if (num > 0 && !wsp.test(this.text)) {
            this.btnColor = 'primary';
        }
        else {
            this.btnColor = 'secondary';
        }
    }

    block(){
        if(this.blockedUser){
            //unblock
            this.dmProv.block(this.sender, this.recepient, 'u').subscribe((data)=>{
                if(data.success){
                    this.blockedUser = false;
                    this.b_text = 'Block';
                }
                else {
                    this.newAlert("Error", data.reason);
                }
            }, ()=> {
                this.newAlert("Connection Error", "Please check your connection");
            });
        }
        else {
            //block
            this.dmProv.block(this.sender, this.recepient, 'b').subscribe((data)=>{
                if(data.success){
                    this.blockedUser = true;
                    this.b_text = 'Unblock';
                }
                else {
                    this.newAlert("Error", data.reason);
                }
            }, ()=> {
                this.newAlert("Connection Error", "Please check your connection");
            });
        }
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
