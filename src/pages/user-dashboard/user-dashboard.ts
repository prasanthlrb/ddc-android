import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { CallNumber } from '@ionic-native/call-number';
import { StaffListService } from '../../service/admin/staff.service';
declare var google: any;

/**
 * Generated class for the UserDashboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-dashboard',
  templateUrl: 'user-dashboard.html',
})
export class UserDashboardPage {
  @ViewChild('map') map: ElementRef;
orderData={
  address:'',
  empId:undefined,
  empName:'',
  id:undefined
};
employee:any;
overLocation:any;

  constructor(private afDatabase: AngularFireDatabase,
    public navCtrl: NavController, public navParams: NavParams,
    private callNumber: CallNumber,
    private staff:StaffListService) {
    this.orderData = this.navParams.get('order');
    console.log(this.orderData);
     this.staff.getOne(this.orderData.empId).valueChanges().subscribe(res => {
      this.employee = res;
    });
  //  .subscribe(snapshot => {
  //   console.log(snapshot.key)
  //   console.log(snapshot.val().finished)
  //});
  }

  ionViewWillLoad() {   
     this.afDatabase.object(`location/${this.orderData.empId}`).valueChanges().subscribe(res => {
      this.overLocation = res;
      console.log(this.overLocation);
      this.showMap(this.overLocation);
     });
        
  }

  showMap(location) {
    const position = new google.maps.LatLng(location.lat, location.lng);

    const options = {
      center: position,
      zoom: 10,
      mapTypeId: 'roadmap'
    };

    const map = new google.maps.Map(this.map.nativeElement, options);

    var marker = new google.maps.Marker({
      position: position,
      map: map
    });
  }
  async callNow(){
    try{      
      await this.callNumber.callNumber(this.employee.mobile, true);
      console.log("Dial Open");
    }catch(e){console.error(e)}
  
  }
}
