import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController, LoadingController } from 'ionic-angular';

import { LegislationProvider } from '../../providers/legislation/legislation';

@IonicPage()
@Component({
    selector: 'page-edit-leg',
    templateUrl: 'edit-leg.html',
})
export class EditLegPage {
    item: any;
    name: string = '';
    title: string = '';
    link: string = '';
    desc: string = '';
    sponsors: Array<string>;
    bill: any;
    code: string;
    val: number = 0;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private legis: LegislationProvider,
        private viewCtrl: ViewController,
        private alCtrl: AlertController,
        private ldCtrl: LoadingController
    ) {
        this.code = this.navParams.get('code');
        this.load();
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad EditLegPage');
    }

    load() {
        let ld1 = this.ldCtrl.create({ content: "Loading..." });
        ld1.present();
        this.legis.edit_render(this.code).subscribe((d1) => {
            if (d1.success) {
                this.legis.load_legs().subscribe((data) => {
                    ld1.dismiss();
                    if (data.success) {
                        this.item = {
                            legislators: data.legs,
                            bill: d1.leg
                        }
                        this.name = d1.leg.title;
                        this.title = d1.leg.official_title;
                        this.link = d1.leg.text_link;
                        this.desc = d1.leg.description;

                        this.val = d1.leg.description.length;
                        this.sponsors = d1.leg.sponsors;
                    }
                    else {
                        this.newAlert("Error", "An error occured loading Legislators. Please try again later");
                    }
                }, () => {
                    ld1.dismiss();
                    this.newAlert("Connection Error", "Please check your connection");
                });
            }
            else {
                ld1.dismiss();
                this.newAlert("Connection Error", "Please check your connection");
            }
        }, () => {
            ld1.dismiss();
            this.newAlert("Connection Error", "Please check your connection");
        });

    }

    count() {
        let lt = this.desc.length;
        document.getElementById('counter').textContent = String(lt);
    }

    validate() {
        let wsp = /^\s*$/;
        if (wsp.test(this.name) || wsp.test(this.title) || wsp.test(this.desc) || wsp.test(this.link)) {
            this.newAlert("Incomplete Data", "All fields are required");
        }
        else {
            let ld2 = this.ldCtrl.create({ content: "Editing Bill..." });
            ld2.present();
            this.legis.edit_leg(this.name, this.title, this.desc, this.link, this.sponsors, this.code).subscribe((data) => {
                ld2.dismiss();
                if (data.success) {
                    this.bill = data.legislation;
                    this.close(true);
                }
                else {
                    this.newAlert("Error", data.reason);
                }
            }, () => {
                ld2.dismiss();
                this.newAlert("Connection Error", "Please check your connection");
            });
        }
    }

    close(success: boolean) {
        if (success) {
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
