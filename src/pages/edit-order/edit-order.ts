import { Order } from './../../model/order.model';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { map } from 'rxjs/operators';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable} from 'rxjs/Observable';
import { StaffListService } from '../../service/admin/staff.service';
import { Emp } from './../../model/emp.model';
import { OrderListService } from '../../service/admin/order.service';

@IonicPage()
@Component({
  selector: 'page-edit-order',
  templateUrl: 'edit-order.html',
})
export class EditOrderPage {
  staffList: Observable<Emp[]>;
  order:Order;
  orderEmp:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public db: AngularFireDatabase,private emp:StaffListService, private orders: OrderListService) {
      this.staffList = this.emp.getStaffList()
    .snapshotChanges().pipe(
      map(
        changes =>{
  
          return changes.map(c => ({
            key: c.payload.key, ...c.payload.val()
          }))
        }
      )
      );
      console.log(this.staffList);
  }
  ionViewWillLoad() {
    this.order = this.navParams.get('order');
    console.log(this.order);
  }
  saveOrder(order:Order){
    this.db.list('staff-list').valueChanges().subscribe(res => {
     
      //this.orderEmp = res.filter(emp => emp.id === order.empId)[0];
      this.orderEmp = res;
     let data =  this.orderEmp.filter(emp => emp.id === order.empId)[0];
     this.order.empId = data.id;
     this.order.empName = data.name;
     this.orders.editOrder(order).then(()=>{
      this.navCtrl.setRoot('OrderListPage');
    })
    })
    
  }
  deleteOrder(order:Order){
this.orders.removeOrder(order).then(()=>{
  this.navCtrl.setRoot('OrderListPage');
})
  }

}
