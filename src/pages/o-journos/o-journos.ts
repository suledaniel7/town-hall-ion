import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Socket } from 'ngx-socket-io';

import { ProfileProvider } from "../../providers/profile/profile";
import { OrgJsProvider } from '../../providers/org-js/org-js';

@IonicPage()
@Component({
    selector: 'page-o-journos',
    templateUrl: 'o-journos.html',
})
export class OJournosPage {
    item: any;
    username: string;
    pending_reqs: boolean;
    exp: string;
    errOc: boolean = false;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private profProv: ProfileProvider,
        private alCtrl: AlertController,
        private jReqProv: OrgJsProvider,
        private socket: Socket
    ) {
        this.load();
    }

    refresh() {
        this.load();
    }

    ionViewDidLoad() {

    }

    checkJs() {
        if (this.item) {
            if ((this.item.journos && !this.item.pending_reqs) || (!this.item.journos && this.item.pending_reqs)) {
                let len = this.item.journos.length;
                if (len > 0) {
                    this.exp = null;
                }
                else {
                    this.exp = "You do not yet have any journalists registered. Any requests from journalists will be shown here.";
                }
            }
            else if (this.item.journos) {
                if (this.item.journos.length > 0) {
                    this.exp = null;
                }
            }
            else {
                this.exp = "You do not yet have any journalists registered. Any requests from journalists will be shown here.";
            }
        }
        else {
            this.exp = "You do not yet have any journalists registered. Any requests from journalists will be shown here.";
        }

        if(this.item.pending_reqs){
            if(this.item.pending_requests){
                let req_l = this.item.pending_requests.length;
                if(req_l === 0){
                    this.item.pending_reqs = false;
                }
                else {
                    this.item.pending_reqs = true;
                }
            }
            else {
                this.item.pending_reqs = false;
            }
        }
        else {
            if(this.item.pending_requests){
                let req_l = this.item.pending_requests.length;
                if(req_l > 0){
                    this.item.pending_reqs = true;
                }
                else {
                    this.item.pending_reqs = false;
                }
            }
        }
    }

    insertJ(journo: any) {
        if (this.item) {
            if (this.item.journos) {
                let index = -1;
                let changed_index = false;
                let c_f_l = journo.l_name[0];
                let journos = this.item.journos;
                let lt = journos.length;
                for (let i = 0; i < lt; i++) {
                    let curr_j = journos[i];
                    let tmp_f_l = curr_j.l_name[0];
                    if (c_f_l < tmp_f_l && !changed_index) {
                        index = i;
                        changed_index = true;
                        break;
                    }
                }
                if (index === -1) {
                    this.item.journos.push(journo);
                }
                else {
                    let pre_arr = journos.slice(0, index);
                    pre_arr.push(journo);
                    let post_arr = journos.slice(index);
                    this.item.journos = pre_arr.concat(post_arr);
                }
            }
            else {
                this.item.journos = [journo];
            }
            this.checkJs();
        }
    }

    appendReq(journo: any) {
        if (this.item) {
            if (this.item.pending_requests) {
                this.item.pending_reqs = true;
                this.item.pending_requests.push(journo);
            }
            else {
                this.item.pending_reqs = true;
                this.item.pending_requests = [journo];
            }
        }
    }

    load() {
        this.profProv.o_profile_j().subscribe(data => {
            this.errOc = false;
            if (data.success) {
                this.item = data.item;
                this.username = this.item.user.username;
                this.item.pending_requests = this.item.user.pending_reqs;
                this.checkJs();
                this.socket.on('j_req', (ret_d: any) => {
                    if (ret_d.page === 'j') {
                        this.appendReq(ret_d.journo);
                        this.checkJs();
                    }
                });
                this.socket.on('new_j', (ret_d: any) => {
                    if (ret_d.page === 'j') {
                        this.insertJ(ret_d.journo);
                        this.checkJs();
                    }
                });
                this.socket.on('rem_req', (username: any) => {
                    if (document.getElementById(`j-req-${username}`)) {
                        if(this.item.pending_requests){
                            for(let i=0; i<this.item.pending_requests.length; i++){
                                let p_r = this.item.pending_requests[i];
                                if(p_r.username === username){
                                    this.item.pending_requests.splice(i, 1);
                                }
                            }
                        }
                        this.checkJs();
                    }
                });
                this.socket.on('j_post', (username: string) => {
                    this.updateTimestamp(username);
                });
                this.socket.on('j_removed', (username: string) => {
                    if (document.getElementById(`o-journo-${username}`)) {
                        document.getElementById(`o-journo-${username}`).remove();
                        this.checkJs();
                    }
                });
            }
            else {
                this.newAlert("Error", data.reason);
            }
        }, () => {
            this.errOc = true;
            this.newAlert("Connection Error", "Please check your connection");
        });
    }

    updateTimestamp(username: string) {
        let timeSpan = document.getElementById(`time-j-${username}`);

        this.jReqProv.req_j_msgs(username).subscribe(data => {
            if (data.success) {
                if (timeSpan && data.msg) {
                    timeSpan.innerText = `${data.time}, ${data.date}`;
                }
                else if (!data.msg && timeSpan) {
                    timeSpan.innerText = 'N/A';
                }
            }
        });
    }

    newAlert(title: string, text: string) {
        let newAl = this.alCtrl.create({
            title: title,
            subTitle: text,
            buttons: ['Ok']
        });

        return newAl.present();
    }

}
