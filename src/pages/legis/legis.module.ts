import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LegisPage } from './legis';

@NgModule({
  declarations: [
    LegisPage,
  ],
  imports: [
    IonicPageModule.forChild(LegisPage),
  ],
})
export class LegisPageModule {}
