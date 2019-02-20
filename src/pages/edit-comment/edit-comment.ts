import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { ConversationProvider } from '../../providers/conversation/conversation';
import { AddressProvider } from '../../providers/address/address';

@IonicPage()
@Component({
    selector: 'page-edit-comment',
    templateUrl: 'edit-comment.html',
})
export class EditCommentPage {
    c_item: any;
    timestamp: any;
    imgAddress: string;

    btnColor: string = "primary";
    comment: string = "";
    validMesssage: boolean = true;
    m_type: string = "comment";
    wsp = /^\s*$/;

    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        private convProv: ConversationProvider,
        public address: AddressProvider,
        private alCtrl: AlertController
    ) {
        this.imgAddress = this.address.getImageApi();
        this.c_item = navParams.get('c_item');
        this.comment = navParams.get('c_text');
        this.timestamp = navParams.get('timestamp');
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad EditCommentPage');
    }

    count() {
        if (this.comment.length > 0 && !this.wsp.test(this.comment)) {
            this.validMesssage = true;
            this.btnColor = 'primary';
        }
        else {
            this.validMesssage = false;
            this.btnColor = 'light';
        }
    }

    back() {
        this.navCtrl.pop();
    }

    update() {
        if (this.validMesssage) {
            this.convProv.edit_comment(this.comment, this.timestamp).subscribe(data => {
                if (data.success) {
                    this.navCtrl.pop();
                }
                else {
                    this.newAlert("Error", data.reason);
                }
            }, () => {
                this.newAlert("Connection Error", "Please check your connection");
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
