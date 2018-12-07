import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController } from 'ionic-angular';

import { EditCommentPage } from "../edit-comment/edit-comment";

import { JRenderPage } from "../j-render/j-render";
import { ORenderPage } from "../o-render/o-render";
import { LRenderPage } from "../l-render/l-render";

import { ConversationProvider } from "../../providers/conversation/conversation";

@IonicPage()
@Component({
    selector: 'page-comment',
    templateUrl: 'comment.html',
})
export class CommentPage {
    @Input() comment: any;
    @Input() username: any;
    originator: boolean = false;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private modalCtrl: ModalController,
        private convProv: ConversationProvider,
        public alertCtrl: AlertController
        ) {
        
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad CommentPage');
    }

    ngOnInit(){
        if(this.username == this.comment.sender){
            this.comment.sender_name = "You";
            this.originator = true;
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

    edit(){
        let cText = document.getElementById(`p-${this.comment.c_timestamp}`).innerText;
        let currModal = this.modalCtrl.create(EditCommentPage, {c_item: this.comment, c_text: cText, timestamp: this.comment.c_timestamp});
        currModal.present();
        currModal.onWillDismiss(()=>{
            this.convProv.req_comment(this.comment.c_timestamp).subscribe(data => {
                if(data.success){
                    this.comment = data.item.comment;
                }
                else {
                    alert(data.reason);
                }
            }, err => {
                alert("An error occured. Error: " + err.message);
            });
        });
    }

    del(timestamp){
        let delConf = this.alertCtrl.create({
            title: "Delete Comment",
            message: "Do you want to delete this comment? This action cannot be undone",
            buttons: [
                {
                    text: "Cancel"
                },
                {
                    text: "Delete",
                    handler: ()=>{
                        this.convProv.del_comment(timestamp).subscribe(data => {
                            if(data.success){
                                document.getElementById(timestamp).remove();
                            }
                            else {
                                alert(data.reason);
                            }
                        }, err => {
                            alert("An error occured. Error: " + err.message);
                        });
                    }
                }
            ]
        });

        delConf.present();
    }

    report(timestamp){
        let sucRepAl = this.alertCtrl.create({
            title: "Comment Reported",
            message: "We appreciate you taking out time to report this comment. Our Community Moderators will have a look at it and take action where necessary. Thank you.",
            buttons: ['Okay']
        });
        let repConf = this.alertCtrl.create({
            title: "Report Comment",
            message: "Do you want to report this Comment for a Community Violation?",
            buttons: [
                {
                    text: "Cancel"
                },
                {
                    text: "Report",
                    handler: ()=>{
                        this.convProv.report_comment(timestamp).subscribe(data => {
                            if(data.success){
                                sucRepAl.present();
                            }
                            else {
                                alert(data.reason);
                            }
                        }, err => {
                            alert("An error occured. Error: " + err.message);
                        });
                    }
                }
            ]
        });

        repConf.present();
    }
}
