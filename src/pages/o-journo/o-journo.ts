import { Component } from '@angular/core';
import { Input } from "@angular/core";
import { IonicPage, NavController, NavParams, ModalController, LoadingController, AlertController } from 'ionic-angular';
import { Socket } from 'ngx-socket-io';

import { AddressProvider } from '../../providers/address/address';
import { OrgJsProvider } from '../../providers/org-js/org-js';
import { OrgReassignBeatPage } from '../org-reassign-beat/org-reassign-beat';

@IonicPage()
@Component({
    selector: 'page-o-journo',
    templateUrl: 'o-journo.html',
})
export class OJournoPage {
    imgAddress: string;
    @Input() journalist: any;
    username: string;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public address: AddressProvider,
        private ldCtrl: LoadingController,
        private alCtrl: AlertController,
        private jReqProv: OrgJsProvider,
        private mdCtrl: ModalController,
        private socket: Socket
    ) {
        this.imgAddress = this.address.getImageApi();
    }

    ngAfterViewInit() {
        this.username = this.journalist.username;

        let timeSpan = document.getElementById(`time-j-${this.username}`);

        this.jReqProv.req_j_msgs(this.username).subscribe(data => {
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

    beatChange() {
        let md1 = this.mdCtrl.create(OrgReassignBeatPage, {
            f_name: this.journalist.f_name,
            l_name: this.journalist.l_name,
            username: this.journalist.username,
            o_username: this.journalist.organisation
        });
        md1.onDidDismiss((data)=>{
            if(data.success){
                this.journalist.beatDets.name = data.dist_name;

                this.journalist.beatDets.type = data.type;
                this.journalist.beatDets.rep = data.rep;
            }
        });
        md1.present();
    }

    confirm() {
        let conf_alert = this.alCtrl.create({
            title: `Remove Journalist`,
            message: `Do you want to remove ${this.journalist.full_name}?`,
            buttons: [
                {
                    text: "No"
                },
                {
                    text: "Yes",
                    handler: () => {
                        this.removeJ();
                    }
                }
            ]
        });

        conf_alert.present();
    }

    removeJ() {
        let ld1 = this.ldCtrl.create({content: "Removing Journalist"});
        ld1.present();
        this.jReqProv.remove_j(this.journalist.username).subscribe(data => {
            ld1.dismiss();
            if(data.success){
                document.getElementById(`o-journo-${this.journalist.username}`).className = 'hidden';
                this.socket.emit('changed_profile', this.username);
            }
            else {
                this.newAlert("Error", data.reason);
            }
        }, err => {
            ld1.dismiss();
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
