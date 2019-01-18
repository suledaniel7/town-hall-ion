import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { MessageProvider } from "../../providers/message/message";
import { AddressProvider } from '../../providers/address/address';

@IonicPage()
@Component({
    selector: 'page-j-comms',
    templateUrl: 'j-comms.html',
})
export class JCommsPage {
    btnColor: string = "light";
    validMesssage: boolean = false;
    message: string = "";
    m_type: string = "o";
    charCount: any = 0;
    item: any;
    imgAddress: string;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private messageProv: MessageProvider,
        public address: AddressProvider,
        private alCtrl: AlertController
    ) {
        this.imgAddress = this.address.getImageApi();
        this.messageProv.load_image().subscribe(data => {
            if (data.success) {
                this.item = {
                    avatar: data.avatar
                }
            }
            else {
                this.newAlert("Error", data.reason);
            }
        }, err => {
            this.newAlert("Connection Error", err.message);
        });
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad JCommsPage');
    }

    back() {
        this.navCtrl.pop();
    }

    count() {
        this.charCount = this.message.length;
        let wsp = /^\s*$/;
        if (this.charCount > 0 && this.charCount <= 360 && !wsp.test(this.message)) {
            this.btnColor = "primary";
            this.validMesssage = true;
        }
        else {
            this.btnColor = "light";
            this.validMesssage = false;
        }
    }

    post() {
        if (this.validMesssage) {
            this.messageProv.post_message('j', this.message, this.m_type).subscribe(data => {
                if (data.success) {
                    this.navCtrl.pop();
                }
                else {
                    this.newAlert("Error", data.reason);
                }
            }, err => {
                this.newAlert("Connection Error", err.message);
            });
        }
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
