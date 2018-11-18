import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { JHomePage } from './j-home';
import { MessagePage } from '../message/message';

@NgModule({
  declarations: [
    JHomePage,
    MessagePage,
  ],
  imports: [
    IonicPageModule.forChild(JHomePage),
  ],
})
export class JHomePageModule {}
