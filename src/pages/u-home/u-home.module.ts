import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UHomePage } from './u-home';
import { MessagePage } from "../message/message";
import { OrgPage } from "../org/org";
import { JournoPage } from "../journo/journo";

@NgModule({
    declarations: [
        UHomePage,
        MessagePage,
        OrgPage,
        JournoPage,
    ],
    imports: [
        IonicPageModule.forChild(UHomePage),
    ],
})
export class UHomePageModule { }
