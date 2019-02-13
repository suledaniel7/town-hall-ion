import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Socket } from 'ngx-socket-io';

import { ProfileProvider } from "../../providers/profile/profile";

@IonicPage()
@Component({
    selector: 'page-o-journos',
    templateUrl: 'o-journos.html',
})
export class OJournosPage {
    item: any;
    errOcc = false;
    username: string;
    pending_reqs: boolean;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private profProv: ProfileProvider,
        private alCtrl: AlertController,
        private socket: Socket
    ) {
        this.load();
    }

    ionViewDidLoad() {

    }

    insertJ(journo: any) {
        if (this.item) {
            if (this.item.journos) {
                let index = -1;
                let changed_index = false;
                let c_f_l = journo.l_name[0];
                let journos = this.item.journos;
                let lt = journos.length;
                for(let i=0; i<lt; i++){
                    let curr_j = journos[i];
                    let tmp_f_l = curr_j.l_name[0];
                    if(c_f_l < tmp_f_l && !changed_index){
                        index = i;
                        changed_index = true;
                        break;
                    }
                }
                if(index === -1){
                    this.item.journos.push(journo);
                }
                else {
                    let pre_arr = journos.slice(0, index);
                    pre_arr.push(journo);
                    let post_arr = journos.slice(index);
                    this.item.journos = pre_arr.concat(post_arr);
                }
            }
        }
    }

    appendReq(journo: any){
        if(this.item){
            if(this.item.user.pending_reqs){
                this.item.user.pending_reqs.push(journo);
            }
        }
    }

    load() {
        this.profProv.o_profile_j().subscribe(data => {
            if (data.success) {
                this.errOcc = false;
                this.item = data.item;
                this.username = this.item.user.username;
                this.socket.emit('conn', {username: data.item.user.username});
                this.socket.on('j_req', (ret_d: any)=>{
                    if(ret_d.page === 'j'){
                        this.appendReq(ret_d.journo);
                    }
                });
                this.socket.on('new_j', (ret_d: any)=>{
                    if(ret_d.page === 'j'){
                        this.insertJ(ret_d.journo);
                    }
                });
            }
            else {
                this.errOcc = true;
                this.newAlert("Error", data.reason);
            }
        }, (err) => {
            this.errOcc = true;
            this.newAlert("Connection Error", err.message);
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
