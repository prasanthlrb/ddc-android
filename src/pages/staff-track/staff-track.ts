import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
declare var google: any;

@IonicPage()
@Component({
  selector: 'page-staff-track',
  templateUrl: 'staff-track.html',
})
export class StaffTrackPage {
  @ViewChild('map') map: ElementRef;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  ionViewDidLoad() {
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

}
