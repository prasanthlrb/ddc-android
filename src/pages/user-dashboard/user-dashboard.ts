import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { CallNumber } from '@ionic-native/call-number';
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
overLocation: any[];
  constructor(private afDatabase: AngularFireDatabase,
    public navCtrl: NavController, public navParams: NavParams,
    private callNumber: CallNumber) {
    this.orderData = this.navParams.get('order');
    console.log(this.orderData);
  }

  ionViewWillLoad() {
    this.afDatabase.list('location').valueChanges().subscribe(res => {
      this.overLocation = res;
      //let data = res;
     try{

       let data = this.overLocation.filter(user => user.id === this.orderData.empId)[0];
       if(data){
 
         console.log(data);
       }else{
         console.log("No Data Found");
       }
     }catch(e){ console.error(e)}
    });
    //
    //console.log(this.overLocation +'ok');
    this.showMap();
  }

  showMap() {
    const position = new google.maps.LatLng(-2.6289487, -44.3999958);

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
      await this.callNumber.callNumber("9171035128", true);
      console.log("Dial Open");
    }catch(e){console.error(e)}
  
  }
}
