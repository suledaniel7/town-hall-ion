import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Socket } from 'ngx-socket-io';

import { RenderProvider } from '../../providers/render/render';
import { AddressProvider } from '../../providers/address/address';

import { FollowersPage } from '../followers/followers';
import { ChatPage } from '../chat/chat';

@IonicPage()
@Component({
    selector: 'page-j-render',
    templateUrl: 'j-render.html',
})
export class JRenderPage {
    item: any;
    flwrsText: string;
    flwBtnText: string;
    username: string;
    imgAddress: string;
    errOc: boolean = false;
    c_username: string;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private rndrProv: RenderProvider,
        private ldCtrl: LoadingController,
        private alertCtrl: AlertController,
        public address: AddressProvider,
        private socket: Socket
    ) {
        this.imgAddress = this.address.getImageApi();
        this.load();
    }

    refresh(){
        this.load();
    }

    load(){
        let ld = this.ldCtrl.create({ content: "Loading Profile Info" });
        ld.present();
        let username = this.navParams.get('username');
        this.username = username;
        this.rndrProv.render_profile(username).subscribe(data => {
            this.errOc = false;
            ld.dismiss();
            if (data.success) {
                this.item = data.item;
                this.c_username = data.item.username;
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
                this.newAlert("Error", data.reason);
            }
        }, () => {
            this.errOc = true;
            ld.dismiss();
            this.newAlert("Connection Error", "Please check your connection");
        });
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad JRenderPage');
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
                this.socket.emit('changed_profile', this.username);
                this.socket.emit('follow');
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
        }, () => {
            this.flwBtnText = "Follow";
            this.newAlert("Connection Error", "Please check your connection");
        });
    }

    unfollow() {
        this.flwBtnText = "Loading...";
        this.rndrProv.unfollow(this.username).subscribe(data => {
            if (data.success) {
                this.socket.emit('changed_profile', this.username);
                this.socket.emit('follow');
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
        }, () => {
            this.flwBtnText = "Following";
            this.newAlert("Connection Error", "Please check your connection");
        });
    }

    followers() {
        if (this.username) {
            this.navCtrl.push(FollowersPage, { username: this.username });
        }
    }

    dm(recepient: string){
        this.navCtrl.push(ChatPage, {sender: this.c_username, recepient: recepient});
    }
    
    newAlert(title: string, text: string) {
        let newAl = this.alertCtrl.create({
            title: title,
            subTitle: text,
            buttons: ['Ok']
        });

        return newAl.present();
    }
}
