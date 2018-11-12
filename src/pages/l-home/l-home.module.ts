import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LHomePage } from './l-home';
import { MessagePage } from '../message/message';

@NgModule({
    declarations: [
        LHomePage,
        MessagePage
    ],
    imports: [
        IonicPageModule.forChild(LHomePage),
    ],
})
export class LHomePageModule { }
