import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';

import { LegislationProvider } from '../../providers/legislation/legislation';

@IonicPage()
@Component({
    selector: 'page-j-legis-info',
    templateUrl: 'j-legis-info.html',
})
export class JLegisInfoPage {
    code: string;
    item: any;
    status: string;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private legis: LegislationProvider,
        private alCtrl: AlertController,
        private ldCtrl: LoadingController
    ) {
        this.code = this.navParams.get('code');
        this.load();
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad JLegisInfoPage');
    }

    load(){
        let ld1 = this.ldCtrl.create({content: "Loading Legislation Information"});
        ld1.present();
        this.legis.load_info(this.code).subscribe((data)=>{
            ld1.dismiss();
            if(data.success){
                this.status = data.bill.status.s_value;
                this.item = data;
            }
            else {
                this.newAlert("Error", data.reason);
            }
        }, ()=>{
            ld1.dismiss();
            this.newAlert("Connection Error", "Please check your connection");
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
