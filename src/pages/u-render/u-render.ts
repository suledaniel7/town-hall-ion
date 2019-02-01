import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';

import { RenderProvider } from '../../providers/render/render';
import { AddressProvider } from '../../providers/address/address';
import { LRenderPage } from '../l-render/l-render';

@IonicPage()
@Component({
    selector: 'page-u-render',
    templateUrl: 'u-render.html',
})
export class URenderPage {
    item: any;
    errOc: boolean;
    username: string;
    imgAddress: string;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private rndrProv: RenderProvider,
        private ldCtrl: LoadingController,
        private alertCtrl: AlertController,
        public address: AddressProvider
    ) {
        this.load();
    }

    load() {
        this.imgAddress = this.address.getImageApi();
        let ld = this.ldCtrl.create({ content: "Loading Profile Info" });
        ld.present();
        let username = this.navParams.get('username');
        this.username = username;
        this.rndrProv.render_profile(username).subscribe(data => {
            ld.dismiss();
            if (data.success) {
                this.item = data.item;
                this.errOc = false;
            }
            else {
                this.newAlert("Error", data.reason);
                this.errOc = true;
            }
        }, err => {
            ld.dismiss();
            this.newAlert("Connection Error", err.message);
            this.errOc = true;
        });
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad URenderPage');
    }

    newAlert(title: string, text: string) {
        let newAl = this.alertCtrl.create({
            title: title,
            subTitle: text,
            buttons: ['Ok']
        });

        return newAl.present();
    }

    render_profile(username) {
        this.navCtrl.push(LRenderPage, { code: username });
    }
}
