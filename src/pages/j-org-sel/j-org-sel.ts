import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from "ionic-angular";
import { LoadingController } from "ionic-angular";
import { JAccountProvider } from '../../providers/j-account/j-account';
import { JournalistsPage } from '../journalists/journalists';


@IonicPage()
@Component({
    selector: 'page-j-org-sel',
    templateUrl: 'j-org-sel.html',
})
export class JOrgSelPage {
    selOrg: any = '';
    item: any;

    constructor(public navCtrl: NavController, public navParams: NavParams, private jAcProv: JAccountProvider, private alertCtrl: AlertController, private ldCtrl: LoadingController) {
        let ld1 = this.ldCtrl.create({
            content: "Loading Town Hall Organisations..."
        });

        ld1.present();
        this.jAcProv.j_org_render().subscribe(data => {
            ld1.dismiss();
            if(data.success){
                this.item = data.item;
            }
            else {
                alert(data.reason);
            }
        }, err => {
            ld1.dismiss();
            alert("An error occured. Error: " + err.message);
        });
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad JOrgSelPage');
    }

    confirm(o_name, o_username){
        let conf_alert = this.alertCtrl.create({
            title: "Send Journalist Request to "+o_name+"?",
            message: "Do you want to send your Journalist Request to "+o_name+"? This action cannot be undone.",
            buttons: [
                {
                    text: "No"
                },
                {
                    text: "Yes",
                    handler: ()=>{
                        this.selectOrg(o_username);
                    }
                }
            ]
        });

        conf_alert.present();
    }

    selectOrg(username){
        let ld2 = this.ldCtrl.create({
            content: "Sending Request..."
        });

        ld2.present();
        this.jAcProv.j_org_sub(username).subscribe(data => {
            ld2.dismiss();
            if(data.success){
                this.navCtrl.setRoot(JournalistsPage);
                this.navCtrl.popToRoot();
            }
            else {
                alert(data.reason);
            }
        }, err => {
            ld2.dismiss();
            alert("An error occured. Error: " + err.message);
        });
    }

}
