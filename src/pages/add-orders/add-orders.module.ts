import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddOrdersPage } from './add-orders';

@NgModule({
  declarations: [
    AddOrdersPage,
  ],
  imports: [
    IonicPageModule.forChild(AddOrdersPage),
  ],
})
export class AddOrdersPageModule {}
