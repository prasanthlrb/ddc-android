import {Injectable, NgZone} from '@angular/core';
import {BackgroundGeolocation, BackgroundGeolocationConfig} from '@ionic-native/background-geolocation';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import { AngularFireDatabase } from 'angularfire2/database';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import { Location } from '../../model/location.model';


@Injectable()
export class LocationTrackerProvider {

  public watch: any;
  public lat: number = 0;
  public lng: number = 0;


  constructor(
    public zone: NgZone,
    public backgroundGeolocation: BackgroundGeolocation,
    public geolocation: Geolocation,
    public db: AngularFireDatabase
  ) {

  }

  public startTracking(empId) {
    let config : BackgroundGeolocationConfig = {
      desiredAccuracy: 0,
      stationaryRadius: 20,
      distanceFilter: 10,
      debug: true,
      interval: 2000
    };

    this.backgroundGeolocation.configure(config).subscribe((location) => {
        let LocationData = {
            id:empId,
            lat:location.latitude,
            lng:location.longitude,
            timestamp:new Date().toISOString()
        }
      //console.log('BackgroundGeolocation:  ' + location.latitude + ',' + location.longitude);
      this.db.list<Location>('location').update(LocationData.id, LocationData);
      // Update inside of Angular's zone
      this.zone.run(() => {
        this.lat = location.latitude;
        this.lng = location.longitude;
      });
    }, (err) => {
      console.log(err);
      });

    this.backgroundGeolocation.start();

    // Background tracking
    let options = {
      frequency: 3000,
      enableHighAccuracy: true
    };
    this.watch = this.geolocation.watchPosition().subscribe(position => {
      if ((position as Geoposition).coords != undefined) {
        var geoposition = (position as Geoposition);
        //console.log('Latitude: ' + geoposition.coords.latitude + ' - Longitude: ' + geoposition.coords.longitude);
        this.zone.run(() => {
          this.lat = position.coords.latitude;
          this.lng = position.coords.longitude;
        });
      }
  });
    // this.watch = this.geolocation.watchPosition(options).filter((p: any) => p.code === undefined).subscribe((position: Geoposition) => {
    //   console.log(position);

    //   this.zone.run(() => {
    //     this.lat = position.coords.latitude;
    //     this.lng = position.coords.longitude;
    //   });
    // });
  }

  public stopTracking() {
    console.log('stopTracking');

    this.backgroundGeolocation.finish();
    this.watch.unsubscribe();
  }
}
