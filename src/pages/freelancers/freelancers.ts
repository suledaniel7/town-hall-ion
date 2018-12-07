import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { FHomePage } from "../f-home/f-home";
import { FProfilePage } from "../f-profile/f-profile";
import { SearchPage } from "../search/search";

@IonicPage()
@Component({
    selector: 'page-freelancers',
    templateUrl: 'freelancers.html',
})
export class FreelancersPage {
    tab1Root = FHomePage;
    tab2Root = SearchPage;
    tab3Root = FProfilePage;

    constructor(public navCtrl: NavController, public navParams: NavParams) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad FreelancersPage');
    }

}
