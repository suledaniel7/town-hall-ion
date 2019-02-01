import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';

import { UploadPage } from '../upload/upload';
import { SignupProvider } from '../../providers/signup/signup';

@IonicPage()
@Component({
    selector: 'page-bio',
    templateUrl: 'bio.html',
})
export class BioPage {
    photo_type: string;
    u_type: string;
    charCount: number = 0;
    bio: string = '';

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private ldCtrl: LoadingController,
        private alertCtrl: AlertController,
        private signupProv: SignupProvider
    ) {
        this.photo_type = this.navParams.get('photo_type');
        this.u_type = this.navParams.get('u_type');
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad BioPage');
    }

    count(){
        this.charCount = this.bio.length;
    }

    save(){
        let wsp = /^\s*$/;
        if(!wsp.test(this.bio)){
            let ld1 = this.ldCtrl.create({content: "Saving Bio"});
            ld1.present();
            this.signupProv.update_bio(this.bio).subscribe(data =>{
                ld1.dismiss();
                if(data.success){
                    this.next();
                }
                else {
                    this.newAlert("Error", data.reason);
                }
            }, (err)=>{
                ld1.dismiss();
                this.newAlert("Connection Error", err.message);
            })
        }
    }

    next(){
        this.navCtrl.push(UploadPage, {photo_type: this.photo_type, u_type: this.u_type});
    }

    newAlert(title: string, text: string) {
        let newAl = this.alertCtrl.create({
            title: title,
            subTitle: text,
            buttons: ['Ok']
        });

        return newAl.present();
    }
}
