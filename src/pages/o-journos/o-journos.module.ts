import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OJournosPage } from './o-journos';
import { OJournoPage } from "../o-journo/o-journo";

@NgModule({
  declarations: [
    OJournosPage,
    OJournoPage,
  ],
  imports: [
    IonicPageModule.forChild(OJournosPage),
  ],
})
export class OJournosPageModule {}
