import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CallNumber } from '@ionic-native/call-number';
import { AngularFireDatabase } from 'angularfire2/database';
declare var google: any;

@IonicPage()
@Component({
  selector: 'page-staff-track',
  templateUrl: 'staff-track.html',
})
export class StaffTrackPage {
  @ViewChild('map') map: ElementRef;
  staffData:any;
  overLocation:any;
  constructor(private afDatabase: AngularFireDatabase,
    public navCtrl: NavController, public navParams: NavParams,
    private callNumber: CallNumber) {
    this.staffData = this.navParams.get('staff');
    console.log(this.staffData);
  }
  ionViewWillLoad() {   
    this.afDatabase.object(`location/${this.staffData.id}`).valueChanges().subscribe(res => {
      console.log(res);
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
      await this.callNumber.callNumber(this.staffData.mobile, true);
      console.log("Dial Open");
    }catch(e){console.error(e)}
  }

}
