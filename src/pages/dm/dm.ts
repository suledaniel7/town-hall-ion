import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
    selector: 'page-dm',
    templateUrl: 'dm.html',
})
export class DmPage {
    @Input() username: string;
    @Input() dm: any;
    position: string = 'left';

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams
    ) {

    }

    ngAfterViewInit() {
        if (this.dm.sender_username === this.username) {
            this.position = 'right';
        }
        else {
            this.position = 'left';
        }
    }

    ionViewDidLoad() {

    }

}
