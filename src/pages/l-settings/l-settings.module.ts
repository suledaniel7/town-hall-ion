import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LSettingsPage } from './l-settings';

@NgModule({
  declarations: [
    LSettingsPage,
  ],
  imports: [
    IonicPageModule.forChild(LSettingsPage),
  ],
})
export class LSettingsPageModule {}
