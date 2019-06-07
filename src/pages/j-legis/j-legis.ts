import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';

import { LegislationProvider } from "../../providers/legislation/legislation";

import { JLegisInfoPage } from '../j-legis-info/j-legis-info';
import { LegisConvoPage } from '../legis-convo/legis-convo';

@IonicPage()
@Component({
    selector: 'page-j-legis',
    templateUrl: 'j-legis.html',
})
export class JLegisPage {
    item: any;
    c_active: boolean = false;
    empty: boolean = false;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private legis: LegislationProvider,
        private alCtrl: AlertController,
        private ldCtrl: LoadingController
    ) {
        this.load();
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad JLegisPage');
    }

    load(){
        let ld1 = this.ldCtrl.create({content: "Loading..."});
        ld1.present();
        this.legis.load_legislation().subscribe((data)=>{
            ld1.dismiss();
            if(data.success){
                this.item = data;
                if(data.c_legislation.length > 0){
                    this.c_active = true;
                }
                if(data.legislation.length === 0 && data.c_legislation.length === 0){
                    this.empty = true;
                }
            }
            else {
                this.newAlert("Error", data.reason);
            }
        }, ()=>{
            ld1.dismiss();
            this.newAlert("Connection Error", "Please check your connection");
        });
    }

    reporting(code: string){
        this.navCtrl.push(JLegisInfoPage, {code: code});
    }

    conversation(code: string){
        this.navCtrl.push(LegisConvoPage, {code: code});
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
