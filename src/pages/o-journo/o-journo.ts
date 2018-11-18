import { Component } from '@angular/core';
import { Input } from "@angular/core";
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
    selector: 'page-o-journo',
    templateUrl: 'o-journo.html',
})
export class OJournoPage {
    @Input() journalist: any;
    constructor(public navCtrl: NavController, public navParams: NavParams) {
    }

    ionViewDidLoad() {
        if(this.journalist.followersNo == '1'){
            document.getElementById('plur').innerText = 'Follower';
        }
    }

}
