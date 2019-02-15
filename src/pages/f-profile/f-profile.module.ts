import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FProfilePage } from './f-profile';
// import { MessagePage } from '../message/message';

@NgModule({
  declarations: [
    // FProfilePage,
    // MessagePage,
  ],
  imports: [
    IonicPageModule.forChild(FProfilePage),
  ],
})
export class FProfilePageModule {}
