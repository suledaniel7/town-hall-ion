import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OProfilePage } from './o-profile';

@NgModule({
  declarations: [
    OProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(OProfilePage),
  ],
})
export class OProfilePageModule {}
