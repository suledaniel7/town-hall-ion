import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { FileChooser } from "@ionic-native/file-chooser";
import { FileTransfer, FileUploadOptions, FileTransferObject } from "@ionic-native/file-transfer"

import { AddressProvider } from '../../providers/address/address';
import { UploadProvider } from '../../providers/upload/upload';

import { UsersPage } from '../users/users';
import { OrganisationsPage } from '../organisations/organisations';
import { LegislatorsPage } from '../legislators/legislators';
import { JBeatSelPage } from "../j-beat-sel/j-beat-sel";
import { JOrgSelPage } from "../j-org-sel/j-org-sel";
@IonicPage()
@Component({
    selector: 'page-upload',
    templateUrl: 'upload.html',
})
export class UploadPage {
    u_type: string;
    server_address: string;
    img_address: string;
    fileUri: string = '/assets/imgs/none-selected.png';
    final_obj: object;
    photo_type: string = "Avatar";

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private fc: FileChooser,
        private transfer: FileTransfer,
        private address: AddressProvider,
        private uplProv: UploadProvider,
        private alCtrl: AlertController,
        private ldCtrl: LoadingController
    ) {
        this.photo_type = this.navParams.get('photo_type');
        this.u_type = this.navParams.get('u_type');
        this.server_address = this.address.getApi();
        this.img_address = this.address.getImageApi();
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad UploadPage');
    }

    select() {
        this.fc.open().then((uri) => {

            const fileTransfer: FileTransferObject = this.transfer.create();
            let options: FileUploadOptions = {
                fileKey: 'avatar',
                fileName: 'avatar'
            }

            let ld1 = this.ldCtrl.create({
                content: "Processing Image"
            });

            ld1.present();
            fileTransfer.upload(uri, this.server_address + "/upload_img", options).then((data) => {
                ld1.dismiss();
                let data_obj = JSON.parse(data.response);
                if (data_obj.success) {
                    this.fileUri = this.img_address + '/' + data_obj.file.uri;
                    this.final_obj = data_obj.file;
                }
                else {
                    this.newAlert("Error", data_obj.reason);
                }
            }).catch(() => {
                ld1.dismiss();
                this.newAlert("Connection Error", "Please check your connection");
            });
        }).catch(() => {
            this.newAlert("Connection Error", "Please check your connection");
        });
    }

    upload() {
        let ld2 = this.ldCtrl.create({
            content: "Uploading Image"
        });
        ld2.present();
        this.uplProv.confirm_upload(this.final_obj).subscribe((data) => {
            ld2.dismiss();
            if (data.success) {
                this.newAlert("Success", "Image uploaded successfully");
                this.skip();
            }
            else {
                this.newAlert("Error", data.reason);
            }
        }, () => {
            ld2.dismiss();
            this.newAlert("Error", "Please check your connection");
        });
    }

    newAlert(title: string, text: string) {
        let newAl = this.alCtrl.create({
            title: title,
            message: text,
            buttons: ['Ok']
        });

        return newAl.present();
    }

    skip() {
        if (this.u_type === 'u') {
            this.navCtrl.setRoot(UsersPage);
            this.navCtrl.popToRoot();
        }
        else if (this.u_type === 'j') {
            this.navCtrl.setRoot(JOrgSelPage);
            this.navCtrl.popToRoot();
        }
        else if (this.u_type === 'f') {
            this.navCtrl.setRoot(JBeatSelPage);
            this.navCtrl.popToRoot();
        }
        else if (this.u_type === 'o') {
            this.navCtrl.setRoot(OrganisationsPage);
            this.navCtrl.popToRoot();
        }
        else if (this.u_type === 'l') {
            this.navCtrl.setRoot(LegislatorsPage);
            this.navCtrl.popToRoot();
        }
        else {
            this.newAlert("Error", "Invalid User Account Type");
        }
    }
}
