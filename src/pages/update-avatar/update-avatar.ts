import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { FileChooser } from "@ionic-native/file-chooser";
import { FileTransfer, FileUploadOptions, FileTransferObject } from "@ionic-native/file-transfer"

import { AddressProvider } from '../../providers/address/address';
import { UploadProvider } from '../../providers/upload/upload';

@IonicPage()
@Component({
    selector: 'page-update-avatar',
    templateUrl: 'update-avatar.html',
})
export class UpdateAvatarPage {
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
        this.server_address = this.address.getApi();
        this.img_address = this.address.getImageApi();
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad UpdateAvatarPage');
    }

    select() {
        this.fc.open().then((uri) => {
            const fileTransfer: FileTransferObject = this.transfer.create();
            let options: FileUploadOptions = {
                fileKey: 'avatar',
                fileName: 'avatar'
            }

            let ld1 = this.ldCtrl.create({
                content: "Processing Image",
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
            }).catch((err) => {
                ld1.dismiss();
                this.newAlert("Error", err);
            });
        }).catch((err) => {
            this.newAlert("Error", err);
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
                this.newAlert("Success", "Image updated successfully");
                this.navCtrl.pop();
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
}
