import { Component } from '@angular/core';
import { Input } from "@angular/core";
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { JRenderPage } from "../j-render/j-render";
import { ORenderPage } from "../o-render/o-render";
import { LRenderPage } from "../l-render/l-render";

@IonicPage()
@Component({
    selector: 'page-person',
    templateUrl: 'person.html',
})
export class PersonPage {
    @Input() person: any;

    constructor(public navCtrl: NavController, public navParams: NavParams) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad PersonPage');
    }

    ngOnInit(){

    }

    render_pg(ac_type, username){
        if(ac_type == 'j'){
            this.navCtrl.push(JRenderPage, {username: username});
        }
        else if(ac_type == 'o'){
            this.navCtrl.push(ORenderPage, {username: username});
        }
        else if(ac_type == 'l'){
            this.navCtrl.push(LRenderPage, {code: username});
        }
    }

}
