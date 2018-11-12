import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OSignupPage } from './o-signup';

@NgModule({
  declarations: [
    OSignupPage,
  ],
  imports: [
    IonicPageModule.forChild(OSignupPage),
  ],
})
export class OSignupPageModule {}
