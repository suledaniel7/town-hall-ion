import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { USettingsPage } from './u-settings';

@NgModule({
  declarations: [
    USettingsPage,
  ],
  imports: [
    IonicPageModule.forChild(USettingsPage),
  ],
})
export class USettingsPageModule {}
