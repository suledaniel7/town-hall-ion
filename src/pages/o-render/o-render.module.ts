import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ORenderPage } from './o-render';
import { MessagePage } from '../message/message';

@NgModule({
  declarations: [
    ORenderPage,
    MessagePage,
  ],
  imports: [
    IonicPageModule.forChild(ORenderPage),
  ],
})
export class ORenderPageModule {}
