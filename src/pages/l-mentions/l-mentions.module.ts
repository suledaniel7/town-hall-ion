import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LMentionsPage } from './l-mentions';

@NgModule({
  declarations: [
    LMentionsPage,
  ],
  imports: [
    IonicPageModule.forChild(LMentionsPage),
  ],
})
export class LMentionsPageModule {}
