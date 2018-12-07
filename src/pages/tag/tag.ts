import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { SearchProvider } from '../../providers/search/search';

@IonicPage()
@Component({
    selector: 'page-tag',
    templateUrl: 'tag.html',
})
export class TagPage {
    item: any;
    trend: any;
    constructor(public navCtrl: NavController, public navParams: NavParams, private searchProv: SearchProvider) {
        let trend = this.navParams.get('trend');
        this.trend = trend;
        this.searchProv.search('tag', trend).subscribe(data => {
            if(data.success){
                this.item = data.results;
            }
            else {
                alert(data.reason);
            }
        }, err => {
            alert("An error occured. Error: " + err.message);
        });
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad TagPage');
    }

}
