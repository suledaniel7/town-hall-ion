import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ProfileProvider } from "../../providers/profile/profile";

@IonicPage()
@Component({
    selector: 'page-o-journos',
    templateUrl: 'o-journos.html',
})
export class OJournosPage {
    item: any;
    errOcc = false;

    constructor(public navCtrl: NavController, public navParams: NavParams, private profProv: ProfileProvider) {
        this.profProv.o_profile_j().subscribe(data =>{
            if(data.success){
                this.errOcc = false;
                this.item = data.item;
            }
            else {
                this.errOcc = true;
                alert(data.reason);
            }
        }, err =>{
            this.errOcc = true;
            alert("An error occured connecting to the Internet. Please try again. Error: " + err.message);
        });
    }

    ionViewDidLoad() {
        
    }

    retry(){
        this.profProv.o_profile_j().subscribe(data =>{
            if(data.success){
                this.errOcc = false;
                this.item = data.item;
            }
            else {
                this.errOcc = true;
                alert(data.reason);
            }
        }, (err)=>{
            this.errOcc = true;
            alert("An error occured connecting to the Internet. Please try again. Error: " + err.message);
        });
    }

}
