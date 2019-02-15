import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UHomePage } from './u-home';
// import { MessagePage } from "../message/message";
// import { PersonPage } from "../person/person";

@NgModule({
    declarations: [
        // UHomePage,
        // MessagePage,
        // PersonPage,
    ],
    imports: [
        IonicPageModule.forChild(UHomePage),
    ],
})
export class UHomePageModule { }
