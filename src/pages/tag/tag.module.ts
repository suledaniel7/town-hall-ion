import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TagPage } from './tag';
import { MessagePage } from '../message/message';

@NgModule({
  declarations: [
    TagPage,
    MessagePage,
  ],
  imports: [
    IonicPageModule.forChild(TagPage),
  ],
})
export class TagPageModule {}
