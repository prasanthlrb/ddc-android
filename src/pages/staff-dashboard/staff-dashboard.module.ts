import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StaffDashboardPage } from './staff-dashboard';

@NgModule({
  declarations: [
    StaffDashboardPage,
  ],
  imports: [
    IonicPageModule.forChild(StaffDashboardPage),
  ],
})
export class StaffDashboardPageModule {}
