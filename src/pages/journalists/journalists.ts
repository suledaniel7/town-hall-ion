import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { JBeatPage } from "../j-beat/j-beat";
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
    tab2Root = JBeatPage;
    tab3Root = SearchPage;
    tab4Root = JOrgPage;
    tab5Root = JProfilePage;

    constructor(public navCtrl: NavController, public navParams: NavParams) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad JournalistsPage');
    }

}
