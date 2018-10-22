import { Order } from './../../model/order.model';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable} from 'rxjs/Observable';

@IonicPage()
@Component({
  selector: 'page-staff-dashboard',
  templateUrl: 'staff-dashboard.html',
})
export class StaffDashboardPage {
  loginData = {
    name:"",id:""
  }
  orders:any[];
  dummy:any[];
  orderList: Observable<Order[]>;
  constructor(
    private afDatabase: AngularFireDatabase,
    public navCtrl: NavController, public navParams: NavParams,private storage: Storage) {
    this.storage.get('loginData').then((val) => {
    this.loginData = val;
    });
  
  }

  ionViewDidLoad() {
    this.afDatabase.list('order-list').valueChanges().subscribe(res => {
      this.dummy = res;
      let data = this.dummy.filter(user => user.empId === this.loginData.id);
      this.orders = data;
    });
  }
  visited(id){
    console.log(id);
  }
  logout(){
    this.storage.clear();
    this.navCtrl.setRoot('LoginPage');
  }
}
