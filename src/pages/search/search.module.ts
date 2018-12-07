import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchPage } from './search';
import { MessagePage } from "../message/message";
import { PersonPage } from "../person/person";
import { TrendPage } from "../trend/trend";

@NgModule({
  declarations: [
    SearchPage,
    MessagePage,
    PersonPage,
    TrendPage,
  ],
  imports: [
    IonicPageModule.forChild(SearchPage),
  ],
})
export class SearchPageModule {}
