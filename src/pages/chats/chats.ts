import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';

import { DmProvider } from "../../providers/dm/dm";
import { AddressProvider } from '../../providers/address/address';

import { ChatPage } from '../chat/chat';

@IonicPage()
@Component({
    selector: 'page-chats',
    templateUrl: 'chats.html',
})
export class ChatsPage {
    username: string;
    errOc: boolean = false;
    item: any;
    imgAddress: string;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private address: AddressProvider,
        private ldCtrl: LoadingController,
        private alCtrl: AlertController,
        private dmProv: DmProvider
    ) {
        this.imgAddress = this.address.getImageApi();
        this.load();
    }

    refresh() {
        this.load();
    }

    load(){
        let ld1 = this.ldCtrl.create({content: "Compiling Recent Messages"});
        this.dmProv.list_dms().subscribe((data)=>{
            this.errOc = false;
            ld1.dismiss();
            if (data.success) {
                this.item = data.item;
                this.username = this.item.username;
            }
            else {
                this.newAlert("Error", data.reason);
            }
        }, ()=>{
            ld1.dismiss();
            this.errOc = true;
            this.newAlert("Connection Error", "Please check your connection");
        });
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad ChatsPage');
    }

    converse(recepient: string) {
        this.navCtrl.push(ChatPage, {sender: this.username, recepient: recepient});
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
