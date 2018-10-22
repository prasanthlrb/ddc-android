import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Emp } from '../../model/emp.model';
import { StaffListService } from '../../service/admin/staff.service';



@IonicPage()
@Component({
  selector: 'page-edit-staff',
  templateUrl: 'edit-staff.html',
})
export class EditStaffPage {
  emp:Emp;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private staff: StaffListService) {
  }

  ionViewWillLoad() {
    this.emp = this.navParams.get('staff');
  }
  saveItem(emp:Emp){
    this.staff.editStaff(emp).then(()=>{
      this.navCtrl.setRoot('StaffListPage');
    })
  }
  delete(emp:Emp){
    this.staff.removeStaff(emp).then(()=>{
      this.navCtrl.setRoot('StaffListPage');
    })
  }
}
