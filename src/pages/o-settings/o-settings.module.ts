import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OSettingsPage } from './o-settings';

@NgModule({
  declarations: [
    OSettingsPage,
  ],
  imports: [
    IonicPageModule.forChild(OSettingsPage),
  ],
})
export class OSettingsPageModule {}
