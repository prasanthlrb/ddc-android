import { AngularFireDatabase } from 'angularfire2/database';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Staff } from '../../model/staff.model';
import { LocationTrackerProvider } from '../../service/admin/locationTracker.service';
//import { LocationTrackerProvider } from '../../providers/location-tracker/location-tracker';


@IonicPage()
@Component({
  selector: 'page-staff-login',
  templateUrl: 'staff-login.html',
})

export class StaffLoginPage {
staff: Staff = {
id:undefined,
password:'',
}
emp:any[];

  constructor(
    private afDatabase: AngularFireDatabase,
    public navCtrl: NavController, public navParams: NavParams,
    public locationTracker: LocationTrackerProvider
    ) {
  }

  ionViewWillLoad() {
   this.afDatabase.list('staff-list').valueChanges().subscribe(res => {
     this.emp = res;
   })
    
  }
  staffLogin(staff: Staff){
    
    let data = this.emp.filter(user => user.id === staff.id)[0];
    if(data){
      if(data.password == staff.password){
        this.locationTracker.startTracking(staff.id);
        this.navCtrl.setRoot('StaffDashboardPage',{
          loginData:data
        });
      }else{
        console.log("Invalid Password");
      }
    }else{
      console.log("Invalid Employee Id");
    }
  }

}
