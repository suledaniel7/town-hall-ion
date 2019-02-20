import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, ViewController } from 'ionic-angular';
import { Socket } from 'ngx-socket-io';
import { OrgJsProvider } from '../../providers/org-js/org-js';

@IonicPage()
@Component({
    selector: 'page-org-beat-sel',
    templateUrl: 'org-beat-sel.html',
})
export class OrgBeatSelPage {
    item: any;
    f_name: string;
    l_name: string;
    username: string;
    o_username: string;
    errOc: boolean = false;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private orgJProv: OrgJsProvider,
        private alertCtrl: AlertController,
        private viewCtrl: ViewController,
        private ldCtrl: LoadingController,
        private socket: Socket
    ) {
        this.f_name = this.navParams.get('f_name');
        this.l_name = this.navParams.get('l_name');
        this.username = this.navParams.get('username');
        this.o_username = this.navParams.get('o_username');

        this.load();
    }

    refresh(){
        this.load();
    }

    load(){
        let ld1 = this.ldCtrl.create({
            content: "Loading Town Hall Districts..."
        });

        ld1.present();
        this.orgJProv.serve_dists().subscribe(data => {
            this.errOc = false;
            ld1.dismiss();
            if (data.success) {
                this.item = data;
            }
            else {
                this.newAlert("Error", data.reason);
            }
        }, () => {
            this.errOc = true;
            ld1.dismiss();
            this.newAlert("Connection Error", "Please check your connection");
        });
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad OrgBeatSelPage');
    }

    confirm(b_name: string, b_code: string) {
        let conf_alert = this.alertCtrl.create({
            title: "Report on " + b_name + "?",
            message: `Do you want ${this.f_name} to report on ${b_name}?`,
            buttons: [
                {
                    text: "No"
                },
                {
                    text: "Yes",
                    handler: () => {
                        this.selectBeat(b_code);
                    }
                }
            ]
        });

        conf_alert.present();
    }

    selectBeat(code: string) {
        let ld2 = this.ldCtrl.create({
            content: "Assigning Journalist..."
        });

        ld2.present();
        this.orgJProv.assign_j(this.username, this.o_username, code).subscribe(data => {
            ld2.dismiss();
            if (data.success) {
                this.socket.emit('accept_j', {o_username: this.o_username, j_username: this.username});
                this.socket.emit('assign_j', this.username);
                this.closeModal(true);
            }
            else {
                this.newAlert("Error", data.reason);
            }
        }, () => {
            ld2.dismiss();
            this.newAlert("Connection Error", "Please check your connection");
        });
    }

    closeModal(success: boolean){
        this.viewCtrl.dismiss(success);
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
