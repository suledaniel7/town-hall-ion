import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController, LoadingController } from 'ionic-angular';

import { LegislationProvider } from '../../providers/legislation/legislation';

@IonicPage()
@Component({
    selector: 'page-create-legis',
    templateUrl: 'create-legis.html',
})
export class CreateLegisPage {
    item: any;
    name: string = '';
    title: string = '';
    link: string = '';
    desc: string = '';
    sponsors: Array<string>;
    bill: any;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private legis: LegislationProvider,
        private viewCtrl: ViewController,
        private alCtrl: AlertController,
        private ldCtrl: LoadingController
    ) {
        this.load();
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad CreateLegisPage');
    }

    load(){
        let ld1 = this.ldCtrl.create({content: "Loading..."});
        ld1.present();
        this.legis.load_legs().subscribe((data)=>{
            ld1.dismiss();
            if(data.success){
                this.item = {
                    legislators: data.legs
                }
            }
            else {
                this.newAlert("Error", "An error occured loading Legislators. Please try again later");
            }
        }, ()=>{
            ld1.dismiss();
            this.newAlert("Connection Error", "Please check your connection");
        });
    }

    count(){
        let lt = this.desc.length;
        document.getElementById('counter').textContent = String(lt);
    }

    validate(){
        let wsp = /^\s*$/;
        if(wsp.test(this.name) || wsp.test(this.title) || wsp.test(this.desc) || wsp.test(this.link)){
            this.newAlert("Incomplete Data", "All fields are required");
        }
        else {
            let ld2 = this.ldCtrl.create({content: "Publishing Bill..."});
            ld2.present();
            this.legis.create_bill(this.name, this.title, this.desc, this.link, this.sponsors).subscribe((data)=>{
                ld2.dismiss();
                if(data.success){
                    this.bill = data.legislation;
                    this.close(true);
                }
                else {
                    this.newAlert("Error", data.reason);
                }
            }, ()=>{
                ld2.dismiss();
                this.newAlert("Connection Error", "Please check your connection");
            });
        }
    }

    close(success: boolean){
        if(success){
            this.viewCtrl.dismiss(this.bill);
        }
        else {
            this.viewCtrl.dismiss(null);
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
