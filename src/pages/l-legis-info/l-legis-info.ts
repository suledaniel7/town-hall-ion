import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, ModalController } from 'ionic-angular';

import { LegislationProvider } from '../../providers/legislation/legislation';
import { EditLegPage } from '../edit-leg/edit-leg';

@IonicPage()
@Component({
    selector: 'page-l-legis-info',
    templateUrl: 'l-legis-info.html',
})
export class LLegisInfoPage {
    code: string;
    item: any;
    status: string;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private legis: LegislationProvider,
        private alCtrl: AlertController,
        private ldCtrl: LoadingController,
        private mdCtrl: ModalController
    ) {
        this.code = this.navParams.get('code');
        this.load();
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad LLegisInfoPage');
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

    bill_stat(status: string){
        let ld2 = this.ldCtrl.create({content: "Updating Legislation"});
        this.legis.edit_leg_stat(this.code, status).subscribe((data)=>{
            ld2.dismiss();
            if(data.success){
                this.newAlert("Success", "Legislation Status Updated!");
            }
            else {
                this.newAlert("Error", data.reason);
            }
        }, ()=>{
            ld2.dismiss();
            this.newAlert("Connection Error", "Please check your connection");
        });
    }

    edit(){
        let md1 = this.mdCtrl.create(EditLegPage, {code: this.code});
        md1.onDidDismiss((data)=>{
            if(data){
                this.item.bill = data;
            }
        });
        md1.present();
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
