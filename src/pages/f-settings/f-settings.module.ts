import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FSettingsPage } from './f-settings';

@NgModule({
  declarations: [
    FSettingsPage,
  ],
  imports: [
    IonicPageModule.forChild(FSettingsPage),
  ],
})
export class FSettingsPageModule {}
