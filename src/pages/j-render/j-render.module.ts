import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { JRenderPage } from './j-render';
import { MessagePage } from '../message/message';

@NgModule({
  declarations: [
    JRenderPage,
    MessagePage,
  ],
  imports: [
    IonicPageModule.forChild(JRenderPage),
  ],
})
export class JRenderPageModule {}
