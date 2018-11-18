import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { JProfilePage } from './j-profile';
import { MessagePage } from '../message/message';

@NgModule({
  declarations: [
    JProfilePage,
    MessagePage,
  ],
  imports: [
    IonicPageModule.forChild(JProfilePage),
  ],
})
export class JProfilePageModule {}
