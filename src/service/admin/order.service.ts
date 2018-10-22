import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Order } from '../../model/order.model';
@Injectable()
export class OrderListService {
    private OrderListRef = this.db.list<Order>('order-list');
    constructor(public db: AngularFireDatabase) { }
    getOrderList(){
        return this.OrderListRef;
    }
    addOrder(order: Order){
        return this.db.object<Order>(`order-list/${order.id}`).set(order);
    }
    editOrder(order: Order){
      return this.OrderListRef.update(order.key, order)
  }
    removeOrder(order: Order){
      return this.OrderListRef.remove(order.key);
  }
}