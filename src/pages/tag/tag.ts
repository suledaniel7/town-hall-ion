import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { SearchProvider } from '../../providers/search/search';

@IonicPage()
@Component({
    selector: 'page-tag',
    templateUrl: 'tag.html',
})
export class TagPage {
    item: any;
    trend: any;
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private searchProv: SearchProvider,
        private alCtrl: AlertController
    ) {
        let trend = this.navParams.get('trend');
        this.trend = trend;
        this.searchProv.search('tag', trend).subscribe(data => {
            if (data.success) {
                this.item = data.results;
            }
            else {
                this.newAlert("Error Loading tags", data.reason);
            }
        }, () => {
            this.newAlert("Connection Error", "Please check your connection");
        });
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad TagPage');
    }

    newAlert(title: string, text: string){
        let newAl = this.alCtrl.create({
            title: title,
            subTitle: text,
            buttons: ['Ok']
        });

        return newAl.present();
    }
}
