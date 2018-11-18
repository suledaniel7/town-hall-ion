import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OProfilePage } from './o-profile';
import { MessagePage } from "../message/message";

@NgModule({
  declarations: [
    OProfilePage,
    MessagePage,
  ],
  imports: [
    IonicPageModule.forChild(OProfilePage),
  ],
})
export class OProfilePageModule {}
