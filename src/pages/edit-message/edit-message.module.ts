import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditMessagePage } from './edit-message';

@NgModule({
  declarations: [
    EditMessagePage,
  ],
  imports: [
    IonicPageModule.forChild(EditMessagePage),
  ],
})
export class EditMessagePageModule {}
