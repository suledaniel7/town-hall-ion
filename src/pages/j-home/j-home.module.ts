import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { JHomePage } from './j-home';

@NgModule({
  declarations: [
    JHomePage,
  ],
  imports: [
    IonicPageModule.forChild(JHomePage),
  ],
})
export class JHomePageModule {}
