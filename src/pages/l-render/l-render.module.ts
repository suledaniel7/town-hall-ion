import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LRenderPage } from './l-render';
// import { MessagePage } from '../message/message';

@NgModule({
  declarations: [
    // LRenderPage,
    // MessagePage,
  ],
  imports: [
    IonicPageModule.forChild(LRenderPage),
  ],
})
export class LRenderPageModule {}
