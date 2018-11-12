import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LProfilePage } from './l-profile';

@NgModule({
  declarations: [
    LProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(LProfilePage),
  ],
})
export class LProfilePageModule {}
