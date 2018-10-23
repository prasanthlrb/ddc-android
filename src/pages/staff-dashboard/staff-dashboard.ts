import { Order } from './../../model/order.model';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//import { Storage } from '@ionic/storage';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable} from 'rxjs/Observable';
import { map } from 'rxjs/operators';

@IonicPage()
@Component({
  selector: 'page-staff-dashboard',
  templateUrl: 'staff-dashboard.html',
})
export class StaffDashboardPage {
  loginData:any;
  orderList: Observable<Order[]>;
  orders:any[];
  dummy:any;
  constructor(
    private afDatabase: AngularFireDatabase,
    public navCtrl: NavController, public navParams: NavParams,
    // private storage: Storage
    ) {
      this.loginData = this.navParams.get('loginData');
    // this.storage.get('loginData').then((val) => {
    // this.loginData = val;
    // console.log(val);
    // });
   console.log(this.loginData);
    this.orderList = this.afDatabase.list<Order>('order-list')
    .snapshotChanges().pipe(
      map(
        changes =>{
  
          return changes.map(c => ({
            key: c.payload.key, ...c.payload.val()
          }))
        }
      )
      );
      
    //  let watch = this.geolocation.watchPosition();
    //  watch.subscribe((data) => {
    //  });
  
  }

  ionViewDidLoad() {
    // this.afDatabase.object('order-list').valueChanges().subscribe(res => {
    //   this.dummy = res;
    //   let data = this.dummy.filter(user => user.empId === this.loginData.id);
    //   this.orders = data;
    // });
  }
  visited(order: Order){
   this.afDatabase.list<Order>('order-list').remove(order.key);
  }
  logout(){
    //this.storage.clear();
    this.navCtrl.setRoot('LoginPage');
  }

}
