import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { JournoPage } from './journo';

@NgModule({
  declarations: [
    JournoPage,
  ],
  imports: [
    IonicPageModule.forChild(JournoPage),
  ],
})
export class JournoPageModule {}
