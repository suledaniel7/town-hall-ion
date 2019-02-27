import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { OHomePage } from "../o-home/o-home";
import { OJournosPage } from "../o-journos/o-journos";
import { OProfilePage } from "../o-profile/o-profile";
import { SearchPage } from "../search/search";

@IonicPage()
@Component({
    selector: 'page-organisations',
    templateUrl: 'organisations.html',
})
export class OrganisationsPage {

    tab1Root = OHomePage;
    tab2Root = SearchPage;
    tab3Root = OJournosPage;
    tab4Root = OProfilePage;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams
    ) {
    }


    ionViewDidLoad() {

    }

}
