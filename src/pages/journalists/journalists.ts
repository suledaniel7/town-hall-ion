import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { JHomePage } from "../j-home/j-home";
import { JOrgPage } from "../j-org/j-org";
import { JProfilePage } from "../j-profile/j-profile";
import { SearchPage } from "../search/search";

@IonicPage()
@Component({
    selector: 'page-journalists',
    templateUrl: 'journalists.html',
})
export class JournalistsPage {
    tab1Root = JHomePage;
    tab2Root = SearchPage;
    tab3Root = JOrgPage;
    tab4Root = JProfilePage;

    constructor(public navCtrl: NavController, public navParams: NavParams) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad JournalistsPage');
    }

}
