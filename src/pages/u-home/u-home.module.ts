import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UHomePage } from './u-home';

@NgModule({
  declarations: [
    UHomePage,
  ],
  imports: [
    IonicPageModule.forChild(UHomePage),
  ],
})
export class UHomePageModule {}
