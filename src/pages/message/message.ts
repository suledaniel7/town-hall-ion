import { Component } from '@angular/core';
import { Input } from "@angular/core";
import { IonicPage, NavController, NavParams, ModalController, AlertController } from 'ionic-angular';

import { EditMessagePage } from "../edit-message/edit-message";
import { JRenderPage } from "../j-render/j-render";
import { ORenderPage } from "../o-render/o-render";
import { LRenderPage } from "../l-render/l-render";
import { ConversationPage } from '../conversation/conversation';

import { MessageProvider } from '../../providers/message/message';

@IonicPage()
@Component({
    selector: 'page-message',
    templateUrl: 'message.html',
})
export class MessagePage {
    @Input() message: any;
    @Input() username: any;
    originator: boolean = false;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private modalCtrl: ModalController,
        private messageProv: MessageProvider,
        public alertCtrl: AlertController
        ) {
        
    }

    ionViewDidLoad() {
        console.log("ionViewDidLoad MessagePage");
    }

    ngOnInit(){
        if(this.username == this.message.sender){
            this.message.sender_name = "You";
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

    conversation(){
        this.navCtrl.push(ConversationPage, {timestamp: this.message.m_timestamp})
    }

    edit(){
        let mText = document.getElementById(`p-${this.message.m_timestamp}`).innerText;
        let currModal = this.modalCtrl.create(EditMessagePage, {m_item: this.message, m_text: mText});
        currModal.present();
        currModal.onWillDismiss(()=>{
            this.messageProv.req_message('m', this.message.m_timestamp).subscribe(data => {
                if(data.success){
                    this.message = data.item.message;
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
            title: "Delete Message",
            message: "Do you want to delete this message? This action cannot be undone",
            buttons: [
                {
                    text: "Cancel"
                },
                {
                    text: "Delete",
                    handler: ()=>{
                        this.messageProv.del_message(timestamp).subscribe(data => {
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
            title: "Message Reported",
            message: "We appreciate you taking out time to report this message. Our Community Moderators will have a look at it and take action where necessary. Thank you.",
            buttons: ['Okay']
        });
        let repConf = this.alertCtrl.create({
            title: "Report Message",
            message: "Do you want to report this Message for a Community Violation?",
            buttons: [
                {
                    text: "Cancel"
                },
                {
                    text: "Report",
                    handler: ()=>{
                        this.messageProv.report_message(timestamp).subscribe(data => {
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
