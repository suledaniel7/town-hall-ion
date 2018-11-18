import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoadingController } from "ionic-angular";

import { SignedInProvider } from "../../providers/signed-in/signed-in";

import { SigninPage } from '../signin/signin';
import { UsersPage } from "../users/users";
import { JournalistsPage } from "../journalists/journalists";
import { OrganisationsPage } from "../organisations/organisations";
import { LegislatorsPage } from "../legislators/legislators";

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    err: string = '';
    errSit = false;

    constructor(public navCtrl: NavController, private ldCtrl: LoadingController, private signedIn: SignedInProvider) {

        this.load();
        
    }

    load(){
        let loader = this.ldCtrl.create({
            showBackdrop: true,
            content: "Please wait...",
        });

        loader.present();

        this.signedIn.isSignedIn().subscribe(data => {
            if(data.active){
                loader.dismiss();
                let u_type = data.u_type;
                if(u_type == 'u'){
                    this.navCtrl.setRoot(UsersPage);
                }
                else if(u_type == 'j'){
                    this.navCtrl.setRoot(JournalistsPage);
                }
                else if(u_type == 'o'){
                    this.navCtrl.setRoot(OrganisationsPage);
                }
                else if(u_type == 'l'){
                    this.navCtrl.setRoot(LegislatorsPage);
                }
                else {
                    alert("Invalid data.u_type provided. home.ts");
                }
                this.navCtrl.popToRoot();
            }
            else {
                loader.dismiss();
                this.navCtrl.setRoot(SigninPage);
                this.navCtrl.popToRoot();
            }
        }, (err)=>{
            loader.dismiss();
            this.errSit = true;
            this.err = err.message;
        });
    }

    retry(){
        this.load();
    }

}
