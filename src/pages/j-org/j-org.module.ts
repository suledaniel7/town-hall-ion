import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { JOrgPage } from './j-org';
import { MessagePage } from '../message/message';

@NgModule({
  declarations: [
    JOrgPage,
    MessagePage,
  ],
  imports: [
    IonicPageModule.forChild(JOrgPage),
  ],
})
export class JOrgPageModule {}
