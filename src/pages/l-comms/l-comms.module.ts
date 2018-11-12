import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LCommsPage } from './l-comms';

@NgModule({
  declarations: [
    LCommsPage,
  ],
  imports: [
    IonicPageModule.forChild(LCommsPage),
  ],
})
export class LCommsPageModule {}
