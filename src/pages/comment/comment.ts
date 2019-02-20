import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController, LoadingController } from 'ionic-angular';
import { Socket } from 'ngx-socket-io';

import { EditCommentPage } from "../edit-comment/edit-comment";
import { JRenderPage } from "../j-render/j-render";
import { ORenderPage } from "../o-render/o-render";
import { LRenderPage } from "../l-render/l-render";
import { TagPage } from "../tag/tag";
import { URenderPage } from '../u-render/u-render';

import { ConversationProvider } from "../../providers/conversation/conversation";
import { RenderProvider } from '../../providers/render/render';
import { AddressProvider } from '../../providers/address/address';

@IonicPage()
@Component({
    selector: 'page-comment',
    templateUrl: 'comment.html',
})
export class CommentPage {
    @Input() comment: any;
    @Input() username: any;
    originator: boolean = false;
    tags: Array<string> = [];
    mentions: Array<string> = [];
    imgAddress: string;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private modalCtrl: ModalController,
        private convProv: ConversationProvider,
        public alertCtrl: AlertController,
        private ldCtrl: LoadingController,
        private rndrProv: RenderProvider,
        public address: AddressProvider,
        private socket: Socket
    ) {
        this.imgAddress = this.address.getImageApi();
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad CommentPage');
    }

    ngOnInit() {
        if (this.username == this.comment.sender) {
            this.comment.sender_name = "You";
            this.originator = true;
        }
        this.comment.comment = this.extractTags(this.comment.comment);
        this.comment.comment = this.extractMentions(this.comment.comment);
    }

    ngAfterViewInit(){
        this.affixIds();
    }

    extractTags(comment) {
        let mText = comment;

        let mTextArr = mText.split(/\s/);
        let finalTextArr = [];
        mTextArr.forEach(element => {
            if (element[0] == '#' && element.slice(1).search(/\W/) != 0) {
                let hold_elem = element[0];
                let part_elem = element.slice(1);
                let end = part_elem.search(/\W/);
                if (end == -1) {
                    hold_elem = '#' + part_elem;
                }
                else {
                    hold_elem += part_elem.slice(0, end);
                }

                hold_elem = `<span class="tag tg-${this.comment.c_timestamp}">${hold_elem}</span>`;
                element = hold_elem;
                this.tags.push(part_elem);
            }
            finalTextArr.push(element);
        });

        //doesn't use the same char as was used to separate
        mText = finalTextArr.join(' ');
        return mText;
    }

    extractMentions(comment) {
        let mText = comment;
        let mTextArr = mText.split(/\s/);
        let finalTextArr = [];
        mTextArr.forEach((element: string)=> {
            if (element[0] == '@' && element.slice(1).search(/\W/) != 0) {
                let hold_elem = element[0];
                let part_elem = element.slice(1);
                let end = part_elem.search(/\W/);
                let rest_elem = null;
                if (end == -1) {
                    hold_elem = '@' + part_elem;
                }
                else {
                    rest_elem = part_elem.slice(end);
                    part_elem = part_elem.slice(0, end);
                    hold_elem = '@' + part_elem;
                }

                if (rest_elem) {
                    hold_elem = `<span class="tag mt-${this.comment.c_timestamp}">${hold_elem}</span>${rest_elem}`;
                }
                else {
                    hold_elem = `<span class="tag mt-${this.comment.c_timestamp}">${hold_elem}</span>`;
                }
                this.mentions.push(part_elem);
                element = hold_elem;
            }
            finalTextArr.push(element);
        });

        //doesn't use the same char as was used to separate
        mText = finalTextArr.join(' ');
        return mText;
    }

    affixIds(){
        //tags
        let arrTg = document.getElementsByClassName(`tg-${this.comment.c_timestamp}`);
        let ltTg = arrTg.length;
        for(let i=0; i<ltTg; i++){
            let tag = arrTg[i].textContent.slice(1);
            arrTg[i].addEventListener('click', ()=>{
                this.navCtrl.push(TagPage, {trend: tag});
            });
        }
        //mentions
        let arrMt = document.getElementsByClassName(`mt-${this.comment.c_timestamp}`);
        let ltMt = arrMt.length;
        for(let i=0; i<ltMt; i++){
            let mention = arrMt[i].textContent.slice(1);
            arrMt[i].addEventListener('click', ()=> {
                this.blind_profile(mention);
            });
        }
    }

    profile(username, ac) {
        if (ac == 'j') {
            this.navCtrl.push(JRenderPage, { username: username });
        }
        else if (ac == 'o') {
            this.navCtrl.push(ORenderPage, { username: username });
        }
        else if (ac == 'l') {
            this.navCtrl.push(LRenderPage, { code: username });
        }
        else if(ac == 'u'){
            this.navCtrl.push(URenderPage, {username: username});
        }
    }

    edit() {
        let cText = document.getElementById(`p-${this.comment.c_timestamp}`).innerText;
        let currModal = this.modalCtrl.create(EditCommentPage, { c_item: this.comment, c_text: cText, timestamp: this.comment.c_timestamp });
        currModal.present();
        currModal.onWillDismiss(() => {
            this.convProv.req_comment(this.comment.c_timestamp).subscribe(data => {
                if (data.success) {
                    this.comment = data.item.comment;
                }
                else {
                    this.newAlert("Error", data.reason);
                }
            }, () => {
                this.newAlert("Connection Error", "Please check your connection");
            });
        });
    }

    del(timestamp) {
        let delConf = this.alertCtrl.create({
            title: "Delete Comment",
            message: "Do you want to delete this comment? This action cannot be undone",
            buttons: [
                {
                    text: "Cancel"
                },
                {
                    text: "Delete",
                    handler: () => {
                        this.convProv.del_comment(timestamp).subscribe(data => {
                            if (data.success) {
                                let m_timestamp = this.comment.m_timestamp;
                                this.socket.emit('comment', {m_timestamp: m_timestamp});
                                document.getElementById(timestamp).remove();
                            }
                            else {
                                this.newAlert("Error", data.reason);
                            }
                        }, () => {
                            this.newAlert("Connection Error", "Please check your connection");
                        });
                    }
                }
            ]
        });

        delConf.present();
    }

    report(timestamp) {
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
                    handler: () => {
                        this.convProv.report_comment(timestamp).subscribe(data => {
                            if (data.success) {
                                sucRepAl.present();
                            }
                            else {
                                this.newAlert("Error", data.reason);
                            }
                        }, () => {
                            this.newAlert("Connection Error", "Please check your connection");
                        });
                    }
                }
            ]
        });

        repConf.present();
    }

    blind_profile(username) {
        //find u_type
        //push page or this.newAlert error
        let ld = this.ldCtrl.create({ content: "Loading User" });
        ld.present();
        this.rndrProv.req_type(username).subscribe(data => {
            ld.dismiss();
            if (data.success) {
                let u_type = data.u_type;
                if (u_type == 'j') {
                    this.navCtrl.push(JRenderPage, { username: username });
                }
                else if (u_type == 'l') {
                    this.navCtrl.push(LRenderPage, { code: username });
                }
                else if (u_type == 'o') {
                    this.navCtrl.push(ORenderPage, { username: username });
                }
                else if(u_type == 'u'){
                    this.navCtrl.push(URenderPage, {username: username});
                }
            }
            else {
                this.newAlert("Error", data.reason);
            }
        }, () => {
            ld.dismiss();
            this.newAlert("Connection Error", "Please check your connection");
        });
    }

    newAlert(title: string, text: string){
        let newAl = this.alertCtrl.create({
            title: title,
            subTitle: text,
            buttons: ['Ok']
        });

        return newAl.present();
    }
}
