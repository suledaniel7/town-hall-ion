import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController, AlertController } from 'ionic-angular';
import { ServeProvider } from '../../providers/serve/serve';

@IonicPage()
@Component({
    selector: 'page-change-beat',
    templateUrl: 'change-beat.html',
})
export class ChangeBeatPage {
    district: string = null;
    init_dist: string;
    item: object;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public viewCtrl: ViewController,
        private ldCtrl: LoadingController,
        private alCtrl: AlertController,
        private serve: ServeProvider
    ) {
        this.district = this.navParams.get('dist');
        this.init_dist = this.navParams.get('dist');

        let ld1 = this.ldCtrl.create({ content: "Loading Districts" });
        ld1.present();
        this.serve.serve_districts().subscribe(data => {
            ld1.dismiss();
            if (data.success) {
                this.item = data;
            }
            else {
                this.newAlert("Error", data.reason);
            }
        }, (err) => {
            ld1.dismiss();
            this.newAlert("Connection Error", err.message);
        });
    }

    select(code: string) {
        let curr_dist = 'dist-' + this.district;
        if (document.getElementById(curr_dist)) {
            document.getElementById(curr_dist).className = 'item item-block item-md';
        }
        if (document.getElementById(`dist-${code}`)) {
            document.getElementById(`dist-${code}`).className = 'item item-block item-md activeBeat';
        }
        this.district = code;
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad ChangeBeatPage');
    }

    closeModal(changed) {
        if (changed) {
            this.viewCtrl.dismiss({ district: this.district });
        }
        else {
            this.viewCtrl.dismiss({ district: this.init_dist });
        }
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
