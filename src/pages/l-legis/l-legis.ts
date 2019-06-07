import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController, LoadingController } from 'ionic-angular';

import { LegislationProvider } from "../../providers/legislation/legislation";

import { CreateLegisPage } from "../create-legis/create-legis";
import { LLegisInfoPage } from '../l-legis-info/l-legis-info';
import { LegisConvoPage } from '../legis-convo/legis-convo';

@IonicPage()
@Component({
    selector: 'page-l-legis',
    templateUrl: 'l-legis.html',
})
export class LLegisPage {
    item: any;
    c_active: boolean = false;
    empty: boolean = false;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private legis: LegislationProvider,
        private alCtrl: AlertController,
        private mdCtrl: ModalController,
        private ldCtrl: LoadingController
    ) {
        this.load();
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

    ionViewDidLoad() {
        console.log('ionViewDidLoad LLegisPage');
    }

    create(){
        let md1 = this.mdCtrl.create(CreateLegisPage);
        md1.onDidDismiss((data)=>{
            if(data){
                this.item.legislation.push(data);
                this.empty = false;
            }
        });
        md1.present();
    }

    reporting(code: string){
        this.navCtrl.push(LLegisInfoPage, {code: code});
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
