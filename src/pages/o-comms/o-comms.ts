import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ProfileProvider } from "../../providers/profile/profile";
import { MessageProvider } from "../../providers/message/message";

@IonicPage()
@Component({
    selector: 'page-o-comms',
    templateUrl: 'o-comms.html',
})
export class OCommsPage {
    item: any;
    btnColor: string = "light";
    validMesssage: boolean = false;
    message: string = "";
    charCount: any = 0;
    selBeats: any = "all";

    constructor(public navCtrl: NavController, public navParams: NavParams, private profProv: ProfileProvider, private messageProv: MessageProvider) {
        this.profProv.o_profile_c().subscribe(data => {
            if(data.success){
                this.item = data.item;
            }
            else {
                alert(data.reason);
            }
        }, err => {
            alert("An error occured. Error: " + err.message + "We'll keep retrying");
            this.autoretry();
        });
    }

    autoretry(){
        this.profProv.o_profile_c().subscribe(data => {
            if(data.success){
                this.item = data.item;
            }
            else {
                this.autoretry();
            }
        }, err => {
            alert(err.message);
            this.autoretry();
        });
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad OCommsPage');
    }

    back(){
        this.navCtrl.pop();
    }

    count(){
        this.charCount = this.message.length;
        let wsp = /^\s*$/;
        if(this.charCount > 0 && this.charCount <= 360 && !wsp.test(this.message)){
            this.btnColor = "primary";
            this.validMesssage = true;
        }
        else {
            this.btnColor = "light";
            this.validMesssage = false;
        }
    }

    post(){
        if(this.validMesssage){
            if(this.selBeats == 'all'){
                this.selBeats = ['all'];
            }
            this.messageProv.post_message('o', this.message, null, this.selBeats).subscribe(data => {
                if(data.success){
                    this.navCtrl.pop();
                }
                else {
                    alert(data.reason);
                }
            }, err => {
                alert("An error occured. Error: "+err.message);
            });
        }
    }

}
