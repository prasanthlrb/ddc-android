import { Admin } from './../../model/admin.model';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
/**
 * Generated class for the AdminSettingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-admin-setting',
  templateUrl: 'admin-setting.html',
})
export class AdminSettingPage {
admin = {} as Admin;
  constructor(public navCtrl: NavController, public navParams: NavParams,
     private afAuth: AngularFireAuth) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminSettingPage');
  }
  backtodash(){
    this.navCtrl.push("AdminDashboardPage");
  }
  async emailUpdate(admin:Admin){

    this.afAuth.auth.currentUser.updateEmail(admin.email).then(function() {
  console.log("Update successful");
  // Update successful.
}).catch(function(error) {
  // An error happened.
  console.log("An error happened.");
});
  }
  async passwordUpdate(admin:Admin){
    this.afAuth.auth.currentUser.updatePassword(admin.password).then(function() {
      console.log("Update successful");
      // Update successful.
    }).catch(function(error) {
      // An error happened.
      console.log("An error happened.");
    });
  }

}
