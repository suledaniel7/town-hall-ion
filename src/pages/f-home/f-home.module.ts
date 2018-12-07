import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FHomePage } from './f-home';
import { MessagePage } from '../message/message';

@NgModule({
  declarations: [
    FHomePage,
    MessagePage,
  ],
  imports: [
    IonicPageModule.forChild(FHomePage),
  ],
})
export class FHomePageModule {}
