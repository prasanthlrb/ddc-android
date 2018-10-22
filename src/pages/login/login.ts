import { AngularFireDatabase } from 'angularfire2/database';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Order } from '../../model/order.model';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  visibleAdmin = false;
  constructor(public navCtrl: NavController, public navParams: NavParams,private afDatabase: AngularFireDatabase) {
  }
  count = 1;
  order:any[];
  orderId:string;
  ionViewWillLoad() {
    this.afDatabase.list('order-list').valueChanges().subscribe(res => {
      this.order = res;
    });
  }
  openfun() {

    if(this.count >= 5){
      this.visibleAdmin = true;
    }
    this.count += 1;
  }
  customerLogin(){
    
    let data = this.order.filter(user => user.id === this.orderId)[0];
    if(data){
      this.navCtrl.push('UserDashboardPage',{
        order:data
      })
    }else{
      console.log("Invalid Employee Id");
    }
  }
  staff(){
    this.navCtrl.push('StaffLoginPage');
  }
  admin(){
    this.navCtrl.push('AdminLoginPage');
  }
}
