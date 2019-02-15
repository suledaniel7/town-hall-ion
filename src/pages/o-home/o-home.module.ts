import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OHomePage } from './o-home';
// import { MessagePage } from "../message/message";

@NgModule({
  declarations: [
    // OHomePage,
    // MessagePage
  ],
  imports: [
    IonicPageModule.forChild(OHomePage),
  ],
})
export class OHomePageModule {}
