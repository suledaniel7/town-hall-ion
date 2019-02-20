import { Component } from '@angular/core';
// import { Input } from "@angular/core";
import { IonicPage, NavController, NavParams, ModalController, AlertController, LoadingController } from 'ionic-angular';

// import { OCommsPage } from "../o-comms/o-comms";
import { OHomePage } from "../o-home/o-home";
import { OJournosPage } from "../o-journos/o-journos";
import { OProfilePage } from "../o-profile/o-profile";
import { SearchPage } from "../search/search";
import { ProfileProvider } from '../../providers/profile/profile';
import { OrgBeatSelPage } from '../org-beat-sel/org-beat-sel';

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
    errOc: boolean = false;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private mdCtrl: ModalController,
        private alCtrl: AlertController,
        private ldCtrl: LoadingController,
        private profProv: ProfileProvider
    ) {
        this.load();
    }

    refresh(){
        this.load();
    }

    load(){
        let ld1 = this.ldCtrl.create({ content: "Verifying Journalists" });
        ld1.present();
        this.profProv.o_profile_r().subscribe(data => {
            this.errOc = false;
            ld1.dismiss();
            if (data.success) {
                if (data.pending) {
                    //set to req
                    let md1 = this.mdCtrl.create(OrgBeatSelPage, { f_name: data.journo.f_name, l_name: data.journo.l_name, username: data.journo.username, o_username: data.user.username });
                    
                    md1.present();
                }
            }
            else {
                this.newAlert("Error", data.reason);
            }
        }, () => {
            this.errOc = true;
            ld1.dismiss();
            this.newAlert("Connection Error", "Please check your connection");
        });
    }

    ionViewDidLoad() {

    }

    newAlert(title: string, text: string) {
        let newAl = this.alCtrl.create({
            title: title,
            subTitle: text,
            buttons: ['Ok']
        });

        return newAl.present();
    }

}
