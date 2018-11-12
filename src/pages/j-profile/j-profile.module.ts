import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { JProfilePage } from './j-profile';

@NgModule({
  declarations: [
    JProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(JProfilePage),
  ],
})
export class JProfilePageModule {}
