import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Emp } from '../../model/emp.model';
import { Location } from '../../model/location.model';
@Injectable()
export class StaffListService {
    
private StaffListRef = this.db.list<Emp>('staff-list');
  constructor(public db: AngularFireDatabase) { }
  getStaffList(){
      return this.StaffListRef;
  }
  getOne(orderId){
    return this.db.object<Emp>(`staff-list/${orderId}`);
}
  addStaff(emp: Emp){

    return this.db.object<Emp>(`staff-list/${emp.id}`).set(emp);  
     


  }
  createLocation(location:Location){
    return this.db.object<Location>(`location/${location.id}`).set(location);
  }
  editStaff(emp: Emp){
    return this.StaffListRef.update(emp.key, emp);
}
  removeStaff(emp: Emp){
    return this.StaffListRef.remove(emp.key);
}
    // getOne(){
    //     this.db.list<Emp>('staff-list'). 
    // }

    loginStaff(emp: Emp){
        return this.db.list<Emp>(`staff-list/${emp.id}`);
    }
}