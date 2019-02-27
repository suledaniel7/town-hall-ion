import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Socket } from 'ngx-socket-io';

import { RenderProvider } from '../../providers/render/render';
import { AddressProvider } from '../../providers/address/address';

import { FollowersPage } from '../followers/followers';
import { ChatPage } from '../chat/chat';

@IonicPage()
@Component({
    selector: 'page-l-render',
    templateUrl: 'l-render.html',
})
export class LRenderPage {
    item: any;
    flwrsText: string;
    flwBtnText: string;
    username: string;
    imgAddress: string;
    plur1Text: string = "Constituents";
    plur2Text: string = "Followers";
    errOc: boolean = false;
    c_username: string;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private rndrProv: RenderProvider,
        private ldCtrl: LoadingController,
        public address: AddressProvider,
        private alCtrl: AlertController,
        private socket: Socket
    ) {
        this.imgAddress = this.address.getImageApi();
        let code = this.navParams.get('code');
        this.username = code;
        this.load();
    }

    refresh(){
        this.load();
    }

    load(){
        let ld = this.ldCtrl.create({ content: "Loading Profile Info" });
        ld.present();
        
        this.rndrProv.render_profile(this.username).subscribe(data => {
            this.errOc = false;
            ld.dismiss();
            if (data.success) {
                this.item = data.item;
                this.c_username = data.item.username;
                this.plurals();
                
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
        console.log('ionViewDidLoad LRenderPage');
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
                
                this.plurals();
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
                
                this.plurals();
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

    plurals() {
        if (this.item) {
            if (this.item.user) {
                let fCount = this.item.const_num;
                if (fCount === 1) {
                    this.plur1Text = "Constituent";
                }
                else {
                    this.plur1Text = "Constituents";
                }
            }
        }
        if (this.item) {
            if (this.item.user) {
                let mCount = this.item.user.followersNo;
                if (mCount === 1) {
                    this.plur2Text = "Follower";
                }
                else {
                    this.plur2Text = "Followers";
                }
            }
        }
    }

    dm(recepient: string){
        this.navCtrl.push(ChatPage, {sender: this.c_username, recepient: recepient});
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
