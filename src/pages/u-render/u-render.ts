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
    username: string;
    imgAddress: string;
    errOc: boolean = false;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private rndrProv: RenderProvider,
        private ldCtrl: LoadingController,
        private alertCtrl: AlertController,
        public address: AddressProvider
    ) {
        let username = this.navParams.get('username');
        this.username = username;
        this.load();
    }

    load() {
        this.imgAddress = this.address.getImageApi();
        let ld = this.ldCtrl.create({ content: "Loading Profile Info" });
        ld.present();
        this.rndrProv.render_profile(this.username).subscribe(data => {
            this.errOc = false;
            ld.dismiss();
            if (data.success) {
                this.item = data.item;
            }
            else {
                this.newAlert("Error", data.reason);
            }
        }, () => {
            ld.dismiss();
            this.errOc = true;
            this.newAlert("Connection Error", "Please check your connection");
        });
    }

    refresh(){
        this.load();
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
