import { AngularFireDatabase } from 'angularfire2/database';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Staff } from '../../model/staff.model';
import { Emp } from '../../model/emp.model';
import { Storage } from '@ionic/storage';

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
    private storage: Storage) {
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
        this.storage.set('loginData',data);
        this.navCtrl.setRoot('StaffDashboardPage');
      }else{
        console.log("Invalid Password");
      }
    }else{
      console.log("Invalid Employee Id");
    }
  }

}
