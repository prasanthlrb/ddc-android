import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StaffTrackPage } from './staff-track';

@NgModule({
  declarations: [
    StaffTrackPage,
  ],
  imports: [
    IonicPageModule.forChild(StaffTrackPage),
  ],
})
export class StaffTrackPageModule {}
