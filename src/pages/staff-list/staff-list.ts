import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { map } from 'rxjs/operators';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable} from 'rxjs/Observable';
import { Emp } from '../../model/emp.model';
import { StaffListService } from '../../service/admin/staff.service';

@IonicPage()
@Component({
  selector: 'page-staff-list',
  templateUrl: 'staff-list.html',
})
export class StaffListPage {
  staffList: Observable<Emp[]>;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public db: AngularFireDatabase,private emp:StaffListService) {
    this.staffList = this.emp.getStaffList()
    .snapshotChanges().pipe(
      map(
        changes =>{
  
          return changes.map(c => ({
            key: c.payload.key, ...c.payload.val()
          }))
        }
      )
      )
  }


}
