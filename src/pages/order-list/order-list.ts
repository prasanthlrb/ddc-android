import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { map } from 'rxjs/operators';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable} from 'rxjs/Observable';
import { Emp } from '../../model/emp.model';
import { Order } from '../../model/order.model';
import { StaffListService } from '../../service/admin/staff.service';
import { OrderListService } from '../../service/admin/order.service';
/**
 * Generated class for the OrderListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-order-list',
  templateUrl: 'order-list.html',
})
export class OrderListPage {
  staffList: Observable<Emp[]>;
  orderList: Observable<Order[]>;
  constructor(public navCtrl: NavController, public navParams: NavParams,public db: AngularFireDatabase,
    private emp:StaffListService, private orders:OrderListService) {
      this.orderList = this.orders.getOrderList()
    .snapshotChanges().pipe(
      map(
        changes =>{
  
          return changes.map(c => ({
            key: c.payload.key, ...c.payload.val()
          }))
        }
      )
      );
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderListPage');
  }

}
