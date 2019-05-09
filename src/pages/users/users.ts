import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { UHomePage } from "../u-home/u-home";
import { UProfilePage } from "../u-profile/u-profile";
import { SearchPage } from "../search/search";
// import { ULegisPage } from '../u-legis/u-legis';

@IonicPage()
@Component({
    selector: 'page-users',
    templateUrl: 'users.html',
})
export class UsersPage {

    tab1Root = UHomePage;
    tab2Root = SearchPage;
    // tab3Root = ULegisPage;
    tab4Root = UProfilePage;

    constructor(public navCtrl: NavController, public navParams: NavParams) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad UsersPage');
    }

}
