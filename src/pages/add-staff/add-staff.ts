import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Emp } from './../../model/emp.model';
import { StaffListService } from '../../service/admin/staff.service';
import { Location } from '../../model/location.model';


@IonicPage()
@Component({
  selector: 'page-add-staff',
  templateUrl: 'add-staff.html',
})
export class AddStaffPage {
  emp:Emp ={
    name: '',
    mobile: undefined,
    id: undefined,
    password: '',
  }
  location:Location = {
    lat:0,
    lng:0,
    id:undefined,
    timestamp:''
}
  constructor(public navCtrl: NavController, public navParams: NavParams, private staffs: StaffListService ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddStaffPage');
  }
  backtodash(){
    this.navCtrl.push("StaffListPage");
  }
   addStaff(emp:Emp){
    this.staffs.addStaff(emp).then(ref=>{
      console.log(ref);
      //this.navCtrl.setRoot('StaffListPage');
      this.checkFunction();
          });
   }
   checkFunction(){
     this.location.id = this.emp.id;
     this.staffs.createLocation(this.location).then(data => {
      this.navCtrl.setRoot('StaffListPage');
     })
   }
}
