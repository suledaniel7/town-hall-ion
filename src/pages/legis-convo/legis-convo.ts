import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { AddressProvider } from '../../providers/address/address';
import { LegislationProvider } from '../../providers/legislation/legislation';

@IonicPage()
@Component({
    selector: 'page-legis-convo',
    templateUrl: 'legis-convo.html',
})
export class LegisConvoPage {
    imgAddress: string;
    item: any;
    comment: string = '';
    btnColor: string = "light";
    validComment: boolean = false;
    code: string;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private alCtrl: AlertController,
        private ldCtrl: LoadingController,
        private address: AddressProvider,
        private legis: LegislationProvider
    ) {
        this.imgAddress = this.address.getImageApi();
        this.code = this.navParams.get('code');
        this.load();
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad LegisConvoPage');
    }

    load() {
        let ld = this.ldCtrl.create({content: "Loading Conversation"});
        ld.present();
        this.legis.load_comments(this.code).subscribe((data) => {
            ld.dismiss();
            if(data.success){
                this.item = data;
            }
            else {
                this.newAlert("Error", data.reason);
            }
        }, () => {
            ld.dismiss();
            this.newAlert("Connection Error", "Please check your connection");
        });
    }

    count() {
        let cLength = this.comment.length;
        if (cLength > 0 && !/^\s*$/.test(this.comment)) {
            this.btnColor = 'primary';
            this.validComment = true;
        }
        else {
            this.btnColor = 'light';
            this.validComment = false;
        }
    }

    post() {
        if (this.validComment) {
            let ld1 = this.ldCtrl.create({ content: "Posting Comment" });
            ld1.present();
            this.legis.post_comment(this.code, this.comment).subscribe(data => {
                ld1.dismiss();
                if (data.success) {
                    this.comment = '';
                    this.validComment = false;
                    this.btnColor = 'light';
                    let h_comms = this.item.conversations;
                    let n_comm = [data.convo];
                    this.item.conversations = n_comm.concat(h_comms);
                }
                else {
                    this.newAlert("Error", data.reason);
                }
            }, () => {
                ld1.dismiss();
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
