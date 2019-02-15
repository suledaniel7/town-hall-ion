import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { JournalistsPage } from './journalists';
// import { MessagePage } from "../message/message";

@NgModule({
  declarations: [
    // JournalistsPage,
    // MessagePage
  ],
  imports: [
    IonicPageModule.forChild(JournalistsPage),
  ],
})
export class JournalistsPageModule {}
