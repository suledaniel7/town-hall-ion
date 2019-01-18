import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { MessageProvider } from '../../providers/message/message';
import { AddressProvider } from '../../providers/address/address';

@IonicPage()
@Component({
    selector: 'page-edit-message',
    templateUrl: 'edit-message.html',
})
export class EditMessagePage {
    m_item: any;
    imgAddress: string;

    btnColor: string = "primary";
    message: string = "";
    selBeats: any;
    validMesssage: boolean = true;
    charCount: any = 0;
    em_item: any;
    ac_type: any;
    m_type: string = "message";
    em_type: any;

    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        private messageProv: MessageProvider,
        public address: AddressProvider,
        private alCtrl: AlertController
    ) {
        this.imgAddress = this.address.getImageApi();
        this.m_item = navParams.get('m_item');
        this.messageProv.load_districts().subscribe(data => {
            if (data.success) {
                this.em_item = data.item;
            }
        });
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad EditMessagePage');
    }

    ngOnInit() {
        this.message = this.navParams.get('m_text');
        this.ac_type = this.m_item.ac_type;
        this.charCount = this.message.length;
        if (this.ac_type == 'o') {
            this.selBeats = "all";
        }
        else if (this.ac_type == 'j') {
            this.em_type = 'o';
        }
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

    update() {
        if (this.validMesssage) {
            if (this.ac_type == 'o') {
                if (this.selBeats == 'all') {
                    this.selBeats = ['all'];
                }
                this.messageProv.edit_message(this.message, this.m_type, this.ac_type, this.m_item.m_timestamp, this.selBeats).subscribe(data => {
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
            else if (this.ac_type == 'j') {
                this.messageProv.edit_message(this.message, this.m_type, this.ac_type, this.m_item.m_timestamp, null, this.em_type).subscribe(data => {
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
            else if (this.ac_type == 'l') {
                this.messageProv.edit_message(this.message, this.m_type, this.ac_type, this.m_item.m_timestamp).subscribe(data => {
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
