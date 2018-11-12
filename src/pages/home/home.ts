import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoadingController } from "ionic-angular";

import { SignedInProvider } from "../../providers/signed-in/signed-in";

import { SigninPage } from '../signin/signin';
import { OrganisationsPage } from "../organisations/organisations";

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    err: string = '';
    errSit = false;

    constructor(public navCtrl: NavController, private ldCtrl: LoadingController, private signedIn: SignedInProvider) {
        let loader = this.ldCtrl.create({
            showBackdrop: true,
            content: "Please wait...",
        });

        loader.present();

        this.signedIn.isSignedIn().subscribe(data => {
            if(data.active){
                loader.dismiss();
                this.navCtrl.setRoot(OrganisationsPage);
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
            this.err = "Error connecting to Internet. Check your connection";
        });
        
    }

    retry(){
        let loader = this.ldCtrl.create({
            showBackdrop: true,
            content: "Please wait...",
        });

        loader.present();

        this.signedIn.isSignedIn().subscribe(data => {
            if(data.active){
                loader.dismiss();
                this.navCtrl.setRoot(OrganisationsPage);
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
            this.err = "Error connecting to Internet. Check your connection";
        });
    }

}
