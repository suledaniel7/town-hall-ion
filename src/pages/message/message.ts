import { Component } from '@angular/core';
import { Input } from "@angular/core";
import { IonicPage, NavController, NavParams, ModalController, AlertController, LoadingController } from 'ionic-angular';
import { Socket } from 'ngx-socket-io';

import { EditMessagePage } from "../edit-message/edit-message";
import { JRenderPage } from "../j-render/j-render";
import { ORenderPage } from "../o-render/o-render";
import { LRenderPage } from "../l-render/l-render";
import { ConversationPage } from '../conversation/conversation';
import { TagPage } from "../tag/tag";

import { MessageProvider } from '../../providers/message/message';
import { RenderProvider } from '../../providers/render/render';
import { AddressProvider } from '../../providers/address/address';
import { URenderPage } from '../u-render/u-render';

@IonicPage()
@Component({
    selector: 'page-message',
    templateUrl: 'message.html',
})
export class MessagePage {
    @Input() message: any;
    @Input() username: any;
    originator: boolean = false;
    tags: Array<string> = [];
    mentions: Array<string> = [];
    elems: Array<any> = [];
    imgAddress: string;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private modalCtrl: ModalController,
        private messageProv: MessageProvider,
        public alertCtrl: AlertController,
        private ldCtrl: LoadingController,
        private rndrProv: RenderProvider,
        public address: AddressProvider,
        private socket: Socket
    ) {
        this.imgAddress = this.address.getImageApi();
    }

    ionViewDidLoad() {
        console.log("ionViewDidLoad MessagePage");
    }

    ngOnInit() {
        if (this.username == this.message.sender) {
            this.message.sender_name = "You";
            this.originator = true;
        }
        this.message.message = this.extractTags(this.message.message);
        this.message.message = this.extractMentions(this.message.message);
    }

    updateCommCount(m_timestamp: string, num: any){
        let cSpan = document.getElementById(`comm-count-${m_timestamp}`);
        if(cSpan){
            cSpan.innerText = `(${num})`;
        }
    }

    ngAfterViewInit() {
        this.affixIds();
        let timestamp = this.message.m_timestamp;
        this.socket.on('comment_count', (data: any)=>{
            let m_timestamp = data.m_timestamp;
            let num = data.num;
            if(m_timestamp === timestamp){
                this.updateCommCount(m_timestamp, num);
            }
        });
    }

    extractTags(message) {
        let mText = message;

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

                hold_elem = `<span class="tag tg-${this.message.m_timestamp}">${hold_elem}</span>`;
                element = hold_elem;
                this.tags.push(part_elem);
            }
            finalTextArr.push(element);
        });

        //doesn't use the same char as was used to separate
        mText = finalTextArr.join(' ');
        return mText;
    }

    extractMentions(message) {
        let mText = message;
        let mTextArr = mText.split(/\s/);
        let finalTextArr = [];
        mTextArr.forEach((element: string) => {
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
                    hold_elem = `<span class="tag mt-${this.message.m_timestamp}">${hold_elem}</span>${rest_elem}`;
                }
                else {
                    hold_elem = `<span class="tag mt-${this.message.m_timestamp}">${hold_elem}</span>`;
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

    affixIds() {
        //tags
        //the problem with using event listeners is that they get affixed and then when another page is brought up, they don't disappear
        let arrTg = document.getElementsByClassName(`tg-${this.message.m_timestamp}`);
        let ltTg = arrTg.length;
        for (let i = 0; i < ltTg; i++) {
            let tag = arrTg[i].textContent.slice(1);
            let evFn = (event) => {
                this.navCtrl.push(TagPage, { trend: tag });
            }
            // arrTg[i].addEventListener('click', ()=>{
            //     this.navCtrl.push(TagPage, {trend: tag});
            // });
            let curr_el = arrTg[i];
            curr_el.addEventListener('click', evFn, false);
            this.elems.push({
                element: curr_el,
                listener: evFn
            });
        }
        //mentions
        let arrMt = document.getElementsByClassName(`mt-${this.message.m_timestamp}`);
        let ltMt = arrMt.length;
        for (let i = 0; i < ltMt; i++) {
            let mention = arrMt[i].textContent.slice(1);
            arrMt[i].addEventListener('click', () => {
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
        else if (ac == 'u') {
            this.navCtrl.push(URenderPage, { username: username });
        }
    }

    conversation() {
        this.navCtrl.push(ConversationPage, { timestamp: this.message.m_timestamp });
    }

    edit() {
        let mText = document.getElementById(`p-${this.message.m_timestamp}`).innerText;
        let currModal = this.modalCtrl.create(EditMessagePage, { m_item: this.message, m_text: mText });
        currModal.present();
        currModal.onWillDismiss(() => {
            this.messageProv.req_message('m', this.message.m_timestamp).subscribe(data => {
                if (data.success) {
                    this.message = data.item.message;
                }
                else {
                    this.newAlert("Connection Error", data.reason);
                }
            }, err => {
                this.newAlert("Connection Error", err.message);
            });
        });
    }

    del(timestamp) {
        let delConf = this.alertCtrl.create({
            title: "Delete Message",
            message: "Do you want to delete this message? This action cannot be undone",
            buttons: [
                {
                    text: "Cancel"
                },
                {
                    text: "Delete",
                    handler: () => {
                        this.messageProv.del_message(timestamp).subscribe(data => {
                            if (data.success) {
                                for(let i=0; i<3; i++){
                                    if(document.getElementById(timestamp)){
                                        document.getElementById(timestamp).remove();
                                    }
                                }
                            }
                            else {
                                this.newAlert("Error", data.reason);
                            }
                        }, err => {
                            this.newAlert("Connection Error", err.message);
                        });
                    }
                }
            ]
        });

        delConf.present();
    }

    report(timestamp) {
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
                    handler: () => {
                        this.messageProv.report_message(timestamp).subscribe(data => {
                            if (data.success) {
                                sucRepAl.present();
                            }
                            else {
                                this.newAlert("Error", data.reason);
                            }
                        }, err => {
                            this.newAlert("Connection Error", err.message);
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
                else if (u_type == 'u') {
                    this.navCtrl.push(URenderPage, { username: username });
                }
            }
            else {
                this.newAlert("Error", data.reason);
            }
        }, err => {
            ld.dismiss();
            this.newAlert("Connection Error", err.message);
        });
    }

    ngOnDestroy() {
        this.elems.forEach(element => {
            let domEl = element.element;
            let listener = element.listener;
            domEl.removeEventListener('click', listener, false);
        });
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
