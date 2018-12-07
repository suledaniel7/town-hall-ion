import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConversationPage } from './conversation';
import { CommentPage } from '../comment/comment';

@NgModule({
  declarations: [
    ConversationPage,
    CommentPage,
  ],
  imports: [
    IonicPageModule.forChild(ConversationPage),
  ],
})
export class ConversationPageModule {}
