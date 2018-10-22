import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { map } from 'rxjs/operators';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable} from 'rxjs/Observable';
import { Order } from '../../model/order.model';
import { StaffListService } from '../../service/admin/staff.service';
import { Emp } from './../../model/emp.model';
import { OrderListService } from '../../service/admin/order.service';
/**
 * Generated class for the AddOrdersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-orders',
  templateUrl: 'add-orders.html',
})
export class AddOrdersPage {
  order:Order ={
    id: undefined,
    empName: '',
    empId: undefined,
    address: '',
  }
 orderEmp:any;
  staffList: Observable<Emp[]>;
  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public db: AngularFireDatabase,private emp:StaffListService,
    private orders: OrderListService) {
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

  saveOrder(order:Order){
    
    var strArr = this.orderEmp.split('-');
    this.order.empId = strArr[1];
    this.order.empName = strArr[0];
    this.orders.addOrder(order).then(ref=>{
      this.navCtrl.setRoot('OrderListPage');
          });
  
   

  }

}
