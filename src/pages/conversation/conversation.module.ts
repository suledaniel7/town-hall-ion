import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConversationPage } from './conversation';

@NgModule({
  declarations: [
    // ConversationPage,
    // CommentPage,
  ],
  imports: [
    IonicPageModule.forChild(ConversationPage),
  ],
})
export class ConversationPageModule {}
