import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { LHomePage } from "../l-home/l-home";
import { LProfilePage } from "../l-profile/l-profile";
import { SearchPage } from "../search/search";
import { LLegisPage } from '../l-legis/l-legis';

@IonicPage()
@Component({
    selector: 'page-legislators',
    templateUrl: 'legislators.html',
})
export class LegislatorsPage {
    tab1Root = LHomePage;
    tab2Root = SearchPage;
    tab3Root = LLegisPage;
    tab4Root = LProfilePage;

    constructor(public navCtrl: NavController, public navParams: NavParams) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad LegislatorsPage');
    }

}
