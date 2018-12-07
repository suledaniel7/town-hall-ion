import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { RenderProvider } from '../../providers/render/render';

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

    constructor(public navCtrl: NavController, public navParams: NavParams, private rndrProv: RenderProvider, private ldCtrl: LoadingController) {
        let ld = this.ldCtrl.create({content: "Loading Profile Info"});
        ld.present();
        let code = this.navParams.get('code');
        this.username = code;        
        this.rndrProv.render_profile(code).subscribe(data => {
            ld.dismiss();
            if (data.success) {
                this.item = data.item;
                if(this.item.user.followersNo == 1){
                    this.flwrsText = "Constituent";
                }
                else {
                    this.flwrsText = "Constituents";
                }
                if(this.item.following){
                    this.flwBtnText = "Following";
                }
                else {
                    this.flwBtnText = "Follow";
                }
                if(!this.item.canFollow){
                    document.getElementById('fbtn').setAttribute('disabled', 'disabled');
                }
            }
            else {
                alert(data.reason);
            }
        }, err => {
            ld.dismiss();
            alert("An error occured. Error: " + err.message);
        });
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad LRenderPage');
    }

    fClick(){
        if(this.flwBtnText == 'Follow'){
            this.follow();
        }
        else if(this.flwBtnText == "Following"){
            this.unfollow();
        }
    }

    follow(){
        this.flwBtnText = "Loading...";
        this.rndrProv.follow(this.username).subscribe(data => {
            if(data.success){
                this.item.user.followersNo++;
                if(this.item.user.followersNo == 1){
                    this.flwrsText = "Constituent";
                }
                else {
                    this.flwrsText = "Constituents";
                }
                this.flwBtnText = "Following";
            }
            else {
                this.flwBtnText = "Follow";
                alert(data.reason);
            }
        }, err => {
            this.flwBtnText = "Follow";
            alert("An error occured. Error: " + err.message);
        });
    }

    unfollow(){
        this.flwBtnText = "Loading...";
        this.rndrProv.unfollow(this.username).subscribe(data => {
            if(data.success){
                this.item.user.followersNo--;
                if(this.item.user.followersNo = 1){
                    this.flwrsText = "Constituent";
                }
                else {
                    this.flwrsText = "Constituents";
                }
                this.flwBtnText = "Follow";
            }
            else {
                this.flwBtnText = "Following";
                alert(data.reason);
            }
        }, err => {
            this.flwBtnText = "Following";
            alert("An error occured. Error: " + err.message);
        });
    }
}
