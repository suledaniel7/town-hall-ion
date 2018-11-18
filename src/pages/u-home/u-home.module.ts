import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UHomePage } from './u-home';
import { MessagePage } from "../message/message";

@NgModule({
    declarations: [
        UHomePage,
        MessagePage,
    ],
    imports: [
        IonicPageModule.forChild(UHomePage),
    ],
})
export class UHomePageModule { }
