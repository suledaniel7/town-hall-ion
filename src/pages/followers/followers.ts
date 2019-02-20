import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';

import { AddressProvider } from '../../providers/address/address';
import { RenderProvider } from '../../providers/render/render';
import { JRenderPage } from '../j-render/j-render';
import { LRenderPage } from '../l-render/l-render';
import { ORenderPage } from '../o-render/o-render';
import { URenderPage } from '../u-render/u-render';

@IonicPage()
@Component({
    selector: 'page-followers',
    templateUrl: 'followers.html',
})
export class FollowersPage {
    item: any;
    imgAddress: any;
    errText: string = '';
    username: string;
    errOc: boolean = false;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private alCtrl: AlertController,
        private ldCtrl: LoadingController,
        private rndrProv: RenderProvider,
        public address: AddressProvider,
    ) {
        this.imgAddress = this.address.getImageApi();
        this.username = this.navParams.get('username');
        this.load();
    }

    refresh(){
        this.load();
    }

    load(){
        let ld1 = this.ldCtrl.create({content: "Loading Followers"});
        ld1.present();
        this.rndrProv.followers(this.username).subscribe(data => {
            this.errOc = false;
            ld1.dismiss();
            if(data.success){
                this.item = {
                    followers: data.followers
                }
                if(!data.followers){
                    this.errText = "No followers";
                }
                else if(data.followers.length === 0){
                    this.errText = "No followers";
                }
            }
            else {
                this.newAlert("Error", data.reason);
            }
        }, () =>{
            this.errOc = true;
            ld1.dismiss();
            this.newAlert("Connection Error", "Please check your connection");
        });
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad FollowersPage');
    }

    blind_profile(username) {
        //find u_type
        //push page or this.newAlert error
        let ld = this.ldCtrl.create({ content: "Loading User" });
        ld.present();
        this.rndrProv.req_type(username).subscribe(data => {
            ld.dismiss();
            if (data.success) {
                let u_type = data.u_type;
                if (u_type == 'j') {
                    this.navCtrl.push(JRenderPage, { username: username });
                }
                else if (u_type == 'l') {
                    this.navCtrl.push(LRenderPage, { code: username });
                }
                else if (u_type == 'o') {
                    this.navCtrl.push(ORenderPage, { username: username });
                }
                else if (u_type == 'u') {
                    this.navCtrl.push(URenderPage, { username: username });
                }
            }
            else {
                this.newAlert("Error", data.reason);
            }
        }, err => {
            ld.dismiss();
            this.newAlert("Connection Error", "Please check your connection");
        });
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
