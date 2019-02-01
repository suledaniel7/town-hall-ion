import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OJournosPage } from './o-journos';
import { OJournoPage } from "../o-journo/o-journo";
import { JReqPage } from '../j-req/j-req';

@NgModule({
  declarations: [
    OJournosPage,
    OJournoPage,
    JReqPage,
  ],
  imports: [
    IonicPageModule.forChild(OJournosPage),
  ],
})
export class OJournosPageModule {}
