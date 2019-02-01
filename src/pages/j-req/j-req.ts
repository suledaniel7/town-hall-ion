import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ModalController } from 'ionic-angular';

import { AddressProvider } from '../../providers/address/address';
import { OrgJsProvider } from '../../providers/org-js/org-js';
import { OrgBeatSelPage } from '../org-beat-sel/org-beat-sel';

@IonicPage()
@Component({
    selector: 'page-j-req',
    templateUrl: 'j-req.html',
})
export class JReqPage {
    @Input() journo: any;
    @Input() username: string;
    imgAddress: string;
    j_username: string;
    requests: number = 1;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public address: AddressProvider,
        private ldCtrl: LoadingController,
        private alCtrl: AlertController,
        private mdCtrl: ModalController,
        private j_req: OrgJsProvider
    ) {
        this.imgAddress = this.address.getImageApi();
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad JReqPage');
    }

    ngAfterViewInit(){
        this.j_username = this.journo.username;
    }

    confirm() {
        let conf_alert = this.alCtrl.create({
            title: "Accept Journalist",
            message: `Do you want to accept ${this.journo.f_name} ${this.journo.l_name} | @${this.journo.username}?`,
            buttons: [
                {
                    text: "No"
                },
                {
                    text: "Yes",
                    handler: () => {
                        this.accept();
                    }
                }
            ]
        });

        conf_alert.present();
    }

    accept(){
        let ld1 = this.ldCtrl.create({content: "Accepting Journalist"});
        ld1.present();
        this.j_req.accept_j(this.j_username, this.username).subscribe(data=>{
            ld1.dismiss();
            if(data.success){
                //assign beat
                let md1 = this.mdCtrl.create(OrgBeatSelPage, {f_name: this.journo.f_name, l_name: this.journo.l_name, username: this.journo.username, o_username: this.username});
                md1.onDidDismiss((success)=>{
                    if(success){
                        this.check();
                        //wait for live reload
                        location.reload();
                    }
                });
                md1.present();
            }
            else {
                this.newAlert("Error", data.reason);
            }
        }, (err)=>{
            ld1.dismiss();
            this.newAlert("Connection Error", err.message);
        });
    }

    reject(){
        let ld2 = this.ldCtrl.create({content: "Rejecting Journalist"});
        ld2.present();
        this.j_req.reject_j(this.j_username, this.username).subscribe(data=>{
            ld2.dismiss();
            if(data.success){
                this.check();
            }
            else {
                this.newAlert("Error", data.reason);
            }
        }, (err)=>{
            ld2.dismiss();
            this.newAlert("Connection Error", err.message);
        });
    }

    check(){
        let reqs = document.getElementsByClassName('j-req').length;
        reqs = reqs - this.requests;
        //clear this one out
        document.getElementById(`j-req-${this.j_username}`).className = 'hidden';
        if(reqs === 0){
            //empty out
            document.getElementById('jReqHeader').className = 'hidden';
            document.getElementById('yJHeader').className = 'hidden';
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
