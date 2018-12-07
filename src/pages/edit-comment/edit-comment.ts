import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ConversationProvider } from '../../providers/conversation/conversation';

@IonicPage()
@Component({
    selector: 'page-edit-comment',
    templateUrl: 'edit-comment.html',
})
export class EditCommentPage {
    c_item: any;
    timestamp: any;

    btnColor: string = "primary";
    comment: string = "";
    validMesssage: boolean = true;
    m_type: string = "comment";
    wsp = /^\s*$/;

    constructor(public navCtrl: NavController, public navParams: NavParams, private convProv: ConversationProvider) {
        this.c_item = navParams.get('c_item');
        this.comment = navParams.get('c_text');
        this.timestamp = navParams.get('timestamp');
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad EditCommentPage');
    }

    count(){
        if(this.comment.length > 0 && !this.wsp.test(this.comment)){
            this.validMesssage = true;
            this.btnColor = 'primary';
        }
        else {
            this.validMesssage = false;
            this.btnColor = 'light';
        }
    }

    back() {
        this.navCtrl.pop();
    }

    update() {
        if (this.validMesssage) {
            this.convProv.edit_comment(this.comment, this.timestamp).subscribe(data => {
                if(data.success){
                    this.navCtrl.pop();
                }
                else {
                    alert(data.reason);
                }
            }, err => {
                alert("An error occured. Error: " + err.message);
            });
        }
    }

}
