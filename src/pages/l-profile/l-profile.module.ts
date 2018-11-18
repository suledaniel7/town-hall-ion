import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LProfilePage } from './l-profile';
import { MessagePage } from "../message/message";

@NgModule({
  declarations: [
    LProfilePage,
    MessagePage,
  ],
  imports: [
    IonicPageModule.forChild(LProfilePage),
  ],
})
export class LProfilePageModule {}
