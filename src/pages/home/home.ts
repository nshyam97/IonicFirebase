import { Component } from '@angular/core';
import { NavController, IonicPage, ModalController } from 'ionic-angular';
import { ShoppingListService } from '../../services/shopping-list/shopping-list.service';
import { Observable } from 'rxjs';
import { Item } from '../../models/item/item.model';
import { ToastService } from '../../services/toast/toast.service';


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  shoppingList$: Observable<Item[]>;

  constructor(public navCtrl: NavController, private shopping: ShoppingListService, private toast: ToastService, private modal: ModalController) {
    this.shoppingList$ = this.shopping
      .getShoppingList()
      .snapshotChanges()
      .map(
        changes => {
          return changes.map(c => ({
            key: c.payload.key, ...c.payload.val()
          }));
        }
      );
  }

  openModal(item: Item) {
    const itemModal = this.modal.create('ModalPage', {item});
    itemModal.present();
  }

  deleteShoppingItem(item: Item) {
    this.shopping.removeItem(item).then(() =>{
      this.toast.show(`${item.name} has been deleted!`);
    })
  }

}
