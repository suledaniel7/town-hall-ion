import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FreelancersPage } from './freelancers';

@NgModule({
  declarations: [
    FreelancersPage,
  ],
  imports: [
    IonicPageModule.forChild(FreelancersPage),
  ],
})
export class FreelancersPageModule {}
