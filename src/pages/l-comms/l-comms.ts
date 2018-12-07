import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { MessageProvider } from "../../providers/message/message";

@IonicPage()
@Component({
    selector: 'page-l-comms',
    templateUrl: 'l-comms.html',
})
export class LCommsPage {
    item: any;
    btnColor: string = "light";
    validMesssage: boolean = false;
    message: string = "";
    charCount: any = 0;

    constructor(public navCtrl: NavController, public navParams: NavParams, private messageProv: MessageProvider) {
        this.messageProv.load_image().subscribe(data => {
            if(data.success){
                this.item = {
                    avatar: data.avatar
                }
            }
            else {
                alert(data.reason);
            }
        }, err => {
            alert("An error occured. Error: " + err.message);
        });
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad LCommsPage');
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
            this.messageProv.post_message('l', this.message).subscribe(data => {
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
