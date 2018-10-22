import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the AdminDashboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-admin-dashboard',
  templateUrl: 'admin-dashboard.html',
})
export class AdminDashboardPage {
email:string;
  constructor(public navCtrl: NavController,
    private storage: Storage, public navParams: NavParams,
    private afAuth: AngularFireAuth,) {
  }


  setting(){
    this.navCtrl.push("AdminSettingPage");
  }
  logout(){
    this.afAuth.auth.signOut().then((result) => {
      this.navCtrl.push('LoginPage');
      this.storage.clear();
    }).catch(function(error) {
     console.log(error);
    });
    
  }
  ionViewWillLoad() {
  //   this.afAuth.authState.subscribe(data => {
  //    this.authData = data;
  //   });
  //     this.email = this.authData.email;
  this.storage.get('email').then((val) => {
    this.email = val;
    });
   }
  
}
