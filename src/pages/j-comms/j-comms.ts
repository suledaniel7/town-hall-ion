import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ViewController } from 'ionic-angular';

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
    errOc: boolean = false;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private messageProv: MessageProvider,
        public address: AddressProvider,
        private alCtrl: AlertController,
        private viewCtrl: ViewController
    ) {
        this.imgAddress = this.address.getImageApi();
        this.load();
    }

    refresh(){
        this.load();
    }

    load(){
        this.messageProv.load_image().subscribe(data => {
            this.errOc = false;
            if (data.success) {
                this.item = {
                    avatar: data.avatar
                }
            }
            else {
                this.newAlert("Error", data.reason);
            }
        }, () => {
            this.errOc = true;
            this.newAlert("Connection Error", "Please check your connection");
        });
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad JCommsPage');
    }

    back() {
        this.viewCtrl.dismiss({ success: false });
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
                    this.viewCtrl.dismiss({ success: true, timestamp: data.timestamp, beats: data.beats});
                }
                else {
                    this.newAlert("Error", data.reason);
                }
            }, err => {
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
