import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';

import { RenderProvider } from '../../providers/render/render';
import { AddressProvider } from '../../providers/address/address';

import { FollowersPage } from '../followers/followers';

@IonicPage()
@Component({
    selector: 'page-o-render',
    templateUrl: 'o-render.html',
})
export class ORenderPage {
    item: any;
    flwrsText: string;
    flwBtnText: string;
    username: string;
    imgAddress: string;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private rndrProv: RenderProvider,
        private ldCtrl: LoadingController,
        public address: AddressProvider,
        private alCtrl: AlertController
    ) {
        this.imgAddress = this.address.getImageApi();
        let ld = this.ldCtrl.create({ content: "Loading Profile Info" });
        ld.present();
        let username = this.navParams.get('username');
        this.username = username;
        this.rndrProv.render_profile(username).subscribe(data => {
            ld.dismiss();
            if (data.success) {
                this.item = data.item;
                if (this.item.user.followersNo == 1) {
                    this.flwrsText = "Follower";
                }
                else {
                    this.flwrsText = "Followers";
                }
                if (this.item.following) {
                    this.flwBtnText = "Following";
                }
                else {
                    this.flwBtnText = "Follow";
                }
            }
            else {
                this.newAlert("Loading Error", data.reason);
            }
        }, err => {
            ld.dismiss();
            this.newAlert("Connection Error", err.message);
        });
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad ORenderPage');
    }

    fClick() {
        if (this.flwBtnText == 'Follow') {
            this.follow();
        }
        else if (this.flwBtnText == "Following") {
            this.unfollow();
        }
    }

    follow() {
        this.flwBtnText = "Loading...";
        this.rndrProv.follow(this.username).subscribe(data => {
            if (data.success) {
                this.item.user.followersNo++;
                if (this.item.user.followersNo == 1) {
                    this.flwrsText = "Follower";
                }
                else {
                    this.flwrsText = "Followers";
                }
                this.flwBtnText = "Following";
            }
            else {
                this.flwBtnText = "Follow";
                this.newAlert("Error", data.reason);
            }
        }, err => {
            this.flwBtnText = "Follow";
            this.newAlert("Connection Error", err.message);
        });
    }

    unfollow() {
        this.flwBtnText = "Loading...";
        this.rndrProv.unfollow(this.username).subscribe(data => {
            if (data.success) {
                this.item.user.followersNo--;
                if (this.item.user.followersNo == 1) {
                    this.flwrsText = "Follower";
                }
                else {
                    this.flwrsText = "Followers";
                }
                this.flwBtnText = "Follow";
            }
            else {
                this.flwBtnText = "Following";
                this.newAlert("Error", data.reason);
            }
        }, err => {
            this.flwBtnText = "Following";
            this.newAlert("Connection Error", err.message);
        });
    }

    followers() {
        if (this.username) {
            this.navCtrl.push(FollowersPage, { username: this.username });
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
