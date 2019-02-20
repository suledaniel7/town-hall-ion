import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ViewController } from 'ionic-angular';

import { ProfileProvider } from "../../providers/profile/profile";
import { MessageProvider } from "../../providers/message/message";
import { AddressProvider } from '../../providers/address/address';

@IonicPage()
@Component({
    selector: 'page-o-comms',
    templateUrl: 'o-comms.html',
})
export class OCommsPage {
    item: any;
    btnColor: string = "light";
    validMesssage: boolean = false;
    message: string = "";
    charCount: any = 0;
    selBeats: any = "all";
    m_type: string = "o";
    imgAddress: string;
    errOc: boolean = false;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private profProv: ProfileProvider,
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
        this.profProv.o_profile_c().subscribe(data => {
            this.errOc = false;
            if (data.success) {
                this.item = data.item;
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
        console.log('ionViewDidLoad OCommsPage');
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
            if (this.selBeats == 'all') {
                this.selBeats = ['all'];
            }
            this.messageProv.post_message('o', this.message, this.m_type, this.selBeats).subscribe(data => {
                if (data.success) {
                    this.viewCtrl.dismiss({ success: true, timestamp: data.timestamp, beats: data.beats });
                }
                else {
                    this.newAlert("Error", data.reason);
                }
            }, () => {
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
