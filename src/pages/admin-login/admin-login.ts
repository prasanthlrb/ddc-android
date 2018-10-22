import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { Admin } from './../../model/admin.model';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the AdminLoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-admin-login',
  templateUrl: 'admin-login.html',
})
export class AdminLoginPage {
admin = {} as Admin;
  constructor(
    private afAuth: AngularFireAuth,
    private storage: Storage,
    public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminLoginPage');
  }
  async adminLogin(admin: Admin){
    
    try{
      const result = await this.afAuth.auth.signInWithEmailAndPassword(admin.email, admin.password);
      if(result){
        this.storage.set('email',admin.email);
        this.navCtrl.push('AdminDashboardPage');
      }
    }
    catch (e){
      console.log(e);
    }
  }

}
