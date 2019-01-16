import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

import { JRenderPage } from '../j-render/j-render';
import { ORenderPage } from '../o-render/o-render';
import { LRenderPage } from '../l-render/l-render';

import { ConversationProvider } from '../../providers/conversation/conversation';

@IonicPage()
@Component({
    selector: 'page-conversation',
    templateUrl: 'conversation.html',
})
export class ConversationPage {
    m_timestamp: any;
    c_item: any;
    comment: string;
    btnColor: string = "light";
    validComment: boolean = false;

    constructor(public navCtrl: NavController, public navParams: NavParams, private convProv: ConversationProvider, private ldCtrl: LoadingController) {
        this.m_timestamp = this.navParams.get('timestamp');
        let ld = ldCtrl.create({content: "Loading Conversation..."});
        ld.present();
        convProv.load_conv(this.m_timestamp).subscribe(data => {
            ld.dismiss();
            if(data.success){
                this.c_item = {};
                this.c_item.message = data.message;
                this.c_item.user = data.user;
                this.c_item.comments = data.comments;
            }
            else {
                alert(data.reason);
            }
        }, err => {
            ld.dismiss();
            alert("An error occured. Error " + err.message);
        });
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad ConversationPage');
    }

    count(){
        let cLength = this.comment.length;
        if(cLength > 0 && !/^\s*$/.test(this.comment)){
            this.btnColor = 'primary';
            this.validComment = true;
        }
        else {
            this.btnColor = 'light';
            this.validComment = false;
        }
    }

    post(){
        if(this.validComment){
            let ld1 = this.ldCtrl.create({content: "Posting Comment"});
            ld1.present();
            this.convProv.post_comment(this.comment, this.m_timestamp).subscribe(data => {
                ld1.dismiss();
                if(data.success){
                    this.comment = '';
                    this.validComment = false;
                    this.btnColor = 'light';
                    let h_comms = this.c_item.comments;
                    let n_comm = [data.comment];
                    this.c_item.comments = n_comm.concat(h_comms);
                }
                else {
                    alert(data.reason);
                }
            }, err => {
                ld1.dismiss();
                alert("An error occured. Error " + err.message);
            });
        }
    }

    profile(username, ac){
        if(ac == 'j'){
            this.navCtrl.push(JRenderPage, {username: username});
        }
        else if(ac == 'o'){
            this.navCtrl.push(ORenderPage, {username: username});
        }
        else if(ac == 'l'){
            this.navCtrl.push(LRenderPage, {code: username});
        }
    }

}
